const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bizeebird-test.db');

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

const customers = getAllCustomers();
customers.then(
    result => console.log(result)
);

const customerResult = getSingleCustomer(1);
customerResult.then(
    result => console.log(result)
);
