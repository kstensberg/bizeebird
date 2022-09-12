'use strict';

import { LabeledContainer } from './components/labeled-container.js';
import { Table } from './components/table.js';
import { IconButton } from './components/icon-button.js';

const birds = [];
var phoneNumberCount = 1;

var NewCustomerDialog = {
    view: function() {

        const birdsTableData = [];
        const phoneNumberComponents = [];

        for (let idx = 0; idx < phoneNumberCount; idx++) {
            phoneNumberComponents.push(
                m('div', [
                    m('input', { 'type':'tel', 'name':'phoneNumber', 'class': 'phoneNumberInput' }),
                ])
            );
        }

        for (const bird of birds) {
            birdsTableData.push([bird.name, bird.breed, bird.color, bird.age, bird.gender, bird.notes]);
        }

        return m('div', { 'id':'new-customer-toplevel' },
            [
                m('form', { 'id': 'edit-customer-form' },
                    [
                        m('table',
                            m('tbody',
                                [
                                    m('tr',
                                        [
                                            m('th',
                                                m('label', { 'for':'name' },
                                                    'Name:'
                                                )
                                            ),
                                            m('td',
                                                m('input', { 'type':'text', 'name':'name' })
                                            )
                                        ]
                                    ),
                                    m('tr',
                                        [
                                            m('th',
                                                m('label', { 'for':'phoneNumber' },
                                                    'Phone Number:'
                                                )
                                            ),
                                            m('td',
                                                [
                                                    m('div', phoneNumberComponents),
                                                    m('div', [
                                                        m(IconButton, {
                                                            label: 'Add',
                                                            onclick: async function() {
                                                                phoneNumberCount++;
                                                            }
                                                        }),
                                                        m(IconButton, {
                                                            label: 'Remove',
                                                            disabled: phoneNumberCount <= 1,
                                                            onclick: async function() {
                                                                phoneNumberCount--;
                                                            }
                                                        })
                                                    ]),
                                                ]
                                            )
                                        ]
                                    ),
                                    m('tr',
                                        [
                                            m('th',
                                                m('label', { 'for':'email' },
                                                    'E-Mail:'
                                                )
                                            ),
                                            m('td',
                                                m('input', { 'type':'email', 'name':'email' })
                                            )
                                        ]
                                    ),
                                    m('tr',
                                        [
                                            m('th',
                                                m('label', { 'for':'boardingRate' },
                                                    'Boarding Rate:'
                                                )
                                            ),
                                            m('td',
                                                m('input', { 'type':'text', 'name':'boardingRate' })
                                            )
                                        ]
                                    ),
                                    m('tr',
                                        [
                                            m('th',
                                                m('label', { 'for':'notes' },
                                                    'Notes:'
                                                )
                                            ),
                                            m('td',
                                                m('textarea', { 'name': 'customerNotes', 'cols':'23','rows':'4' })
                                            )
                                        ]
                                    )
                                ]
                            )
                        )
                    ]
                ),
                m('div',
                    m(LabeledContainer, {
                        label: 'Birds',
                        child: m('div', { 'class':'container' },
                            [
                                m('div', { 'class':'row' },
                                    [
                                        m('div', { id: 'bird-table-container', class:'col' },
                                            [
                                                m(Table, {
                                                    headers: ['Name', 'Breed', 'Color', 'Age', 'Gender', 'Notes'],
                                                    data: birdsTableData,
                                                    removeButton: async function(index) {
                                                        birds.splice(index, 1);
                                                    }
                                                }),
                                                m('div',
                                                    m(IconButton, {
                                                        label: 'Add',
                                                        onclick: async function() {
                                                            birds.push({
                                                                name: document.querySelector('input[name="birdName"]').value,
                                                                breed: document.querySelector('input[name="birdBreed"]').value,
                                                                color: document.querySelector('input[name="birdColor"]').value,
                                                                age: document.querySelector('input[name="birdAge"]').value,
                                                                gender: document.querySelector('input[name="birdGender"]:checked').value,
                                                                notes: document.querySelector('textarea[name="birdNotes"]').value
                                                            });

                                                            document.querySelector('#edit-bird-form').reset();
                                                        }
                                                    })
                                                ),

                                            ]
                                        ),
                                        m('div', { 'class': 'col-md-auto' },
                                            m('form', { 'id': 'edit-bird-form' },
                                                m('table',
                                                    m('tbody',
                                                        [
                                                            m('tr',
                                                                [
                                                                    m('th',
                                                                        'Name'
                                                                    ),
                                                                    m('td',
                                                                        m('input', { 'name': 'birdName', 'type':'text' })
                                                                    )
                                                                ]
                                                            ),
                                                            m('tr',
                                                                [
                                                                    m('th',
                                                                        'Breed'
                                                                    ),
                                                                    m('td',
                                                                        m('input', { 'name': 'birdBreed', 'type':'text' })
                                                                    )
                                                                ]
                                                            ),
                                                            m('tr',
                                                                [
                                                                    m('th',
                                                                        'Color'
                                                                    ),
                                                                    m('td',
                                                                        m('input', { 'name': 'birdColor', 'type':'text' })
                                                                    )
                                                                ]
                                                            ),
                                                            m('tr',
                                                                [
                                                                    m('th',
                                                                        'Age'
                                                                    ),
                                                                    m('td',
                                                                        m('input', { 'name': 'birdAge',  'type':'number' })
                                                                    )
                                                                ]
                                                            ),
                                                            m('tr',
                                                                [
                                                                    m('th',
                                                                        m('label', { 'for':'birdGender' },
                                                                            'Gender'
                                                                        )
                                                                    ),
                                                                    m('td',
                                                                        [
                                                                            m('input', { 'type':'radio','name':'birdGender','value':'male' }),
                                                                            ' Male ',
                                                                            m('input', { 'type':'radio','name':'birdGender','value':'female' }),
                                                                            ' Female'
                                                                        ]
                                                                    )
                                                                ]
                                                            ),
                                                            m('tr',
                                                                [
                                                                    m('th',
                                                                        'Notes'
                                                                    ),
                                                                    m('td',
                                                                        m('textarea', { 'name': 'birdNotes',  'cols':'23','rows':'4' })
                                                                    )
                                                                ]
                                                            )
                                                        ]
                                                    )
                                                )
                                            )
                                        )
                                    ]
                                )
                            ]
                        ),
                    })
                ),
                m(IconButton, {
                    label: 'Cancel',
                    onclick: async function() {
                        window.close();
                    }
                }),
                m(IconButton, {
                    label: 'Ok',
                    onclick: async function() {
                        const phoneNumbers = [];
                        for (const phoneInput of document.getElementsByClassName('phoneNumberInput')) {
                            const phoneNumber = phoneInput.value.trim();

                            if (phoneNumber !== '') {
                                phoneNumbers.push(phoneNumber);
                            }
                        }

                        await window.contextBridge.database.saveCustomer({
                            name: document.querySelector('input[name="name"]').value,
                            email: document.querySelector('input[name="email"]').value,
                            boardingRate: document.querySelector('input[name="boardingRate"]').value,
                            notes: document.querySelector('textarea[name="customerNotes"]').value,
                            phoneNumbers: phoneNumbers,
                            birds: birds
                        });

                        window.close();
                    }
                })
            ]
        );
    }
};

m.mount(document.body, NewCustomerDialog);
