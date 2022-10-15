'use strict';

const getUpcomingPickups = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var query = 'SELECT Customers.CustomerId AS customerId, Customers.Name AS customerName, Customers.BoardingRate AS rate, ' +
            'Birds.Name AS birdName, Birds.Breed AS breed, AppointmentBirds.GroomingWings AS wings, ' +
            'AppointmentBirds.GroomingNails AS nails, ' +
            'Appointments.Notes AS notes, Appointments.EndTime AS endDate FROM Customers ' +
            'LEFT JOIN Birds ON Birds.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN Appointments ON Appointments.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId ' +
            'WHERE Appointments.EndTime >= date("now") AND Appointments.Status = 1 ' +
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
