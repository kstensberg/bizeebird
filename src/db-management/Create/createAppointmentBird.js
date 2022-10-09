const createAppointmentBird = (db, appointment, bird) => {
    db.serialize(() => {
        db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ' +
        'Bird_BirdId, Appointment_AppointmentId) VALUES (GroomingWings = $groomingWings' +
        'GroomingNails = $groomingNails, CageNeeded = $cageNeeded, Bird_BirdId = $birdId, ' +
        'Appointment_AppointmentId = $appointmentId'), {
            $GroomingWings: bird.groomingWings,
            $GroomingNails: bird.groomingNails,
            $CageNeeded: bird.cageNeeded,
            $birdId: bird.birdId,
            $appointmentId: appointment.appointmentId
        };
    });
};

module.exports = createAppointmentBird;
