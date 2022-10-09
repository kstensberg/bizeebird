'use strict';

const getSingleCustomer = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT CustomerId, Name, Email, BoardingRate, Notes FROM Customers ' +
            'WHERE CustomerId = ?', customerId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getSingleCustomer;
