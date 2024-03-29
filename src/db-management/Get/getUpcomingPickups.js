'use strict';

const getUpcomingPickups = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var query = 'SELECT Appointments.AppointmentId as appointmentId, Customers.CustomerId AS customerId, Customers.Name AS customerName, Customers.BoardingRate AS rate, ' +
            'Birds.Name AS birdName, Birds.Breed AS breed, AppointmentBirds.GroomingWings AS wings, ' +
            'AppointmentBirds.GroomingNails AS nails, ' +
            'Appointments.Notes AS notes, Appointments.EndTime AS Date FROM Customers ' +
            'LEFT JOIN Birds ON Birds.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN Appointments ON Appointments.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId ' +
            'WHERE Appointments.Status = 1 AND Appointments.EndTime >= DATE("now", "-7 days") ' +
            'GROUP BY Appointments.AppointmentId ORDER BY Appointments.EndTime ASC';
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getUpcomingPickups;
