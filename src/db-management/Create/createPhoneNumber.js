const createPhoneNumber = (db, Number) => {
    db.serialize(() => {
        db.run('INSERT INTO CustomerPhoneNumbers (PhoneNumber, Customer_CustomerId) VALUES (PhoneNumber = $PhoneNumber, ' +
        'Customer_CustomerId = $CustomerId)', {
            $PhoneNumber: Number.PhoneNumber,
            $Customer_CustomerId: Number.CustomerId
        });
    });
};

module.exports = createPhoneNumber;
