const createBird = (db, Name, Breed, Color, Age, Gender, Notes, CustomerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, ' +
            'Customer_CustomerId) VALUES (Deleted = 0, Name = $Name, Breed = $Breed, Color = $Color, Age = $Age, ' +
            'Gender = $Gender, Notes = $Notes, Customer_CustomerId = $CustomerId)', {
                $Name: Name,
                $Breed: Breed,
                $Color: Color,
                $Age: Age,
                $Gender: Gender,
                $Notes: Notes,
                $CustomerId: CustomerId
            }), (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            };
        });
    });
};

module.exports = createBird;
