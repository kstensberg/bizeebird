const getCustomerBirds = (db, customerID) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT BirdId, Deleted, Name, Breed, Color, Age, Gender, ' +
            'Notes FROM Birds WHERE Customer_CustomerId = ?', customerID, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getCustomerBirds;
