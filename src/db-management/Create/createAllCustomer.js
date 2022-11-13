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

const runAllCreate = async (db, customer) => {
    if ('customerId' in customer) {
        console.log('this is an update');
    } else {
        const customerId = await createCustomer(db, customer);
        await Promise.all([createPhoneNumber(db, customerId, customer.phoneNumbers), createBird(db, customerId, customer.birds)]);
    }
};

module.exports = runAllCreate;
