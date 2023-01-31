'use strict';

const Utilities = require('../utilities.js');

const getSingleCustomer = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT CustomerId AS customerId, Name AS name, Email AS email, BoardingRate AS rate, Notes AS notes FROM Customers ' +
            'WHERE CustomerId = ?', customerId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const getCustomerBirds = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Deleted AS deleted, BirdId AS birdId, Name AS name, Breed AS breed, ' +
            'Color AS color, Age AS age, Gender AS gender, Notes AS notes FROM Birds ' +
            'WHERE Customer_CustomerId = ?', customerId, (err, rows) => {
                if (err) {
                    reject(err);
                }

                for (let idx = 0; idx < rows.length; idx++) {
                    rows[idx].gender = Utilities.numericGenderToString(rows[idx].gender);
                }

                resolve(rows);
            });
        });
    });
};

const getCustomerPhoneNumbers = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT PhoneNumber AS number FROM CustomerPhoneNumbers ' +
            'WHERE Customer_CustomerId = ?', customerId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const getCustomer = async (db, customerId) => {
    const result = await Promise.all([getSingleCustomer(db, customerId), getCustomerPhoneNumbers(db, customerId), getCustomerBirds(db, customerId)]);

    const numbers = result[1];
    var formattedNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
        formattedNumbers.push(numbers[i].number);
    }
    const birds = result[2];
    var formattedBirds = [];
    for (let i = 0; i < birds.length; i++) {
        formattedBirds.push(birds[i]);
    }

    const customerData = {
        customerId: customerId,
        name: result[0].name,
        email: result[0].email,
        rate: result[0].rate,
        notes: result[0].notes,
        phoneNumbers: formattedNumbers,
        birds: formattedBirds
    };

    return customerData;
};

module.exports = getCustomer;
