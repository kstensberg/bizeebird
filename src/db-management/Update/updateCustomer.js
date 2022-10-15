'use strict';

const updateCustomer = (db, name, email, rate, notes, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('UPDATE Customers SET Name = $name, Email = $email, BoardingRate = $rate, ' +
            'Notes = $notes WHERE CustomerId = $customerId', {
                $name: name,
                $email: email,
                $rate: rate,
                $notes: notes,
                $customerId: customerId
            });
        });
    });
};

module.exports = updateCustomer;
