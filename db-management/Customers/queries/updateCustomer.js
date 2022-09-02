const updateCustomer = (db, Name, Email, BoardingRate, Notes, CustomerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('UPDATE Customers SET Name = $Name, Email = $Email, BoardingRate = $BoardingRate, Notes = $Notes WHERE CustomerId = $CustomerId', {
                $Name: Name,
                $Email: Email,
                $BoardingRate: BoardingRate,
                $Notes: Notes,
                $CustomerId: CustomerId
            });
        });
    });
};

module.exports = updateCustomer;
