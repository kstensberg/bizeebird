const db = require('../../dbConfig');

const deleteCustomer = (customerId) => {
    db.serialize(() => {
        db.run('DELETE FROM Customers WHERE CustomerId = ?', customerId);
    });
};

module.exports = deleteCustomer;