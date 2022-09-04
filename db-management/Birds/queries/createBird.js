const createBird = (db, Bird) => {
    db.serialize(() => {
        db.run('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, ' +
        'Customer_CustomerId) VALUES (Deleted = 0, Name = $Name, Breed = $Breed, Color = $Color, Age = $Age, ' +
        'Gender = $Gender, Notes = $Notes, Customer_CustomerId = $CustomerId)', {
            $Name: Bird.Name,
            $Breed: Bird.Breed,
            $Color: Bird.Color,
            $Age: Bird.Color,
            $Gender: Bird.Gender,
            $Notes: Bird.Notes,
            $Customer_CustomerId: Bird.CustomerId
        });
    });
};

module.exports = createBird;
