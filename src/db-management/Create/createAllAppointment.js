'use strict';

const createAppointment = (db, appointment) => {
    if (appointment.startDate > appointment.endDate) {
        throw 'start date should never be greater than end date';
    }
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

const updateAppointment = (db, appointment) => {
    if (appointment.startDate > appointment.endDate) {
        throw 'start date should never be greater than end date';
    }
    db.run('UPDATE Appointments SET StartTime = $startDate, EndTime = $endDate, Status = $status, ' +
        'Notes = $notes WHERE AppointmentId = $appointmentId', {
        $startDate: appointment.startDate,
        $endDate: appointment.endDate,
        $status: appointment.status,
        $notes: appointment.notes,
        $appointmentId: appointment.appointmentId
    });
};

const upsertAppointmentBirds = async (db, appointment) => {
    const dbApptBirds = await getAppointmentBirds(db, appointment);
    const dbBirdIds = [];
    const uiBirdIds = [];
    for (const dbApptBird of dbApptBirds) {
        dbBirdIds.push(dbApptBird.Bird_BirdId);
    }
    for (const bird of appointment.birds) {
        uiBirdIds.push(bird.birdId);
    }
    const diff = dbBirdIds.filter(x => !uiBirdIds.includes(x));
    for (const bird of appointment.birds) {
        if (await isBirdInDbAppointment(db, bird, appointment) !== true) {
            insertBird(db, bird, appointment);
        }
        if (await isBirdInDbAppointment(db, bird, appointment) == true && diff.length == 0) {
            updateBird(db, bird, appointment);
        }
        if (await isBirdInDbAppointment(db, bird, appointment) == true && diff.length >= 1) {
            for (let i = 0; i <= diff.length; i++) {
                deleteBird(db, diff[i]);
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

const deleteBird = async (db, birdId) => {
    await db.run('DELETE FROM AppointmentBirds WHERE Bird_BirdId = $birdId', {
        $birdId: birdId
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

const formatAppointment = (appointment) => {
    const formattedAppointment = appointment;
    formattedAppointment.status = stringStatusToNumeric(formattedAppointment.status);
    formattedAppointment.startDate = apptTimeStampToISOString(formattedAppointment.startDate);
    formattedAppointment.endDate = apptTimeStampToISOString(formattedAppointment.endDate);
    return formattedAppointment;
};

const crudAppointment = async (db, appointment) => {
    const newAppointment = await formatAppointment(appointment);
    if ('appointmentId' in newAppointment) {
        await Promise.all([updateAppointment(db, newAppointment), upsertAppointmentBirds(db, newAppointment)]);
    } else {
        const appointmentId = await createAppointment(db, newAppointment);
        await Promise.all([createAppointmentBirds(db, newAppointment, appointmentId)]);
    }
};

module.exports = crudAppointment;
