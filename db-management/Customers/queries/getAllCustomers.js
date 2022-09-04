const getAllCustomers = (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Customers.CustomerId, Customers.Name, CustomerPhoneNumbers.PhoneNumber AS PhoneNumber, ' +
            'Customers.Email, Customers.BoardingRate, Customers.Notes FROM Customers ' +
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
