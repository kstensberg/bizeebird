const createAppointmentBird = (db, appointment, bird) => {
    db.serialize(() => {
        db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ' +
        'Bird_BirdId, Appointment_AppointmentId) VALUES ($wings' +
        '$nails, $cage, $birdId, ' +
        '$appointmentId'), {
            $wings: bird.wings,
            $nails: bird.nails,
            $cage: bird.cage,
            $birdId: bird.birdId,
            $appointmentId: appointment.appointmentId
        };
    });
};

module.exports = createAppointmentBird;
