const db = require('../../dbConfig');

const searchCustomers = (searchString) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            if (searchString.includes('@')) {
                var query = 'SELECT Name, Email, BoardingRate, Notes FROM Customers WHERE Email = ?';
            } else {
                searchString = '%' + searchString + '%';
                query = 'SELECT Name, Email, BoardingRate, Notes FROM Customers WHERE Name LIKE ?';
            }
            db.all(query, searchString, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = searchCustomers;
