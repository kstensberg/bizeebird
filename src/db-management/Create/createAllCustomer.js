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

const getCustomerBirds = (db, customerID) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT BirdId AS birdId, Deleted AS deleted, Name AS name, Breed AS breed, Color AS color, Age as age, Gender AS gender, ' +
            'Notes FROM Birds WHERE Customer_CustomerId = ?', customerID, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const upsertCustomerBirds = async (db, customer) => {
    const customerBirds = await getCustomerBirds(db, customer.customerId);
    const dbBirdIds = [];
    const uiBirdIds = [];
    for (const customerBird of customerBirds) {
        dbBirdIds.push(customerBird.birdId);
    }
    for (const bird of customer.birds) {
        uiBirdIds.push(bird.birdId);
    }
    const diff = dbBirdIds.filter(x => !uiBirdIds.includes(x));
    for (const bird of customer.birds) {
        if (!dbBirdIds.includes(bird.birdId)) {
            insertBird(db, bird, customer);
        }
        if (dbBirdIds.includes(bird.birdId)) {
            updateBird(db, bird, customer);
        }
        if (dbBirdIds.includes(bird.birdId) && diff.length >= 1) {
            for (let i = 0; i <= diff.length; i++) {
                deleteBird(db, diff[i]);
            }
        }
    }
};

const updateBird = async (db, bird, customer) => {
    await db.run('UPDATE Birds SET Deleted = 0, Name = $name, Breed = $breed, Color = $color, Age = $age, Gender = $gender, Notes = $notes ' +
    'WHERE BirdId = $birdId AND Customer_CustomerId = $customerId', {
        $name: bird.name,
        $breed: bird.breed,
        $color: bird.color,
        $age: bird.age,
        $gender: bird.gender,
        $notes: bird.notes,
        $birdId: bird.birdId,
        $customerId: customer.customerId
    });
};

const insertBird = async (db, bird, customer) => {
    await db.run('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, Customer_CustomerId) ' +
    'VALUES(0, $name, $breed, $color, $age, $gender, $notes, $customerId)', {
        $name: bird.name,
        $breed: bird.breed,
        $color: bird.color,
        $age: bird.age,
        $gender: bird.gender,
        $notes: bird.notes,
        $customerId: customer.customerId
    });
};

const deleteBird = async (db, birdId) => {
    await db.run('DELETE FROM Birds WHERE BirdId = $birdId', {
        $birdId: birdId
    });
};

const getCustomerPhoneNumbers = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT PhoneNumberId, PhoneNumber FROM CustomerPhoneNumbers WHERE Customer_CustomerId = ?', customerId, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

const upsertCustomerPhoneNumbers = async (db, customer) => {
    const customerPhoneNumbers = await getCustomerPhoneNumbers(db, customer.customerId);
    const dbPhoneNumbers = [];
    const uiPhoneNumbers = [];
    for (const phoneNumber of customerPhoneNumbers) {
        dbPhoneNumbers.push(phoneNumber.PhoneNumber);
    }
    for (const phoneNumber of customer.phoneNumbers) {
        uiPhoneNumbers.push(phoneNumber);
    }
    const diff = dbPhoneNumbers.filter(x => !uiPhoneNumbers.includes(x));
    for (const phoneNumber of customer.phoneNumbers) {
        if (!dbPhoneNumbers.includes(phoneNumber)) {
            console.log('insert');
            insertPhoneNumber(db, phoneNumber, customer);
        }
        if (dbPhoneNumbers.includes(phoneNumber)) {
            console.log('update');
            updatePhoneNumber(db, phoneNumber, customer);
        }
        if (dbPhoneNumbers.includes(phoneNumber) && diff.length >= 1) {
            for (let i = 0; i <= diff.length; i++) {
                console.log('delete');
                deletePhoneNumber(db, diff[i], customer.customerId);
            }
        }
    }
};

const updatePhoneNumber = async (db, phoneNumber, customer) => {
    const customerPhoneNumbers = await getCustomerPhoneNumbers(db, customer.customerId);
    const number = (customerPhoneNumbers.find(number => number.PhoneNumber === phoneNumber));
    await db.run('UPDATE CustomerPhoneNumbers SET PhoneNumber = $phoneNumber ' +
    'WHERE Customer_CustomerId = $customerId AND PhoneNumberId = $phoneNumberId', {
        $phoneNumber: number.PhoneNumber,
        $phoneNumberId: number.PhoneNumberId,
        $customerId: customer.customerId
    });
};

const insertPhoneNumber = async (db, phoneNumber, customer) => {
    await db.run('INSERT INTO CustomerPhoneNumbers (PhoneNumber, Customer_CustomerId) ' +
    'VALUES($phoneNumber, $customerId)', {
        $phoneNumber: phoneNumber,
        $customerId: customer.customerId
    });
};

const deletePhoneNumber = async (db, phoneNumber, customerId) => {
    const customerPhoneNumbers = await getCustomerPhoneNumbers(db, customerId);
    const number = (customerPhoneNumbers.find(number => number.PhoneNumber === phoneNumber));
    if (number !== undefined) {
        await db.run('DELETE FROM CustomerPhoneNumbers ' +
        'WHERE Customer_CustomerId = $customerId AND PhoneNumberId = $phoneNumberId', {
            $phoneNumberId: number.PhoneNumberId,
            $customerId: customerId
        });
    }
};

const checkIfDuplicateCustomer = (db, customer) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT DISTINCT Customer_CustomerId FROM CustomerPhoneNumbers ' +
                'WHERE PhoneNumber IN (?)', customer.phoneNumbers, (err, row) => {
                if (row) {
                    resolve(row);
                }
                reject(err);
            });
            db.all('SELECT DISTINCT CustomerId FROM Customers WHERE Email = ?', customer.email, (err, row) => {
                if (row) {
                    resolve(row);
                }
                reject(err);
            });
        });
    });
};

const crudCustomer = async (db, customer) => {
    if ('customerId' in customer) {
        await Promise.all([updateCustomer(db, customer), upsertCustomerBirds(db, customer), upsertCustomerPhoneNumbers(db, customer)]);
    } else {
        // dupe check to go here?
        const customerId = await createCustomer(db, customer);
        await Promise.all([createPhoneNumber(db, customerId, customer.phoneNumbers), createBird(db, customerId, customer.birds)]);
    }
};

module.exports = crudCustomer;
