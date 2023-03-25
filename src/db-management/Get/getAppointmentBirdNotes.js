'use strict';

// below is only present in this file to call the getAppointmentNotes function for testing
const sqlite3 = require('sqlite3').verbose();
const dbLocation = process.env.APPDATA;
const db = new sqlite3.Database(dbLocation + '/BiZeeBird/bizeebird.db');
// ....


const getAppointmentBirdNotes = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT ApptBirdNotes, AppointmentBirdId FROM AppointmentBirds ' +
            'WHERE Bird_BirdId = (SELECT BirdId FROM Birds WHERE Customer_CustomerId = ?) ' +
            'AND ApptBirdNotes IS NOT NULL ORDER BY AppointmentBirdId DESC LIMIT(1)', customerId, (err, rows) => {
                if (rows.length <= 0) {
                    resolve('');
                } else {
                    resolve(rows);
                }
            });
        });
    });
};

// for testing
getAppointmentBirdNotes(db, 612).then(function(result) {
    console.log(result);
});
// ....

module.exports = getAppointmentBirdNotes;
