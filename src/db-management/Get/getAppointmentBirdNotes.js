'use strict';

const getAppointmentBirdNotes = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT ApptBirdNotes, AppointmentBirdId, CageNeeded FROM AppointmentBirds ' +
            'WHERE Bird_BirdId = (SELECT BirdId FROM Birds WHERE Customer_CustomerId = ?) ' +
            'ORDER BY AppointmentBirdId DESC LIMIT(1)', customerId, (err, rows) => {
                if (rows.length <= 0) {
                    resolve('');
                } else {
                    resolve(rows);
                }
            });
        });
    });
};

module.exports = getAppointmentBirdNotes;
