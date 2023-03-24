const getApptBirdNotes = (db, birdId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT ApptBirdNotes AS ApptBirdNotes FROM AppointmentBirds WHERE ApptBirdNotes IS NOT NULL AND Bird_BirdId = ? ' +
            'ORDER BY AppointmentBirdId DESC LIMIT(1)', birdId, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
};


module.exports = getApptBirdNotes;
