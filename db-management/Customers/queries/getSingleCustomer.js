const getSingleCustomer = (db, customerID) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT CustomerId, Name, Email, BoardingRate, Notes FROM Customers WHERE CustomerId = ?', customerID, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getSingleCustomer;
