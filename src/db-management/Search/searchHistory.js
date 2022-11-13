'use strict';

const searchHistory = (db, searchString) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            searchString = '%' + searchString + '%';
            var query = 'SELECT Customers.Name AS customerName, Customers.BoardingRate AS rate, Birds.Name AS birdName, Birds.Breed AS breed, ' +
            'Appointments.StartTime AS startDate, Appointments.EndTime AS endDate, ' +
            'Appointments.Status AS status, AppointmentBirds.GroomingWings AS wings, AppointmentBirds.GroomingNails AS nails, ' +
            'AppointmentBirds.CageNeeded AS cage ' +
            'FROM Appointments LEFT JOIN Customers ON Customers.CustomerId = Appointments.Customer_CustomerId LEFT JOIN AppointmentBirds ON ' +
            'AppointmentBirds.Appointment_AppointmentId = Appointments.AppointmentId LEFT JOIN Birds ON Birds.BirdId = AppointmentBirds.Bird_BirdId ' +
            'WHERE CustomerName LIKE ? OR BirdName LIKE ? OR Breed LIKE ? ORDER BY Appointments.StartTime DESC';
            db.all(query, searchString, searchString, searchString, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = searchHistory;
