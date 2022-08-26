const db = require('../../dbConfig');

const searchCustomers = (searchString) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            searchString = '%' + searchString + '%';
            var query = 'SELECT Name, Email, BoardingRate, Notes FROM Customers WHERE Email LIKE ? OR Name LIKE ?';
            db.all(query, searchString, searchString, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = searchCustomers;
