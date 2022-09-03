const searchHistory = (db, searchString) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            searchString = '%' + searchString + '%';
            var query = 'SELECT Customers.Name AS CustomerName, Customers.BoardingRate, Birds.Name AS BirdName, Birds.Breed, ' +
            'strftime("%m-%d-%Y", Appointments.StartTime) || "  -  " || strftime("%m-%d-%Y", Appointments.EndTime) AS Dates, ' +
            'Appointments.Status, AppointmentBirds.GroomingWings AS Wings, AppointmentBirds.GroomingNails AS Nails, AppointmentBirds.CageNeeded ' +
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
