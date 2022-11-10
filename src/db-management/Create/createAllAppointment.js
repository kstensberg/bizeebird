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

const stringStatusToNumeric = (appointment) => {
    if (appointment.status == 'Scheduled') {
        return 0;
    } else if (appointment.status == 'Checked In') {
        return 1;
    } else if (appointment.status == 'Checked Out') {
        return 2;
    } else if (appointment.status == 'Cancelled') {
        return 3;
    } else {
        return 4;
    }
};

const apptTimeStampToISOString = (appointment) => {
    const startDate = new Date(appointment.startDate);
    const endDate = new Date(appointment.endDate);
    appointment.startDate = startDate.toISOString();
    appointment.endDate = endDate.toISOString();
};

const runAllCreateAppointment = async (db, appointment) => {
    const dbAppt = appointment;
    stringStatusToNumeric(dbAppt);
    apptTimeStampToISOString(dbAppt);
    const appointmentId = await createAppointment(db, dbAppt);
    await Promise.all([createAppointmentBirds(db, dbAppt, appointmentId)]);
};

module.exports = runAllCreateAppointment;

