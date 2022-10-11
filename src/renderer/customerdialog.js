'use strict';

import { LabeledContainer } from './components/labeled-container.js';
import { Table } from './components/table.js';
import { IconButton } from './components/icon-button.js';

window.contextBridge.attachEvent('loadCustomer', async function (event, customerId) {
    customer = await window.contextBridge.database.getCustomer(customerId);

    CustomerDialogModel = {
        customerId: customer.customerId,
        name: customer.name,
        phoneNumbers: customer.phoneNumber,
        email: customer.email,
        boardingRate: customer.boardingId,
        notes: customer.notes,
        currentBirdInput: {
            name: '',
            breed: '',
            color: '',
            age: null,
            gender: null,
            notes: '',
        },
        birds: customer.birds
    }

    m.redraw();
});

var CustomerDialogModel = {
    customerId: null,
    name: null,
    phoneNumbers: [null],
    email: null,
    boardingRate: null,
    notes: null,
    currentBirdInput: {
        name: null,
        breed: null,
        color: null,
        age: null,
        gender: null,
        notes: null,
    },
    birds: []
};

class CustomerDialog {
    oninit(vnode) {
    }

    view(vnode) {
        return m('div', { 'class':'dialog-toplevel' },
            [
                m('div', { 'class':'dialog-body' },
                    m('div', { 'id':'new-customer-toplevel' }, [
                        m('table', { 'class':'form-table' },
                            m('tbody', [
                                m('tr', [
                                    m('th', 'Name'),
                                    m('td',
                                        m('input', {
                                            'class': 'form-control',
                                            'type':'text',
                                            'value': CustomerDialogModel.name,
                                            'onchange': function(event) {
                                                CustomerDialogModel.name = event.target.value;
                                            }
                                        })
                                    )
                                ]),
                                m('tr', [
                                    m('th', 'Phone Number'),
                                    m('td',
                                    [
                                        m('div', CustomerDialogModel.phoneNumbers.map((phoneNumber, idx) => {
                                            return m('div', [
                                                m('input', { 
                                                    'type':'tel', 
                                                    'class': 'form-control',
                                                    'value': phoneNumber,
                                                    'onchange': function(event) {
                                                        CustomerDialogModel.phoneNumbers[idx] = event.target.value;
                                                    }
                                                }),
                                            ]);
                                        })),
                                        m('div', [
                                            m(IconButton, {
                                                label: 'Add',
                                                onclick: async function() {
                                                    CustomerDialogModel.phoneNumbers.push('');
                                                }
                                            }),
                                            m(IconButton, {
                                                label: 'Remove',
                                                disabled: CustomerDialogModel.phoneNumbers.length <= 1,
                                                onclick: async function() {
                                                    CustomerDialogModel.phoneNumbers.pop();
                                                }
                                            })
                                        ]),
                                    ]
                                    )
                                ]),
                                m('tr', [
                                    m('th', 'E-Mail'),
                                    m('td',
                                        m('input', {
                                            'class': 'form-control',
                                            'type':'email',
                                            'value': CustomerDialogModel.email,
                                            'onchange': function(event) {
                                                CustomerDialogModel.email = event.target.value;
                                            }
                                        })
                                    )
                                ]),
                                m('tr', [
                                    m('th', 'Boarding Rate'),
                                    m('td',
                                        m('input', {
                                            'class': 'form-control',
                                            'type': 'number',
                                            'value': CustomerDialogModel.boardingRate,
                                            'onchange': function(event) {
                                                CustomerDialogModel.boardingRate = Number(event.target.value);
                                            }
                                        })
                                    )
                                ]),
                                m('tr', [
                                    m('th', 'Notes'),
                                    m('td',
                                        m('textarea', {
                                            'class': 'form-control',
                                            'value': CustomerDialogModel.notes,
                                            onkeyup: (event) => {
                                                CustomerDialogModel.notes = event.target.value;
                                            }
                                        })
                                    )
                                ])
                            ]
                            )
                        ),

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
                                                        data: CustomerDialogModel.birds.map((bird) => {
                                                            return [bird.name, bird.breed, bird.color, bird.age, bird.gender, bird.notes];
                                                        }),
                                                        removeButton: async function(index) {
                                                            CustomerDialogModel.birds.splice(index, 1);
                                                        }
                                                    })
                                                ]
                                            ),
                                            m('div', { 'class': 'col-md-auto' },
                                                m('form', { 'id': 'edit-bird-form' },
                                                    [
                                                        m('table', { 'class':'form-table' } ,
                                                            m('tbody',
                                                                [
                                                                    m('tr',
                                                                        [
                                                                            m('th', 'Name'),
                                                                            m('td',
                                                                                m('input', {
                                                                                    'class': 'form-control',
                                                                                    'value': CustomerDialogModel.currentBirdInput.name,
                                                                                    onkeyup: (event) => {
                                                                                        CustomerDialogModel.currentBirdInput.name = event.target.value;
                                                                                    }
                                                                                })
                                                                            )
                                                                        ]
                                                                    ),
                                                                    m('tr',
                                                                        [
                                                                            m('th', 'Breed'),
                                                                            m('td',
                                                                                m('input', {
                                                                                    'class': 'form-control',
                                                                                    'value': CustomerDialogModel.currentBirdInput.breed,
                                                                                    onkeyup: (event) => {
                                                                                        CustomerDialogModel.currentBirdInput.breed = event.target.value;
                                                                                    }
                                                                                })
                                                                            )
                                                                        ]
                                                                    ),
                                                                    m('tr',
                                                                        [
                                                                            m('th', 'Color'),
                                                                            m('td',
                                                                                m('input', {
                                                                                    'class': 'form-control',
                                                                                    'value': CustomerDialogModel.currentBirdInput.color,
                                                                                    onkeyup: (event) => {
                                                                                        CustomerDialogModel.currentBirdInput.color = event.target.value;
                                                                                    }
                                                                                })
                                                                            )
                                                                        ]
                                                                    ),
                                                                    m('tr',
                                                                        [
                                                                            m('th',
                                                                                'Age'
                                                                            ),
                                                                            m('td',
                                                                                m('input', {
                                                                                    'class': 'form-control',
                                                                                    'type': 'number',
                                                                                    'value': CustomerDialogModel.currentBirdInput.age,
                                                                                    onchange: (event) => {
                                                                                        CustomerDialogModel.currentBirdInput.age = Number(event.target.value);
                                                                                    }
                                                                                })
                                                                            )
                                                                        ]
                                                                    ),
                                                                    m('tr',
                                                                        [
                                                                            m('th', 'Gender'),
                                                                            m('td',
                                                                                [
                                                                                    m('input', {
                                                                                        'type':'radio',
                                                                                        'class':'form-radio-input',
                                                                                        'value': 'male',
                                                                                        checked: CustomerDialogModel.currentBirdInput.gender == 'male',
                                                                                        onchange: function(event) {
                                                                                            CustomerDialogModel.currentBirdInput.gender = 'male';
                                                                                        }
                                                                                    }),
                                                                                    ' Male ',
                                                                                    m('input', {
                                                                                        'type':'radio',
                                                                                        'class':'form-radio-input',
                                                                                        'value': 'female',
                                                                                        checked: CustomerDialogModel.currentBirdInput.gender == 'female',
                                                                                        onchange: function(event) {
                                                                                            CustomerDialogModel.currentBirdInput.gender = 'female';
                                                                                        }
                                                                                    }),
                                                                                    ' Female '
                                                                                ]
                                                                            )
                                                                        ]
                                                                    ),
                                                                    m('tr',
                                                                        [
                                                                            m('th', 'Notes'),
                                                                            m('td',
                                                                                m('textarea', {
                                                                                    'class': 'form-control',
                                                                                    'value': CustomerDialogModel.currentBirdInput.notes,
                                                                                    onkeyup: (event) => {
                                                                                        CustomerDialogModel.currentBirdInput.notes = event.target.value;
                                                                                    }
                                                                                })
                                                                            )
                                                                        ]
                                                                    )
                                                                ]
                                                            )
                                                        ),
                                                        m(IconButton, {
                                                            label: 'Add',
                                                            onclick: async function() {
                                                                CustomerDialogModel.birds.push(CustomerDialogModel.currentBirdInput);

                                                                CustomerDialogModel.currentBirdInput = {
                                                                    name: null,
                                                                    breed: null,
                                                                    color: null,
                                                                    age: null,
                                                                    gender: null,
                                                                    notes: null,
                                                                };
                                                            }
                                                        })
                                                    ]
                                                )
                                            )
                                        ]
                                    )
                                ]
                            ),
                        })
                    ])
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
                                    const data = {
                                        name: CustomerDialogModel.name,
                                        phoneNumbers: CustomerDialogModel.phoneNumbers,
                                        email: CustomerDialogModel.email,
                                        boardingRate: CustomerDialogModel.boardingRate,
                                        notes: CustomerDialogModel.notes,
                                        birds: CustomerDialogModel.birds
                                    };

                                    if (CustomerDialogModel.customerId != null && CustomerDialogModel.customerId != undefined) {
                                        data.customerId == CustomerDialogModel.customerId;
                                    }

                                    await window.contextBridge.database.saveCustomer(data);

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

m.mount(document.body, CustomerDialog);
