'use strict';

const createCustomer = (db, customer) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('INSERT INTO Customers (Name, Email, BoardingRate, Notes) ' +
            'VALUES ($Name, $Email, $BoardingRate, $Notes)', {
                $Name: customer.name,
                $Email: customer.email,
                $BoardingRate: customer.boardingRate,
                $Notes: customer.notes
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
            db.run('INSERT INTO CustomerPhoneNumbers (PhoneNumber, Customer_CustomerId) VALUES ($PhoneNumber, ' +
            '$Customer_CustomerId)', {
                $PhoneNumber: number,
                $Customer_CustomerId: customerId
            })
        );
    });
};

const createBird = (db, customerId, birds) => {
    db.serialize(() => {
        for (const bird of birds) {
            db.run('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, ' +
            'Customer_CustomerId) VALUES (0, $Name, $Breed, $Color, $Age, ' +
            '$Gender, $Notes, $Customer_CustomerId)', {
                $Name: bird.name,
                $Breed: bird.breed,
                $Color: bird.color,
                $Age: bird.age,
                $Gender: bird.gender,
                $Notes: bird.notes,
                $Customer_CustomerId: customerId
            });
        }
    });
};

const runAllCreate = async (db, customer) => {
    const customerId = await createCustomer(db, customer);
    await Promise.all([createPhoneNumber(db, customerId, customer.phoneNumbers), createBird(db, customerId, customer.birds)]);
};

module.exports = runAllCreate;
