'use strict';

// below is only present in this file to call the getAppointmentNotes function for testing
const sqlite3 = require('sqlite3').verbose();
const dbLocation = process.env.APPDATA;
const db = new sqlite3.Database(dbLocation + '/BiZeeBird/bizeebird.db');
// ....

const getAppointmentNotes = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT Notes AS ApptNotes FROM Appointments WHERE ApptNotes IS NOT NULL AND Customer_CustomerId = ? ' +
            'ORDER BY AppointmentId DESC LIMIT(1)', customerId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

// for testing
getAppointmentNotes(db, 289).then(function(result) {
    console.log(result);
});
// ....

module.exports = getAppointmentNotes;
