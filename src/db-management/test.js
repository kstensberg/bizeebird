const testAppointmentUpdate = require('./Create/createAllAppointment');
const db = require('./dbConfig');

const appointmentPreSave = {
    customerId: 465,
    birds: [
        {
            birdId: 665,
            cage: true,
            nails: true,
            wings: false,
            notes: 'new notes'
        },
        {
            birdId: 611,
            cage: true,
            nails: true,
            wings: false,
            notes: 'new notes'
        }
    ],
    notes: null,
    startDate: '2023-01-12',
    endDate: '2023-01-24',
    rate: 20,
    status: 'Scheduled',
    appointmentId: 1564
};

const appointmentBirds = {
    appointmentBirdId: 6568,
    wings: false,
    nails: false,
    cage: true,
    appointmentId: 1564,
    notes: 'notes for appointment bird'
}

const appointment = {
    appointmentId: 1564,
    startDate: '2023-01-12',
    endDate: '2023-01-24',
    status: 0,
    notes: 'testing notes',
    customerId: 465
};

testAppointmentUpdate(db, appointmentPreSave);
