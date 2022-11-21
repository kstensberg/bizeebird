'use strict';

const createCustomer = (db, customer) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('INSERT INTO Customers (Name, Email, BoardingRate, Notes) ' +
            'VALUES ($name, $email, $rate, $notes)', {
                $name: customer.name,
                $email: customer.email,
                $rate: customer.rate,
                $notes: customer.notes
            }, function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this.lastID);
            });
        });
    });
};

const createPhoneNumber = (db, customerId, numbers) => {
    db.serialize(() => {
        numbers.forEach(number =>
            db.run('INSERT INTO CustomerPhoneNumbers (PhoneNumber, Customer_CustomerId) VALUES ($phoneNumber, ' +
            '$customerId)', {
                $phoneNumber: number,
                $customerId: customerId
            })
        );
    });
};

const createBird = (db, customerId, birds) => {
    db.serialize(() => {
        for (const bird of birds) {
            db.run('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, ' +
            'Customer_CustomerId) VALUES (0, $name, $breed, $color, $age, ' +
            '$gender, $notes, $customerId)', {
                $name: bird.name,
                $breed: bird.breed,
                $color: bird.color,
                $age: bird.age,
                $gender: bird.gender,
                $notes: bird.notes,
                $customerId: customerId
            });
        }
    });
};

const updateCustomer = (db, customer) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('UPDATE Customers SET Name = $name, Email = $email, BoardingRate = $rate, ' +
            'Notes = $notes WHERE CustomerId = $customerId', {
                $name: customer.name,
                $email: customer.email,
                $rate: customer.rate,
                $notes: customer.notes,
                $customerId: customer.customerId
            });
        });
    });
};

const formatPhoneNumber = (numbers) => {
    const formattedNumbers = [];
    numbers.forEach(number => {
        formattedNumbers.push(number.replace(/\D/g,''));
    });
    return formattedNumbers;
};

const runAllCreate = async (db, customer) => {
    const formattedNumbers = formatPhoneNumber(customer.phoneNumbers);
    if ('customerId' in customer) {
        updateCustomer(db, customer);
    } else {
        const customerId = await createCustomer(db, customer);
        await Promise.all([createPhoneNumber(db, customerId, formattedNumbers), createBird(db, customerId, customer.birds)]);
    }
};

module.exports = runAllCreate;
