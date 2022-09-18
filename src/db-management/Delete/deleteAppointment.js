'use strict';

const deleteAppointment = (db, appointment) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('DELETE FROM Appointments WHERE AppointmentId = ?', appointment.appointmentId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const deleteAppointmentBirds = (db, appointmentId) => {
    db.serialize(() => {
        db.run('DELETE FROM AppointmentBirds WHERE Appointment_AppointmentId = ?', appointmentId);
    });
};

const runAllDeleteAppointment = async (db, appointment) => {
    const appointmentId = await deleteAppointment(db, appointment);
    await Promise.all([deleteAppointmentBirds(db, appointmentId)]);
};

module.exports = runAllDeleteAppointment;
