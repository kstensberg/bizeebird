'use strict';

import { DatePicker } from './components/date-picker.js';

var AppointmentDialogModel = {
    selectedCustomer: null,
    customerBirds: [],
    notes: '',
    startDate: null,
    endDate: null,
    rate: null,
    status: 'Scheduled',

    setCustomer: async function(customerId) {
        this.selectedCustomer = customerId;
        const customer = await window.contextBridge.database.getCustomer(customerId);
        const dbBirds = await window.contextBridge.database.getCustomerBirds(customerId);

        this.rate = customer.rate;
        this.customerBirds = dbBirds.map((bird) => {
            return {
                birdId: bird.birdId,
                name: bird.name,
                selected: false,
                wings: false,
                nails: false,
                cage: false,
                notes: ''
            };
        });
    },
    toggleBirdSelected: function (birdId) {
        this.toggleBirdProp(birdId, 'selected');
    },
    toggleBirdWings: function (birdId) {
        this.toggleBirdProp(birdId, 'wings');
    },
    toggleBirdNails: function (birdId) {
        this.toggleBirdProp(birdId, 'nails');
    },
    toggleBirdCageNeeded: function (birdId) {
        this.toggleBirdProp(birdId, 'cage');
    },
    setBirdNotes: function (birdId, notes) {
        for (const idx in this.customerBirds) {
            if (this.customerBirds[idx].birdId == birdId) {
                this.customerBirds[idx].notes = notes;
                return;
            }
        }
    },
    toggleBirdProp: function (birdId, prop) {
        for (const idx in this.customerBirds) {
            if (this.customerBirds[idx].birdId == birdId) {
                this.customerBirds[idx][prop] = !this.customerBirds[idx][prop];

                if(this.customerBirds[idx][prop] == true) {
                    this.customerBirds[idx].selected = true;
                }

                return;
            }
        }
    }
};


class AppointmentDialog {
    oninit(vnode) {
    }

    view(vnode) {
        return m('div', { 'class':'dialog-toplevel' },
            [
                m('div', { 'class':'dialog-body' },
                    [
                        m('div', { 'id':'appointment-dialog-left-column-container' },
                            m('div', { 'id':'appointment-dialog-left-column' },
                                m('table', { 'class':'form-table' },
                                    m('tbody',
                                        [
                                            m('tr',
                                                [
                                                    m('th',
                                                        'Customer'
                                                    ),
                                                    m('td',
                                                        m('select', {
                                                            oncreate: ({ dom }) => {
                                                                return new Choices(dom, {}).setChoices(async () => {
                                                                    return (await window.contextBridge.database.getAllCustomers()).map((row) => {
                                                                        return {
                                                                            value: row.customerId,
                                                                            label: row.name
                                                                        };
                                                                    });
                                                                });
                                                            },
                                                            onchange: async (event) => {
                                                                event.redraw = false;
                                                                await AppointmentDialogModel.setCustomer(event.detail.value);
                                                                m.redraw();
                                                            }
                                                        })
                                                    )
                                                ]
                                            ),
                                            m('tr',
                                                [
                                                    m('th',
                                                        'Notes'
                                                    ),
                                                    m('td',
                                                        m('textarea', {
                                                            'class': 'form-control',
                                                            'value': AppointmentDialogModel.notes,
                                                            oninput: (event) => {
                                                                AppointmentDialogModel.notes = event.target.value;
                                                            }
                                                        })
                                                    )
                                                ]
                                            ),
                                            m('tr',
                                                [
                                                    m('th',
                                                        'Dates'
                                                    ),
                                                    m('td',
                                                        m(DatePicker, {
                                                            hiddenInput: true,
                                                            onselect: function(start, end) {
                                                                AppointmentDialogModel.startDate = start;
                                                                AppointmentDialogModel.endDate = end;
                                                            }
                                                        })
                                                    )
                                                ]
                                            ),
                                            m('tr',
                                                [
                                                    m('th',
                                                        'Boarding Rate'
                                                    ),
                                                    m('td',
                                                        m('input', {
                                                            'class': 'form-control',
                                                            'type':'number',
                                                            'value': AppointmentDialogModel.rate,
                                                            'onchange': function(event) {
                                                                AppointmentDialogModel.rate = Number(event.target.value);
                                                            }
                                                        })
                                                    )
                                                ]
                                            ),
                                            m('tr',
                                                [
                                                    m('th',
                                                        'Status'
                                                    ),
                                                    m('td',
                                                        m('select', {
                                                            'class': 'form-select',
                                                            'value': AppointmentDialogModel.status,
                                                            'onchange': function(event) {
                                                                AppointmentDialogModel.status = event.target.value;
                                                            }
                                                        }, [
                                                            m('option', { 'value':'Scheduled' },
                                                                'Scheduled'
                                                            ),
                                                            m('option', { 'value':'CheckedIn' },
                                                                'Checked In'
                                                            ),
                                                            m('option', { 'value':'CheckedOut' },
                                                                'Checked Out'
                                                            ),
                                                            m('option', { 'value':'Cancelled' },
                                                                'Cancelled'
                                                            ),
                                                            m('option', { 'value':'NoShow' },
                                                                'No Show'
                                                            )
                                                        ]
                                                        )
                                                    )
                                                ]
                                            )
                                        ]
                                    )
                                )
                            )
                        ),
                        m('div', { 'id':'appointment-dialog-right-column' },
                            m('div', AppointmentDialogModel.customerBirds.map((bird) =>
                                m('div',
                                    m('label', { 'class':'form-check-label' },
                                        [
                                            m('input', {
                                                'type':'checkbox',
                                                'class':'form-check-input',
                                                'value': bird.birdId,
                                                checked: bird.selected,
                                                onchange: function(event) {
                                                    AppointmentDialogModel.toggleBirdSelected(bird.birdId);
                                                }
                                            }),
                                            bird.name
                                        ]
                                    ),
                                    m('div',
                                        m('div', { 'class':'card card-body' },
                                            [
                                                m('label', { 'class':'form-check-label' },
                                                    [
                                                        m('input', {
                                                            'type':'checkbox',
                                                            'class':'form-check-input',
                                                            checked: bird.wings,
                                                            onchange: function(event) {
                                                                AppointmentDialogModel.toggleBirdWings(bird.birdId);
                                                            }
                                                        }),
                                                        'Wings'
                                                    ]
                                                ),
                                                m('label', { 'class':'form-check-label' },
                                                    [
                                                        m('input', {
                                                            'type':'checkbox',
                                                            'class':'form-check-input',
                                                            checked: bird.nails,
                                                            onchange: function(event) {
                                                                AppointmentDialogModel.toggleBirdNails(bird.birdId);
                                                            }
                                                        }),
                                                        'Nails'
                                                    ]
                                                ),
                                                m('label', { 'class':'form-check-label' },
                                                    [
                                                        m('input', {
                                                            'type':'checkbox',
                                                            'class':'form-check-input',
                                                            checked: bird.cage,
                                                            onchange: function(event) {
                                                                AppointmentDialogModel.toggleBirdCageNeeded(bird.birdId);
                                                            }
                                                        }),
                                                        'Cage Needed'
                                                    ]
                                                ),
                                                m('div',
                                                    [
                                                        m('label', { 'for':'birdNotes' },
                                                            'Notes'
                                                        ),
                                                        m('br'),
                                                        m('textarea', {
                                                            'class': 'form-control',
                                                            'value':bird.notes,
                                                            onkeyup: (event) => {
                                                                AppointmentDialogModel.setBirdNotes(bird.birdId, event.target.value);
                                                            }
                                                        }),
                                                    ]
                                                )
                                            ]
                                        )
                                    )
                                ))
                            )
                        )
                    ]
                ),
                m('div', { 'class':'dialog-footer' },
                    m('div', { 'class':'dialog-footer-button-container' },
                        [
                            m('button', {
                                'class': 'btn btn-primary padded-btn',
                                onclick: () => {
                                    window.close();
                                }
                            }, 'Cancel'),
                            m('button', {
                                'class': 'btn btn-primary padded-btn',
                                onclick: async () => {
                                    const newAppointment = {
                                        customerId: AppointmentDialogModel.selectedCustomer,
                                        birds: [],
                                        notes: AppointmentDialogModel.notes,
                                        startDate: AppointmentDialogModel.startDate,
                                        endDate: AppointmentDialogModel.endDate,
                                        rate: AppointmentDialogModel.rate,
                                        status: AppointmentDialogModel.status,
                                    };

                                    for (const customerBird of AppointmentDialogModel.customerBirds) {
                                        if (customerBird.selected) {
                                            newAppointment.birds.push({
                                                birdId: customerBird.birdId,
                                                cage: customerBird.cage,
                                                nails: customerBird.nails,
                                                notes: customerBird.notes,
                                                wings: customerBird.wings
                                            });
                                        }
                                    }

                                    await window.contextBridge.database.saveAppointment(newAppointment);

                                    window.close();
                                }
                            }, 'OK')
                        ]
                    )
                )
            ]
        );
    }
}

m.mount(document.body, AppointmentDialog);
