'use strict';

const createAppointment = (db, appointment) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('INSERT INTO Appointments (StartTime, EndTime, Status, Notes, Customer_CustomerId) ' +
            'VALUES ($StartTime, $EndTime, $Status, $Notes, $Customer_CustomerId)', {
                $StartTime: '2022-09-22',
                $EndTime: '2022-09-25',
                $Status: appointment.status,
                $Notes: appointment.notes,
                $Customer_CustomerId: appointment.customerId
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
    await createAppointment(db, appointment);
    console.log(appointment);
    // await Promise.all([createAppointmentBirds(db, appointmentId)]);
};

module.exports = runAllCreateAppointment;

