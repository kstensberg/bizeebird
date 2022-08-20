const db = require('../db-management/dbConfig');

const getSingleCustomer = (searchParam) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Name FROM Customers WHERE CustomerId = ?', searchParam, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};
