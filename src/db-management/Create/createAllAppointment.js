'use strict';

const createAppointment = (db, appointment) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('INSERT INTO Appointments (StartTime, EndTime, Status, ' +
            'Notes, Customer_CustomerId) ' +
            'VALUES ($startDate, $endDate, $status, $notes, $customerId)', {
                $startDate: appointment.startDate,
                $endDate: appointment.endDate,
                $status: appointment.status,
                $notes: appointment.notes,
                $customerId: appointment.customerId
            }, function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this.lastID);
            });
        });
    });
};

const createAppointmentBirds = (db, appointment, appointmentId) => {
    const birds = appointment.birds;
    db.serialize(() => {
        birds.forEach(bird =>
            db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ' +
            'Bird_BirdId, Appointment_AppointmentId, ApptBirdNotes) VALUES ($GroomingWings, ' +
            '$GroomingNails, $CageNeeded, $Bird_BirdId, ' +
            '$Appointment_AppointmentId, $ApptBirdNotes)', {
                $GroomingWings: bird.wings,
                $GroomingNails: bird.nails,
                $CageNeeded: bird.cage,
                $Bird_BirdId: bird.birdId,
                $Appointment_AppointmentId: appointmentId,
                $ApptBirdNotes: bird.notes
            })
        );
    });
};

const stringStatusToNumeric = (status) => {
    if (status == 'Scheduled') {
        return 0;
    } else if (status == 'Checked In') {
        return 1;
    } else if (status == 'Checked Out') {
        return 2;
    } else if (status == 'Cancelled') {
        return 3;
    } else {
        return 4;
    }
};

const apptTimeStampToISOString = (date) => {
    return new Date(date).toISOString();
};

const updateAppointment = (db, appointment) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('UPDATE Appointments SET StartTime = $startDate, EndTime = $endDate, Status = $status, ' +
            'Notes = $notes WHERE AppointmentId = $appointmentId', {
                $startDate: appointment.startDate,
                $endDate: appointment.endDate,
                $status: appointment.status,
                $notes: appointment.notes,
                $appointmentId: appointment.appointmentId
            });
        });
    });
};

const upsertAppointmentBirds = async (db, appointment) => {
    for (const bird of appointment.birds) {
        if (await isBirdInDbAppointment(db, bird, appointment) !== true) {
            insertBird(db, bird, appointment);
            console.log('inserted');
        }
        if (await isBirdInDbAppointment(db, bird, appointment) == true) {
            updateBird(db, bird, appointment);
            console.log('updated');
        }
        const dbAppointmentBirds = await getAppointmentBirds(db, appointment);
        for (const dbApptBird of dbAppointmentBirds) {
            // console.log(dbApptBird);
            if (await isBirdInDbAppointment(db, bird, appointment) == true && dbApptBird.Bird_BirdId !== bird.birdId) {
                deleteBird(db, bird);
                console.log('deleted');
            }
        }
    }
};
const isBirdInDbAppointment = (db, bird, appointment) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) AS bird FROM AppointmentBirds WHERE Bird_BirdId = ? AND Appointment_AppointmentId = ?', bird.birdId,
            appointment.appointmentId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row.bird > 0);
            });
    });
};

const getAppointmentBirds = (db, appointment) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT Bird_BirdId FROM AppointmentBirds WHERE Appointment_AppointmentId = ?', appointment.appointmentId, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const updateBird = async (db, bird, appointment) => {
    await db.run('UPDATE AppointmentBirds SET GroomingWings = $groomingWings, GroomingNails = $groomingNails, CageNeeded = $cageNeeded, ' +
        'ApptBirdNotes = $apptBirdNotes ' +
        'WHERE Bird_BirdId = $birdId AND Appointment_AppointmentId = $appointmentId', {
        $groomingWings: bird.wings,
        $groomingNails: bird.nails,
        $cageNeeded: bird.cage,
        $apptBirdNotes: bird.notes,
        $birdId: bird.birdId,
        $appointmentId: appointment.appointmentId
    });
};

const insertBird = async (db, bird, appointment) => {
    await db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ApptBirdNotes, Bird_BirdId, Appointment_AppointmentId) ' +
    'VALUES($groomingWings, $groomingNails, $cageNeeded, $apptBirdNotes, $birdId, $appointmentId)', {
        $groomingWings: bird.wings,
        $groomingNails: bird.nails,
        $cageNeeded: bird.cage,
        $apptBirdNotes: bird.notes,
        $birdId: bird.birdId,
        $appointmentId: appointment.appointmentId
    });
};

const deleteBird = async (db, bird) => {
    await db.run('DELETE FROM AppointmentBirds WHERE Bird_BirdId = $birdId', {
        $birdId: bird.birdId
    });
};

const runAllCreateAppointment = async (db, appointment) => {
    if ('appointmentId' in appointment) {
        await Promise.all([updateAppointment(db, appointment), upsertAppointmentBirds(db, appointment)]);
    } else {
        const dbAppt = appointment;
        dbAppt.status = stringStatusToNumeric(dbAppt.status);
        dbAppt.startDate = apptTimeStampToISOString(dbAppt.startDate);
        dbAppt.endDate = apptTimeStampToISOString(dbAppt.endDate);
        const appointmentId = await createAppointment(db, dbAppt);
        await Promise.all([createAppointmentBirds(db, dbAppt, appointmentId)]);
    }
};

module.exports = runAllCreateAppointment;
