'use strict';

const checkIfDupeEmail = (db, email) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT CustomerId AS customerId, Name AS name FROM Customers WHERE Email = ?', email, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = checkIfDupeEmail;
