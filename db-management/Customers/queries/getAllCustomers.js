const db = require('../../dbConfig');

const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT * FROM Customers', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

module.exports = getAllCustomers;