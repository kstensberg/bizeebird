'use strict';

class AppointmentBird {
    constructor(vnode) {
        this.bird = vnode.attrs.bird;
        this.onchange = vnode.attrs.onchange;
    }
    view() {

        const appointmentBird = this;

        var birdNameLabel = this.bird.birdName;

        if (this.bird.breed) {
            birdNameLabel += ' - ' + this.bird.breed;
        }

        return m('div', { 'class': 'appointment-bird-container' },
            [
                m('div', { 'class': 'form-check' },
                    [
                        m('input', {
                            'class': 'form-check-input',
                            'type': 'checkbox',
                            'name': 'appointmentBirds',
                            'checked': this.bird.selected,
                            onchange: function() {
                                console.log(appointmentBird.bird);
                                //alert('here');
                            }
                        }),
                        m('label', {
                            'class': 'form-check-label',
                            'for': 'appointmentBirds'
                        }, birdNameLabel)
                    ]
                ),
                m('div',
                    m('div', { 'class': 'card card-body' },
                        [
                            m('div', { 'class': 'form-check' },
                                [
                                    m('input', { 'class': 'form-check-input','type': 'checkbox','value': 'wings','name': 'appointmentServices' }),
                                    m('label', { 'class': 'form-check-label','for': 'birdWings' },
                                        'Wings'
                                    )
                                ]
                            ),
                            m('div', { 'class': 'form-check' },
                                [
                                    m('input', { 'class': 'form-check-input','type': 'checkbox','value': 'nails','name': 'appointmentServices' }),
                                    m('label', { 'class': 'form-check-label','for': 'birdNails' },
                                        'Nails'
                                    )
                                ]
                            ),
                            m('div', { 'class': 'form-check' },
                                [
                                    m('input', { 'class': 'form-check-input','type': 'checkbox','value': 'cage','name': 'appointmentServices' }),
                                    m('label', { 'class': 'form-check-label','for': 'birdCageNeeded' },
                                        'Cage Needed'
                                    )
                                ]
                            ),
                            m('div',
                                [
                                    m('label', 'Notes'),
                                    m('br'),
                                    m('textarea', { 'name': 'birdNotes', oninput: () => {
                                        alert('here');
                                    } }),
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
