'use strict';

const checkIfDupePhoneNumber = (db, phoneNumber) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Customers.Name AS name, Customers.CustomerId AS customerId, PhoneNumber FROM CustomerPhoneNumbers ' +
            'JOIN Customers ON CustomerId = Customer_CustomerId WHERE PhoneNumber = ?', phoneNumber, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = checkIfDupePhoneNumber;
