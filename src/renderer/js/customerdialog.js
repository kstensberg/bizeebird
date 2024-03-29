'use strict';

import { LabeledContainer } from './components/labeled-container.js';
import { Table } from './components/table.js';
import { IconButton } from './components/icon-button.js';

const CustomerDialogModel = {
    customerId: null,
    name: null,
    nameErrors: [],
    phoneNumbers: [null],
    phoneNumberErrors: [null],
    email: null,
    emailErrors: [],
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
    birds: []
};

const formConstraints = {
    name: {
        presence: true,
        length: { minimum: 1 }
    },
    email: {
        optionalEmail: true
    },
    rate: {
        presence: true,
        numericality: { greaterThanOrEqualTo: 0 }
    }
};

const validateSingle = (value, constraints) => {
    const result = validate.single(value, constraints);

    if (result == undefined) {
        //return [];
    }

    return result;
};

class CustomerDialog {
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
                                        m('input', {
                                            'class': 'form-control',
                                            'type': 'text',
                                            'value': CustomerDialogModel.name,
                                            'onchange': async function(event) {
                                                event.redraw = false;

                                                CustomerDialogModel.name = event.target.value;
                                                CustomerDialogModel.nameErrors = validateSingle(CustomerDialogModel.name, formConstraints.name);

                                                if (CustomerDialogModel.nameErrors == null) {
                                                    const searchResult = await window.contextBridge.database.searchCustomersByName(CustomerDialogModel.name);
                                                    console.log(searchResult);
                                                    if (searchResult.length > 0) {
                                                        CustomerDialogModel.nameErrors = [
                                                            m('button', {
                                                                'class': 'btn btn-link',
                                                                onclick: async function(){
                                                                    loadCustomer(searchResult[0].customerId);
                                                                }
                                                            }, `Duplicate Customer found: ${searchResult[0].name}`)
                                                        ];
                                                    }
                                                }

                                                m.redraw();
                                            }
                                        }),
                                        m('div',
                                            CustomerDialogModel.nameErrors?.map((error) => {
                                                return m('div', error);
                                            })
                                        )

                                    )
                                ]),
                                m('tr', [
                                    m('th', 'Phone Number'),
                                    m('td',
                                        [
                                            m('div', CustomerDialogModel.phoneNumbers.map((phoneNumber, idx) => {
                                                return m('div', [
                                                    m('input', {
                                                        'type': 'tel',
                                                        'class': 'form-control',
                                                        'value': phoneNumber,
                                                        'onchange': async function(event) {
                                                            event.redraw = false;

                                                            CustomerDialogModel.phoneNumbers[idx] = event.target.value;

                                                            const searchResult = await window.contextBridge.database.searchCustomersByPhone(event.target.value);

                                                            if (searchResult.length > 0) {
                                                                CustomerDialogModel.phoneNumberErrors = [
                                                                    m('button', {
                                                                        'class': 'btn btn-link',
                                                                        onclick: async function(){
                                                                            loadCustomer(searchResult[0].customerId);
                                                                        }
                                                                    }, `Duplicate Customer found: ${searchResult[0].name}`)
                                                                ];
                                                            }

                                                            m.redraw();
                                                        }
                                                    })
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
                                            m('div',
                                                CustomerDialogModel.phoneNumberErrors?.map((error) => {
                                                    return m('div', error);
                                                })
                                            )
                                        ]
                                    )
                                ]),
                                m('tr', [
                                    m('th', 'E-Mail'),
                                    m('td',
                                        m('input', {
                                            'class': 'form-control',
                                            'type': 'email',
                                            'value': CustomerDialogModel.email,
                                            'onchange': async function(event) {
                                                event.redraw = false;

                                                CustomerDialogModel.email = event.target.value;
                                                CustomerDialogModel.emailErrors = validateSingle(CustomerDialogModel.email, formConstraints.email);

                                                if (CustomerDialogModel.emailErrors == null) {
                                                    const searchResult = await window.contextBridge.database.searchCustomersByEmail(CustomerDialogModel.email);

                                                    if (searchResult.length > 0) {
                                                        CustomerDialogModel.emailErrors = [
                                                            m('button', {
                                                                'class': 'btn btn-link',
                                                                onclick: async function(){
                                                                    loadCustomer(searchResult[0].customerId);
                                                                }
                                                            }, `Duplicate Customer found: ${searchResult[0].name}`)
                                                        ];
                                                    }
                                                }

                                                m.redraw();
                                            }
                                        }),
                                        m('div',
                                            CustomerDialogModel.emailErrors?.map((error) => {
                                                return m('div', error);
                                            })
                                        )
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
                                                                                        'value': 'Male',
                                                                                        checked: CustomerDialogModel.currentBirdInput.gender == 'male',
                                                                                        onchange: function(event) {
                                                                                            CustomerDialogModel.currentBirdInput.gender = 'male';
                                                                                        }
                                                                                    }),
                                                                                    ' Male ',
                                                                                    m('input', {
                                                                                        'type': 'radio',
                                                                                        'class': 'form-radio-input',
                                                                                        'value': 'Female',
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

                                    const formErrors = validate(CustomerDialogModel, formConstraints);

                                    if (formErrors) {
                                        CustomerDialogModel.nameErrors = formErrors.name;
                                        CustomerDialogModel.emailErrors = formErrors.email;
                                        CustomerDialogModel.rateErrors = formErrors.rate;
                                        return;
                                    }

                                    const data = {
                                        name: CustomerDialogModel.name,
                                        phoneNumbers: CustomerDialogModel.phoneNumbers.filter(item => item != undefined && item != null && item.length > 0),
                                        email: CustomerDialogModel.email,
                                        rate: CustomerDialogModel.rate,
                                        notes: CustomerDialogModel.notes,
                                        birds: CustomerDialogModel.birds
                                    };

                                    if (CustomerDialogModel.customerId != null && CustomerDialogModel.customerId != undefined) {
                                        data.customerId = CustomerDialogModel.customerId;
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

async function loadCustomer(customerId) {
    const customer = await window.contextBridge.database.getCustomer(customerId);

    CustomerDialogModel.nameErrors = null;
    CustomerDialogModel.emailErrors = null;
    CustomerDialogModel.phoneNumberErrors = null;

    CustomerDialogModel.customerId = customer.customerId;
    CustomerDialogModel.name = customer.name;
    CustomerDialogModel.phoneNumbers = customer.phoneNumbers;
    CustomerDialogModel.email = customer.email;
    CustomerDialogModel.rate = customer.rate;
    CustomerDialogModel.notes = customer.notes;

    CustomerDialogModel.birds = customer.birds;

    m.redraw();
}

window.contextBridge.attachEvent('loadCustomer', async function (event, customerId) {
    return loadCustomer(customerId);
});
