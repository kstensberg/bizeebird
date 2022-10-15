const createBird = (db, bird) => {
    db.serialize(() => {
        db.run('INSERT INTO Birds (Deleted, Name, Breed, Color, Age, Gender, Notes, ' +
        'Customer_CustomerId) VALUES (0, $name, $breed, $color, $age, ' +
        '$gender, $notes, $customerId)', {
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
