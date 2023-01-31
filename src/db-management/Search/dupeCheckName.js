'use strict';

const checkIfDupeName = (db, name) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT CustomerId AS customerId, Name AS name FROM Customers WHERE Name = ?', name, (err, row) => {
                if (err) {
                    reject(err);
                }
                // console.log(row);
                resolve(row);
            });
        });
    });
};

module.exports = checkIfDupeName;
