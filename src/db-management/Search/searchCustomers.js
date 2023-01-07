'use strict';

const searchCustomers = (db, searchString) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            searchString = '%' + searchString + '%';
            var query = 'SELECT Customers.CustomerId as customerId, Customers.Name AS name, CustomerPhoneNumbers.PhoneNumber AS phoneNumber, ' +
            'Customers.Email AS email, Customers.BoardingRate AS rate, Customers.Notes AS notes FROM Customers ' +
            'LEFT JOIN CustomerPhoneNumbers ON CustomerPhoneNumbers.Customer_CustomerId = Customers.CustomerId ' +
            'WHERE Customers.Email LIKE ? OR Customers.Name LIKE ? OR CustomerPhoneNumbers.PhoneNumber LIKE ?';
            db.all(query, searchString, searchString, searchString, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = searchCustomers;
