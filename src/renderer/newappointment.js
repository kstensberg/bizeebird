var root = document.body;

m.render(root, m('div', { 'id':'new-appointment-toplevel' },
    m('form',
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
                                                    'Start Date'
                                                ),
                                                m('td',
                                                    m('input', { 'name':'startDate','type':'text' })
                                                )
                                            ]
                                        ),
                                        m('tr',
                                            [
                                                m('th',
                                                    'End Date'
                                                ),
                                                m('td',
                                                    m('input', { 'name':'endDate','type':'text' })
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
                    m('input', { 'class':'btn btn-primary','type':'button','value':'OK' }),
                    m('input', { 'class':'btn btn-primary','type':'button','value':'Cancel' })
                ]
            )
        ]
    )
));
