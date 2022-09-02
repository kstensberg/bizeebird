const getUpcomingDropoffs = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var query = 'SELECT Customers.CustomerId, Customers.Name, Customers.BoardingRate AS Rate, Birds.Name AS BirdName,' +
            'Birds.Breed, AppointmentBirds.GroomingWings AS Wings, AppointmentBirds.GroomingNails AS Nails, ' +
            'Appointments.Notes AS Notes, Appointments.EndTime AS Date FROM Customers ' +
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

module.exports = getUpcomingDropoffs;