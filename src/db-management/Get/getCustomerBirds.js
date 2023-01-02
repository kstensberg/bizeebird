const getCustomerBirds = (db, customerID) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT BirdId AS birdId, Deleted AS deleted, Name AS name, Breed AS breed, Color AS color, Age as age, Gender AS gender, ' +
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
