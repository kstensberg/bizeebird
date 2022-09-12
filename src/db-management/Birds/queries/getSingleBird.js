const getSingleBird = (db, birdId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Deleted, Name, Breed, Color, Age, Gender, ' +
            'Notes FROM Birds WHERE BirdId = ?', birdId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getSingleBird;
