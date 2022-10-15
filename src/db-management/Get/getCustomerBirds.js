const getCustomerBirds = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT BirdId AS birdId, Deleted AS deleted, Name AS name, Breed AS breed, ' +
            'Color AS color, Age AS age, Gender AS gender, ' +
            'Notes AS notes FROM Birds WHERE Customer_CustomerId = ?', customerId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getCustomerBirds;
