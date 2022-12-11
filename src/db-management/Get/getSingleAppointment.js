'use strict';

const getSingleAppointment = (db, appointmentId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT AppointmentId AS appointmentId, StartTime AS startDate, EndTime AS endTime, Notes AS notes FROM Appointments ' +
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
            'GroomingNails AS nails, CageNeeded AS cage, AppointmentBirdNotes AS notes FROM AppointmentBirds ' +
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
        startDate: result[2].startDate,
        endDate: result[2].endDate,
        rate: result[2].rate,
        notes: result[2].notes,
        appointmentBirds: formattedBirds
    };

    return appointmentData;
};

module.exports = getAppointment;
