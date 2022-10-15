'use strict';

const getUpcomingDropoffs = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var query = 'SELECT Customers.CustomerId, Customers.Name AS customerName, Birds.Name AS birdName,' +
            'Birds.Breed AS breed, AppointmentBirds.CageNeeded AS cage, ' +
            'Appointments.StartTime AS date FROM Customers ' +
            'LEFT JOIN Birds ON Birds.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN Appointments ON Appointments.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId ' +
            'WHERE Appointments.StartTime >= date("now") AND Appointments.Status = "Scheduled" ' +
            'GROUP BY Appointments.AppointmentId ORDER BY Appointments.StartTime ASC';
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getUpcomingDropoffs;
