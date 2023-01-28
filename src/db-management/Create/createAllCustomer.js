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

const updateCustomer = async (db, customer) => {
    await db.run('UPDATE Customers SET Name = $name, Email = $email, BoardingRate = $rate, ' +
        'Notes = $notes WHERE CustomerId = $customerId', {
        $name: customer.name,
        $email: customer.email,
        $rate: customer.rate,
        $notes: customer.notes,
        $customerId: customer.customerId
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
    const dbBirds = await getCustomerBirds(db, customer.customerId);
    const uiBirds = customer.birds;

    const isFound = (collection, value) => {
        return collection.some(function(item) {
            return item.birdId === value;
        });
    };
    for (const uiBird of uiBirds) {
        if (isFound(dbBirds, uiBird.birdId) == false) {
            insertBird(db, uiBird, customer);
        }
        if (isFound(dbBirds, uiBird.birdId)) {
            updateBird(db, uiBird, customer);
        }
    }
    for (const dbBird of dbBirds) {
        if (isFound(uiBirds, dbBird.birdId) == false) {
            deleteBird(db, dbBird.birdId);
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
            insertPhoneNumber(db, phoneNumber, customer);
        }
        if (dbPhoneNumbers.includes(phoneNumber)) {
            updatePhoneNumber(db, phoneNumber, customer);
        }
        if (dbPhoneNumbers.includes(phoneNumber) && diff.length >= 1) {
            for (let i = 0; i <= diff.length; i++) {
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

const checkIfDupeEmail = (db, email) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT DISTINCT CustomerId FROM Customers WHERE Email = ?', email, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

const checkIfDupePhoneNumber = (db, phoneNumbers) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT DISTINCT Customer_CustomerId FROM CustomerPhoneNumbers WHERE PhoneNumber IN (?)', phoneNumbers, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

const checkIfDupeName = (db, name) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT DISTINCT CustomerId FROM Customers WHERE Name = ?', name, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};

const crudCustomer = async (db, customer) => {
    if ('customerId' in customer) {
        await updateCustomer(db, customer);
        await upsertCustomerBirds(db, customer);
        await upsertCustomerPhoneNumbers(db, customer);
    } else {
        const dupe = await Promise.all([checkIfDupeEmail(db, customer.email), checkIfDupeName(db, customer.name), checkIfDupePhoneNumber(db, customer.phoneNumbers)]);
        if (dupe.length > 3) {
            console.log('duplicate of: ' + dupe);
        } else {
            const customerId = await createCustomer(db, customer);
            await Promise.all([createPhoneNumber(db, customerId, customer.phoneNumbers), createBird(db, customerId, customer.birds)]);
        }
    }
};

module.exports = crudCustomer;
