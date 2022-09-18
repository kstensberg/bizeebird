'use strict';

const deleteCustomer = (db, customer) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('DELETE FROM Customers WHERE CustomerId = ?', customer.customerId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const deletePhoneNumber = (db, customerId, numbers) => {
    db.serialize(() => {
        for (var i = 0; i < numbers.length; i++) {
            db.run('DELETE FROM CustomerPhoneNumbers WHERE Customer_CustomerId = ?', customerId);
            i++;
        }
    });
};

const deleteBird = (db, customerId, birds) => {
    db.serialize(() => {
        for (var i = 0; i < birds.length; i++) {
            db.run('DELETE FROM Birds WHERE Customer_CustomerId = ?', customerId);
            i++;
        }
    });
};

const runAllDeleteCustomer = async (db, customer) => {
    const customerId = await deleteCustomer(db, customer);
    await Promise.all([deletePhoneNumber(db, customerId, customer.phoneNumbers), deleteBird(db, customerId, customer.birds)]);
};

module.exports = runAllDeleteCustomer;
