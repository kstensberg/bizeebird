const createBird = (db, bird) => {
    db.serialize(() => {
        db.run('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, ' +
        'Customer_CustomerId) VALUES (Deleted = 0, Name = $name, Breed = $breed, Color = $color, Age = $age, ' +
        'Gender = $gender, Notes = $notes, Customer_CustomerId = $customerId)', {
            $name: bird.name,
            $breed: bird.breed,
            $color: bird.color,
            $age: bird.age,
            $gender: bird.gender,
            $notes: bird.notes,
            $customerId: bird.customerId
        });
    });
};

module.exports = createBird;
