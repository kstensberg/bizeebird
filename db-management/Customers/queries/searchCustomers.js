const db = require('../../dbConfig');

const searchCustomers = (searchString) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            searchString = '%' + searchString + '%';
            var query = 'SELECT Customers.Name, GROUP_CONCAT(CustomerPhoneNumbers.PhoneNumber) AS PhoneNumber, Customers.Email, Customers.BoardingRate, Customers.Notes FROM Customers LEFT JOIN CustomerPhoneNumbers ON CustomerPhoneNumbers.Customer_CustomerId = Customers.CustomerId WHERE Customers.Email LIKE ? OR Customers.Name LIKE ? OR CustomerPhoneNumbers.PhoneNumber LIKE ? GROUP BY Customers.Name';
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
