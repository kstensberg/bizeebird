'use strict';

const createAppointment = (db, appointment) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('INSERT INTO Appointments (StartTime, EndTime, Status, Notes, Customer_CustomerId) ' +
            'VALUES ($startTime, $endTime, $status, $notes, $customerId)', {
                $startTime: appointment.startDate,
                $endTime: appointment.endDate,
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

// const createAppointmentBirds = (db, appointment, appointmentBird) => {
//     const birds = appointment.birds;
//     db.serialize(() => {
//         birds.forEach(bird =>
//             db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ' +
//             'Bird_BirdId, Appointment_AppointmentId, ApptBirdNotes) VALUES ($GroomingWings, ' +
//             '$GroomingNails, $CageNeeded, $Bird_BirdId, ' +
//             '$Appointment_AppointmentId, $ApptBirdNotes', {
//                 $GroomingWings: appointmentBird.groomingWings,
//                 $GroomingNails: appointmentBird.groomingNails,
//                 $CageNeeded: appointmentBird.cageNeeded,
//                 $Bird_BirdId: bird,
//                 $Appointment_AppointmentId: appointment.appointmentId,
//                 $ApptBirdNotes: appointmentBird.notes
//             })
//         );
//     });
// };

const runAllCreateAppointment = async (db, appointment) => {
    console.log(appointment);
    await createAppointment(db, appointment);
    console.log(appointment);
    // await Promise.all([createAppointmentBirds(db, appointmentId)]);
};

module.exports = runAllCreateAppointment;

