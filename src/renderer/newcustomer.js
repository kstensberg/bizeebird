'use strict';

import { LabeledContainer } from './components/labeled-container.js';
import { Table } from './components/table.js';

m.render(document.body, m('form',
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
                                m('input', { 'type':'text','name':'name' })
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
                                    m('input', { 'type':'tel','name':'phoneNumber' }),
                                    m('input', { 'class':'btn btn-primary','type':'button','value':'Add' }),
                                    m('input', { 'class':'btn btn-primary','type':'button','value':'Remove' })
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
                                m('input', { 'type':'email','name':'email' })
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
                                m('input', { 'type':'text','name':'boardingRate' })
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
                                m('textarea', { 'cols':'21','rows':'4' })
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
                                m('div', { style:'border: 1px solid black;', class:'col' },
                                    m(Table, {
                                        headers: ['Name', 'Breed', 'Color', 'Age', 'Gender', 'Notes'],
                                        data: []
                                    })
                                ),
                                m('div', { style:'border: 1px solid black;', 'class':'col-md-auto' },
                                    m('table',
                                        m('tbody',
                                            [
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Name'
                                                        ),
                                                        m('td',
                                                            m('input', { 'type':'text' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Breed'
                                                        ),
                                                        m('td',
                                                            m('input', { 'type':'text' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Color'
                                                        ),
                                                        m('td',
                                                            m('input', { 'type':'text' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Age'
                                                        ),
                                                        m('td',
                                                            m('input', { 'type':'text' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Age'
                                                        ),
                                                        m('td',
                                                            m('input', { 'type':'text' })
                                                        )
                                                    ]
                                                ),
                                                m('tr',
                                                    [
                                                        m('th',
                                                            'Notes'
                                                        ),
                                                        m('td',
                                                            m('textarea', { 'col':'20', 'rows': 10 })
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
        m('input', { 'class':'btn btn-primary', 'type':'submit','value':'Ok' }),
        m('input', { 'class':'btn btn-primary', 'type':'button','value':'Cancel' })
    ]
));
