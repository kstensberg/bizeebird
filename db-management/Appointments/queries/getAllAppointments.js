const db = require('../../dbConfig');

const getAllAppointments = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Customers.Name AS CustomerName, Customers.BoardingRate, Birds.Name AS BirdName, strftime("%m-%d-%Y", Appointments.StartTime) || "  -  " || strftime("%m-%d-%Y", Appointments.EndTime) AS Dates, Appointments.Status, AppointmentBirds.GroomingWings, AppointmentBirds.GroomingNails, AppointmentBirds.CageNeeded FROM Appointments LEFT JOIN Customers ON Customers.CustomerId = Appointments.Customer_CustomerId LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId LEFT JOIN Birds ON Birds.BirdId = AppointmentBirds.Bird_BirdId', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getAllAppointments;
