'use strict';

const deleteCustomer = (db, customerId) => {
    db.serialize(() => {
        db.run('DELETE FROM Customers WHERE CustomerId = ?', customerId);
    });
};

module.exports = deleteCustomer;
