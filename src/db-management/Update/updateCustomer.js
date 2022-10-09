'use strict';

const updateCustomer = (db, name, email, boardingRate, notes, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('UPDATE Customers SET Name = $name, Email = $email, BoardingRate = $boardingRate, ' +
            'Notes = $notes WHERE CustomerId = $customerId', {
                $name: name,
                $email: email,
                $boardingRate: boardingRate,
                $notes: notes,
                $customerId: customerId
            });
        });
    });
};

module.exports = updateCustomer;
