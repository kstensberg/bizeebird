'use strict';

const getAllAppointments = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Customers.CustomerId, Customers.Name AS CustomerName, Customers.BoardingRate, Birds.Name AS BirdName, ' +
            'Birds.Breed, Appointments.StartTime, Appointments.EndTime, Appointments.Status, ' +
            'AppointmentBirds.GroomingWings AS Wings, AppointmentBirds.GroomingNails AS Nails, ' +
            'AppointmentBirds.CageNeeded FROM Appointments LEFT JOIN Customers ON Customers.CustomerId = Appointments.Customer_CustomerId ' +
            'LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId ' +
            'LEFT JOIN Birds ON Birds.BirdId = AppointmentBirds.Bird_BirdId WHERE Appointments.StartTime >= DATE("now", "-1 year") ' +
            'ORDER BY Appointments.StartTime DESC',
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getAllAppointments;
