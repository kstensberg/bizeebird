'use strict';

const createAppointment = (db, customer, appointment) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('INSERT INTO Appointments (StartTime, EndTime, Status, Notes, Customer_CustomerId) ' +
            'VALUES ($StartTime, $EndTime, $Status, $Notes, $Customer_CustomerId)'), {
                $StartTime: appointment.startTime,
                $EndTime: appointment.endTime,
                $Status: appointment.appointmentStatus,
                $Notes: appointment.notes,
                $Customer_CustomerId: customer.customerId
            }, function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this.lastID);
            };
        });
    });
};

const createAppointmentBirds = (db, appointmentId, appointmentBird, birds) => {
    db.serialize(() => {
        for (const bird of birds) {
            db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ' +
            'Bird_BirdId, Appointment_AppointmentId, ApptBirdNotes) VALUES ($GroomingWings, ' +
            '$GroomingNails, $CageNeeded, $Bird_BirdId, ' +
            '$Appointment_AppointmentId, $ApptBirdNotes', {
                $GroomingWings: appointmentBird.groomingWings,
                $GroomingNails: appointmentBird.groomingNails,
                $CageNeeded: appointmentBird.cageNeeded,
                $Bird_BirdId: bird.birdId,
                $Appointment_AppointmentId: appointmentId,
                $ApptBirdNotes: appointmentBird.notes
            });
        }
    });
};

const runAllCreateAppointment = async (db, customer, appointment, appointmentBird) => {
    const appointmentId = await createAppointment(db, customer, appointment);
    await Promise.all([createAppointmentBirds(db, appointmentId, appointmentBird, customer.birds)]);
};

module.exports = runAllCreateAppointment;
