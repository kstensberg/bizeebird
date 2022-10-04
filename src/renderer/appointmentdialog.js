var AppointmentDialogModel = {
    selectedCustomer: '',

    customerBirds: [],

    setCustomer: async function(customerId) {
        this.selectedCustomer = customerId;

        const dbBirds = await window.contextBridge.database.getCustomerBirds(customerId);
        this.customerBirds = dbBirds.map((bird) => {
            console.log(bird);
            return {
                birdId: bird.BirdId,
                name: bird.Name,
                selected: false,
                wings: false,
                nails: false,
                cageNeeded: false,
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
        this.toggleBirdProp(birdId, 'cageNeeded');
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
                return;
            }
        }
    }
};


class AppointmentDialog {
    oninit(vnode) {
    }

    view(vnode) {
        return m('div', [
            m('select', {
                oncreate: ({ dom }) => {
                    return new Choices(dom, {}).setChoices(async () => {
                        return (await window.contextBridge.database.getAllCustomers()).map((row) => {
                            return {
                                value: row.CustomerId,
                                label: row.Name
                            };
                        });
                    });
                },
                onchange: async (event) => {
                    event.redraw = false;
                    await AppointmentDialogModel.setCustomer(event.detail.value);


                    m.redraw();


                }
            }),
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
                                    AppointmentDialogModel.toggleBirdSelected(event.target.value);
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
                                            'value': bird.birdId,
                                            checked: bird.wings,
                                            onchange: function(event) {
                                                AppointmentDialogModel.toggleBirdWings(event.target.value);
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
                                            'value': bird.birdId,
                                            checked: bird.nails,
                                            onchange: function(event) {
                                                AppointmentDialogModel.toggleBirdNails(event.target.value);
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
                                            'value': bird.birdId,
                                            checked: bird.cageNeeded,
                                            onchange: function(event) {
                                                AppointmentDialogModel.toggleBirdCageNeeded(event.target.value);
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
                                            'class':'birdNotes',
                                            'value':bird.notes,
                                            onkeyup: (event) => {
                                                AppointmentDialogModel.setBirdNotes(bird.birdId, event.target.value);
                                                console.log(AppointmentDialogModel);
                                            }
                                        }),
                                    ]
                                )
                            ]
                        )
                    )
                ))
            ),
        ]);
    }
}

m.mount(document.body, AppointmentDialog);
