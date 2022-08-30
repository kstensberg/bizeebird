const db = require('../../dbConfig');

const getSingleCustomer = (customerID) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Customers.CustomerId, Customers.Name, Customers.Email, Customers.BoardingRate, Customers.Notes, Birds.Name AS BirdName, Birds.Notes AS BirdNotes, Birds.Breed FROM Customers LEFT JOIN Birds ON Birds.Customer_CustomerId = Customers.CustomerId WHERE Customers.CustomerId = ?', customerID, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getSingleCustomer;
