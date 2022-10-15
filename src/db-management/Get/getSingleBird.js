const getSingleBird = (db, birdId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT Deleted AS deleted, Name AS name, Breed AS breed, Color AS color, Age AS age, Gender AS gender, ' +
            'Notes AS notes FROM Birds WHERE BirdId = ?', birdId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

module.exports = getSingleBird;
