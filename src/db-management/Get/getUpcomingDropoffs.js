'use strict';

const getUpcomingDropoffs = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var query = 'SELECT Appointments.AppointmentId appointmentId, Customers.CustomerId AS customerId, Customers.Name as customerName, Customers.BoardingRate AS rate, ' +
            'Birds.Name AS birdName, Birds.Breed AS breed, Appointments.StartTime AS Date, AppointmentBirds.CageNeeded as cage FROM Customers ' +
            'LEFT JOIN Birds ON Birds.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN Appointments ON Appointments.Customer_CustomerId = Customers.CustomerId ' +
            'LEFT JOIN AppointmentBirds ON AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId ' +
            'WHERE Appointments.Status = 0 ' +
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
