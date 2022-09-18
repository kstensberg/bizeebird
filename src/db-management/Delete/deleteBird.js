'use strict';

const deleteBird = (db, birdId) => {
    db.serialize(() => {
        db.run('DELETE FROM Birds WHERE BirdId = ?', birdId);
    });
};

module.exports = deleteBird;
