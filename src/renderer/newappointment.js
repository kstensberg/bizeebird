'use strict';

import { IconButton } from './components/icon-button.js';

var root = document.body;

m.render(root, m('div', { 'id':'new-appointment-toplevel' },
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
                                                    m('input', { 'name':'customerId','type':'text' })
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
                                                    m('input', { 'name':'boardingRate','type':'text' })
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
                                                            m('option', { 'value':'scheduled' },
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
                            m('table',
                                m('tbody',
                                    [
                                        m('tr',
                                            [
                                                m('th',
                                                    'Bird1'
                                                ),
                                                m('td',
                                                    m('input', { 'type':'checkbox','name':'appointmentBirds[]','value':'1' })
                                                )
                                            ]
                                        ),
                                        m('tr',
                                            [
                                                m('th',
                                                    'Bird2'
                                                ),
                                                m('td',
                                                    m('input', { 'type':'checkbox','name':'appointmentBirds[]','value':'2' })
                                                )
                                            ]
                                        )
                                    ]
                                )
                            )
                        )
                    ]
                )
            ),
            m('div', { 'class':'dialog-buttons' },
                [
                    m(IconButton, { label: 'Ok' }),
                    m(IconButton, { label: 'Cancel' })
                ]
            )
        ]
    )
));


window.picker = new easepick.create({
    element: "#datepicker",
    css: [
        "./lib/easepick-1.2.0/index.css"
    ],
    inline: true,
    RangePlugin: { delimiter: ":" },
    plugins: [ "RangePlugin" ]
});