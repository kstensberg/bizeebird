const db = require('../db-management/dbConfig');

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

const getSingleCustomer = (searchParam) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Name FROM Customers WHERE CustomerId = ?', searchParam, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const deleteCustomer = (CustomerId) => {
    db.serialize(() => {
        db.run('DELETE FROM Customers WHERE CustomerId = ?', CustomerId);
    });
};
