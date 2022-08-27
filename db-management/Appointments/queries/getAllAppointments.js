const db = require('../../dbConfig');

const getAllAppointments = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Customers.Name AS CustomerName, Customers.BoardingRate, Birds.Name AS BirdName, Appointments.StartTime, Appointments.EndTime, Appointments.Status, AppointmentBirds.GroomingWings, AppointmentBirds.GroomingNails, AppointmentBirds.CageNeeded FROM Appointments LEFT JOIN Customers ON Appointments.Customer_CustomerId = Customers.CustomerId LEFT JOIN AppointmentBirds ON Appointments.AppointmentId = AppointmentBirds.Appointment_AppointmentId LEFT JOIN Birds ON Birds.BirdId = AppointmentBirds.AppointmentBirdId', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getAllAppointments;
