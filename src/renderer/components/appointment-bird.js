'use strict';

class AppointmentBird {
    constructor(vnode) {
        this.bird = vnode.attrs.bird;
        console.log(this.bird);
    }
    view() {

        var birdNameLabel = this.bird.name;

        if (this.bird.breed) {
            birdNameLabel += ' - ' + this.bird.breed;
        }

        return m('div', { 'class':'appointment-bird-container' },
            [
                m('div', { 'class':'form-check' },
                    [
                        m('input', { 'class':'form-check-input','type':'checkbox','value':this.bird.id,'name':'appointmentBirds' }),
                        m('label', { 'class':'form-check-label','for':'appointmentBirds' },
                            birdNameLabel
                        )
                    ]
                ),
                m('div',
                    m('div', { 'class':'card card-body' },
                        [
                            m('div', { 'class':'form-check' },
                                [
                                    m('input', { 'class':'form-check-input','type':'checkbox','value':'wings','name':'appointmentServices' }),
                                    m('label', { 'class':'form-check-label','for':'birdWings' },
                                        'Wings'
                                    )
                                ]
                            ),
                            m('div', { 'class':'form-check' },
                                [
                                    m('input', { 'class':'form-check-input','type':'checkbox','value':'nails','name':'appointmentServices' }),
                                    m('label', { 'class':'form-check-label','for':'birdNails' },
                                        'Nails'
                                    )
                                ]
                            ),
                            m('div', { 'class':'form-check' },
                                [
                                    m('input', { 'class':'form-check-input','type':'checkbox','value':'cageNeeded','name':'appointmentServices' }),
                                    m('label', { 'class':'form-check-label','for':'birdCageNeeded' },
                                        'Cage Needed'
                                    )
                                ]
                            ),
                            m('div',
                                [
                                    m('label', { 'for':'birdNotes' },
                                        'Notes'
                                    ),
                                    m('br'),
                                    m('textarea', { 'name':'birdNotes' }),
                                ]
                            )
                        ]
                    )
                )
            ]
        );
    }
}

export { AppointmentBird };
