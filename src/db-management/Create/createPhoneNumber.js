const createPhoneNumber = (db, number) => {
    db.serialize(() => {
        db.run('INSERT INTO CustomerPhoneNumbers (PhoneNumber, Customer_CustomerId) VALUES ($phoneNumber, $customerId)', {
            $phoneNumber: number.phoneNumber,
            $customerId: number.customerId
        });
    });
};

module.exports = createPhoneNumber;
