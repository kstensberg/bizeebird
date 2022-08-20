const db = require('../db-management/dbConfig');

const deleteCustomer = (CustomerId) => {
    db.serialize(() => {
        db.run('DELETE FROM Customers WHERE CustomerId = ?', CustomerId);
    });
};