const db = require('../../dbConfig');

const getSingleCustomer = (customerID) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Name, Email, BoardingRate, Notes FROM Customers WHERE CustomerId = ?', customerID, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getSingleCustomer;