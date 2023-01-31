'use strict';

const Utilities = require ('../utilities.js');

const getSingleAppointment = (db, appointmentId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT AppointmentId as appointmentId, StartTime as startDate, EndTime as endDate, Status as status, Notes as notes, ' +
            'Customer_CustomerId as customerId FROM Appointments ' +
            'WHERE AppointmentId = ?', appointmentId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const getAppointmentBirds = (db, appointmentId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('SELECT AppointmentBirdId as appointmentBirdId, Bird_BirdId as birdId, GroomingWings as wings, ' +
            'GroomingNails AS nails, CageNeeded AS cage, ApptBirdNotes AS notes, Appointment_AppointmentId as appointmentId FROM AppointmentBirds ' +
            'WHERE Appointment_AppointmentId = ?', appointmentId, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
};

const getAppointment = async (db, appointmentId) => {
    const result = await Promise.all([getSingleAppointment(db, appointmentId), getAppointmentBirds(db, appointmentId)]);

    const appointmentBirds = result[1];
    var formattedBirds = [];
    for (let i = 0; i < appointmentBirds.length; i++) {
        formattedBirds.push(appointmentBirds[i]);
    }
    const appointmentData = {
        appointmentId: appointmentId,
        customerId: result[0].customerId,
        startDate: result[0].startDate,
        endDate: result[0].endDate,
        rate: result[0].rate,
        status: Utilities.numericStatusToString(result[0].status),
        notes: result[0].notes,
        birds: formattedBirds
    };

    return appointmentData;
};

module.exports = getAppointment;
