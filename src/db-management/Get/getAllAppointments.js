'use strict';

const getAllAppointments = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Customers.CustomerId AS customerId, Customers.Name AS customerName, Customers.BoardingRate ' +
            'AS rate, Birds.Name AS birdName, Birds.Breed AS breed, Appointments.StartTime AS startDate, ' +
            'Appointments.EndTime AS endDate, Appointments.Status AS appointmentStatus, ' +
            'AppointmentBirds.GroomingWings AS wings, AppointmentBirds.GroomingNails AS nails, ' +
            'AppointmentBirds.CageNeeded AS cage FROM Appointments LEFT JOIN Customers ON Customers.CustomerId = Appointments.Customer_CustomerId ' +
            'LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId ' +
            'LEFT JOIN Birds ON Birds.BirdId = AppointmentBirds.Bird_BirdId WHERE Appointments.StartTime >= DATE("now", "-1 year") AND  Appointments.Customer_CustomerId IS NOT NULL ' +
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
