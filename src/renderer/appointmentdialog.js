'use strict';

import { IconButton } from './components/icon-button.js';
import { AppointmentBird } from './components/appointment-bird.js';
var customerId = null;
var birds = [];

var AppointmentDialog = {
    view: function() {
        const birdComponents = [];

        for (const bird of birds) {
            birdComponents.push (m(AppointmentBird, { bird: bird }));
        }

        return m('div', { 'id':'new-appointment-toplevel' },
            m('form', { 'id': 'new-appointment-form' },
                [
                    m('div', { 'class':'container' },
                        m('div', { 'class':'row' },
                            [
                                m('div', { 'class':'col' },
                                    m('table',
                                        m('tbody',
                                            [
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Customer'
                                                        ),
                                                        m('td',
                                                            m('select', { 'id': 'customerNameInput', 'name':'customerName' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Notes'
                                                        ),
                                                        m('td',
                                                            m('textarea', { 'name':'notes','cols':'20','rows':'10' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Dates'
                                                        ),
                                                        m('td',
                                                            m('input', { 'name':'daterange','type':'text', 'id': 'datepicker' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Boarding Rate'
                                                        ),
                                                        m('td',
                                                            m('input', { 'name':'boardingRate','type':'number' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Status'
                                                        ),
                                                        m('td',
                                                            m('select', { 'name':'status' },
                                                                [
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
                                ),
                                m('div', { 'class':'col' },
                                    birdComponents
                                )
                            ]
                        )
                    ),
                    m('div', { 'class':'dialog-buttons' },
                        [
                            m(IconButton, {
                                label: 'Ok',
                                onclick: async function() {
                                    const dateRangeString = document.querySelector('input[name=\'daterange\']').value;
                                    let startDate = null;
                                    let endDate = null;

                                    if (dateRangeString !== '') {
                                        const dateRangeSplit = dateRangeString.split(':');
                                        startDate = dateRangeSplit[0];
                                        endDate = dateRangeSplit[1];
                                    }

                                    const checkboxes = document.querySelectorAll('input[name=\'appointmentBirds\']:checked');
                                    document.querySelectorAll('input[name=\'appointmentServices\']:checked');

                                    const birds = [];
                                    checkboxes.forEach((checkbox) => {
                                        birds.push(checkbox.value);
                                    });

                                    await window.contextBridge.database.saveAppointment({
                                        customerId: customerId,
                                        notes: document.querySelector('textarea[name=\'notes\']').value,
                                        startDate: startDate,
                                        endDate: endDate,
                                        boardingRate: document.querySelector('input[name=\'boardingRate\']').value,
                                        status: document.querySelector('select[name=\'status\']').value,
                                        birds: birds
                                    });

                                    window.close();
                                }
                            }),
                            m(IconButton, {
                                label: 'Cancel',
                                onclick: async function() {
                                    window.close();
                                }
                            })
                        ]
                    )
                ]
            )
        );
    }
};

m.mount(document.body, AppointmentDialog);

window.picker = new easepick.create({
    element: '#datepicker',
    css: [
        './lib/easepick-1.2.0/index.css'
    ],
    inline: true,
    firstDay: 0,
    RangePlugin: { delimiter: ':' },
    plugins: [ 'RangePlugin' ]
});

const customerNameInput = document.querySelector('#customerNameInput');
new Choices(customerNameInput, {
}).setChoices(async function() {
    const data = await window.contextBridge.database.getAllCustomers();

    const result = [];
    for (const row of data) {
        result.push({ value: row.CustomerId, label: row.Name });
    }

    return result;
});

customerNameInput.addEventListener(
    'change',
    async function(event) {
        customerId = event.detail.value;
        const dbBirds = await window.contextBridge.database.getCustomerBirds(customerId);
        birds = [];

        for (const dbBird of dbBirds) {
            birds.push({
                id: dbBird.BirdId,
                name: dbBird.Name
            });
        }

        m.redraw();
    },
    false,
);
