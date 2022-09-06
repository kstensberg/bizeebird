const createCustomer = (db, Customer) => {
    db.serialize(() => {
        db.run('INSERT INTO Customers (Name, Email, BoardingRate, Notes) ' +
        'VALUES (Name = $Name, Email = $Email, BoardingRate = $BoardingRate, Notes = $Notes)', {
            $Name: Customer.Name,
            $Email: Customer.Email,
            $BoardingRate: Customer.BoardingRate,
            $Notes: Customer.Notes
        });
    });
};

module.exports = createCustomer;
