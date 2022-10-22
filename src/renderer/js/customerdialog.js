'use strict';

import { LabeledContainer } from './components/labeled-container.js';
import { Table } from './components/table.js';
import { IconButton } from './components/icon-button.js';
import { ValidatedInput } from './components/validated-input.js';
import Validate from './validation/validate.js';


var CustomerDialogModel = {
    customerId: null,
    name: {
        value: null
    },
    phoneNumbers: [null],
    email: {
        value: null
    },
    rate: null,
    notes: null,
    currentBirdInput: {
        name: null,
        breed: null,
        color: null,
        age: null,
        gender: null,
        notes: null,
    },
    birds: [],
};

class CustomerDialog {
    oninit(vnode) {
    }

    view(vnode) {
        return m('div', { 'class': 'dialog-toplevel' },
            [
                m('div', { 'class': 'dialog-body' },
                    m('div', { 'id': 'new-customer-toplevel' }, [
                        m('table', { 'class': 'form-table' },
                            m('tbody', [
                                m('tr', [
                                    m('th', 'Name'),
                                    m('td',
                                        m(ValidatedInput, {
                                            'value': CustomerDialogModel.name.value,
                                            'type': 'text',
                                            'validator': Validate.customerName,
                                            'onchange': function(event, params) {
                                                CustomerDialogModel.name = params;
                                            }
                                        })
                                    )
                                ]),
                                m('tr', [
                                    m('th', 'Phone Number'),
                                    m('td',
                                        [
                                            m('div', CustomerDialogModel.phoneNumbers.map((phoneNumber, idx) => {
                                                return m(ValidatedInput, {
                                                    'value': phoneNumber,
                                                    'type': 'tel',
                                                    'validator': Validate.phoneNumber,
                                                    'onchange': function(event) {
                                                        CustomerDialogModel.phoneNumbers[idx] = event.target.value;
                                                    }
                                                });
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
                                        m(ValidatedInput, {
                                            'value': CustomerDialogModel.email.value,
                                            'type': 'email',
                                            'validator': Validate.email,
                                            'onchange': function(event, params) {
                                                CustomerDialogModel.email = params;
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
                                            'value': CustomerDialogModel.rate,
                                            'onchange': function(event) {
                                                CustomerDialogModel.rate = Number(event.target.value);
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
                            child: m('div', { 'class': 'container' },
                                [
                                    m('div', { 'class': 'row' },
                                        [
                                            m('div', { id: 'bird-table-container', class: 'col' },
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
                                                        m('table', { 'class': 'form-table' } ,
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
                                                                                        'type': 'radio',
                                                                                        'class': 'form-radio-input',
                                                                                        'value': 'male',
                                                                                        checked: CustomerDialogModel.currentBirdInput.gender == 'male',
                                                                                        onchange: function(event) {
                                                                                            CustomerDialogModel.currentBirdInput.gender = 'male';
                                                                                        }
                                                                                    }),
                                                                                    ' Male ',
                                                                                    m('input', {
                                                                                        'type': 'radio',
                                                                                        'class': 'form-radio-input',
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
                m('div', { 'class': 'dialog-footer' },
                    m('div', { 'class': 'dialog-footer-button-container' },
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
                                    if (CustomerDialogModel.name.valid !== true ||
                                        CustomerDialogModel.email.valid !== true) {
                                        return;
                                    }

                                    const data = {
                                        name: CustomerDialogModel.name.value,
                                        phoneNumbers: CustomerDialogModel.phoneNumbers.map((phone) => {
                                            return phone.value;
                                        }),
                                        email: CustomerDialogModel.email.value,
                                        rate: CustomerDialogModel.rate,
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

window.contextBridge.attachEvent('loadCustomer', async function (event, customerId) {
    const customer = await window.contextBridge.database.getCustomer(customerId);

    CustomerDialogModel.customerId = customer.customerId;
    CustomerDialogModel.name = { value: customer.name };

    CustomerDialogModel.phoneNumbers = customer.phoneNumbers.map((phone) => {
        return { value: phone };
    });

    CustomerDialogModel.email = { value: customer.email };
    CustomerDialogModel.rate = customer.rate;
    CustomerDialogModel.notes = customer.notes;

    CustomerDialogModel.birds = customer.birds;

    m.redraw();
});
