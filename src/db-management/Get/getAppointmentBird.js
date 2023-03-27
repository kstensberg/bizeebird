'use strict';

const getAppointmentBird = (db, customerId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT AppointmentBirdId, GroomingWings, GroomingNails, CageNeeded, Bird_BirdId, Appointment_AppointmentId FROM AppointmentBirds ' +
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

module.exports = getAppointmentBird;
