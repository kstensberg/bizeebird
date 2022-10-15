'use strict';

const getAllCustomers = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Customers.CustomerId AS customerId, Customers.Name AS name, CustomerPhoneNumbers.PhoneNumber AS phoneNumber, ' +
            'Customers.Email AS email, Customers.BoardingRate AS rate, Customers.Notes AS notes FROM Customers ' +
            'LEFT JOIN CustomerPhoneNumbers ON CustomerPhoneNumbers.Customer_CustomerId = Customers.CustomerId ' +
            'GROUP BY Customers.Name', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getAllCustomers;
