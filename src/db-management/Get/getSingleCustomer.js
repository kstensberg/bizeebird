'use strict';

const getSingleCustomer = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT CustomerId AS customerId, Name AS name, Email AS email, BoardingRate AS rate, Notes AS notes FROM Customers ' +
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
