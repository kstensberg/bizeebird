'use strict';

import { LabeledContainer } from './components/labeled-container.js';
import { Table } from './components/table.js';
import { IconButton } from './components/icon-button.js';

const birds = [];

var NewCustomerDialog = {
    view: function() {
        
        const birdsTableData = [];

        for (const bird of birds) {
            birdsTableData.push([bird.name, bird.breed, bird.color, bird.age, 'male', bird.notes])
        }
        return m('div', { 'id':'new-customer-toplevel' },
        m('form', {'id': 'new-customer-form'},
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
                                        m('input', { 'type':'tel', 'name':'phoneNumber' }),
                                        m(IconButton, { label: 'Add' }),
                                        m(IconButton, { label: 'Remove' })
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
                                    m('textarea', { 'cols':'23','rows':'4' })
                                )
                            ]
                        )
                    ]
                )
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
                                                data: birdsTableData
                                            }),
                                            m('div', { style: 'float: left;'},
                                                m(IconButton, { 
                                                    label: 'Add',
                                                    onclick: async function() {
                                                        birds.push({
                                                            name: document.querySelector('input[name="birdName"]').value,
                                                            breed: document.querySelector('input[name="birdBreed"]').value,
                                                            color: document.querySelector('input[name="birdColor"]').value,
                                                            age: document.querySelector('input[name="birdAge"]').value,
                                                            gender: 'Male',
                                                            notes: document.querySelector('textarea[name="birdNotes"]').value
                                                        });

                                                        document.querySelector('#new-customer-form').reset(); 
                                                    }
                                                })
                                            ),
                                            m('div', { style: 'float: right;'},
                                                m(IconButton, { label: 'Remove' })
                                            ),
                                            
                                        ]
                                    ),
                                    m('div', { 'class': 'col-md-auto' },
                                        m('table',
                                            m('tbody',
                                                [
                                                    m('tr',
                                                        [
                                                            m('th',
                                                                'Name'
                                                            ),
                                                            m('td',
                                                                m('input', { name: 'birdName', 'type':'text' })
                                                            )
                                                        ]
                                                    ),
                                                    m('tr',
                                                        [
                                                            m('th',
                                                                'Breed'
                                                            ),
                                                            m('td',
                                                                m('input', { name: 'birdBreed', 'type':'text' })
                                                            )
                                                        ]
                                                    ),
                                                    m('tr',
                                                        [
                                                            m('th',
                                                                'Color'
                                                            ),
                                                            m('td',
                                                                m('input', { name: 'birdColor', 'type':'text' })
                                                            )
                                                        ]
                                                    ),
                                                    m('tr',
                                                        [
                                                            m('th',
                                                                'Age'
                                                            ),
                                                            m('td',
                                                                m('input', { name: 'birdAge',  'type':'number' })
                                                            )
                                                        ]
                                                    ),
                                                    m('tr',
                                                        [
                                                            m('th',
                                                                'Notes'
                                                            ),
                                                            m('td',
                                                                m('textarea', { name: 'birdNotes',  'cols':'23','rows':'4' })
                                                            )
                                                        ]
                                                    )
                                                ]
                                            )
                                        )
                                    )
                                ]
                            )
                        ]
                    ),
                })
            ),
            m(IconButton, { label: 'Cancel' }),
            m(IconButton, { label: 'Ok' }),
        ]
    )
        );
    }
};

m.mount(document.body, NewCustomerDialog);
