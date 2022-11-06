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

const convertStatus = (appointment) => {
    if (appointment.status == 'Scheduled') {
        appointment.status = 0;
    } else if (appointment.status == 'Checked In') {
        appointment.status = 1;
    } else if (appointment.status == 'Checked Out') {
        appointment.status = 2;
    } else if (appointment.status == 'Cancelled') {
        appointment.status = 3;
    } else {
        appointment.status = 4;
    }
};

const convertTimeStamp = (appointment) => {
    const startDate = new Date(appointment.startDate);
    const endDate = new Date(appointment.endDate);
    appointment.startDate = startDate.toISOString();
    appointment.endDate = endDate.toISOString();
};

const runAllCreateAppointment = async (db, appointment) => {
    convertStatus(appointment);
    convertTimeStamp(appointment);
    console.log(appointment);
    const appointmentId = await createAppointment(db, appointment);
    await Promise.all([createAppointmentBirds(db, appointment, appointmentId)]);
};

module.exports = runAllCreateAppointment;

