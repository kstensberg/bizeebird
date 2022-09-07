const createAppointmentBird = (db, appointment, bird) => {
    db.serialize(() => {
        db.run('INSERT INTO AppointmentBirds (GroomingWings, GroomingNails, CageNeeded, ' +
        'Bird_BirdId, Appointment_AppointmentId) VALUES (GroomingWings = $GroomingWings' +
        'GroomingNails = $GroomingNails, CageNeeded = $CageNeeded, Bird_BirdId = $Bird_BirdId, ' +
        'Appointment_AppointmentId = $Appointment_AppointmentId'), {
            $GroomingWings: GroomingWings,
            $GroomingNails: GroomingNails,
            $CageNeeded: CageNeeded,
            $Bird_BirdId: bird.Bird_BirdId,
            $Appointment_AppointmentId: appointment.Appointment_AppointmentId
        });
    });
};

module.exports = createAppointmentBird;