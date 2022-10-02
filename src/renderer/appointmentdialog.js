'using strict';

import { AppointmentBird } from './components/appointment-bird.js';

var AppointmentDialogModel = {
    selectedCustomer: '',

    customerBirds: [],

    setCustomer: async function(customerId) {
        this.selectedCustomer = customerId;

        const dbBirds = await window.contextBridge.database.getCustomerBirds(customerId);

        this.customerBirds = dbBirds.map(function(row) {
            return {
                selected: false,
                birdId: row.BirdId,
                birdName: row.Name,
                wings: false,
                nails: false,
                cageNeeded: false,
                notes: ''
            };
        });
    },

    updateCustomerBird(bird) {
        for (const idx in this.customerBirds){
            if (this.customerBirds[idx].BirdId == bird.birdId) {
                this.customerBirds[idx] = bird;
                return;
            }
        }
    }
};


class AppointmentDialog {
    oninit(vnode) {
    }

    view(vnode) {

        const elements = AppointmentDialogModel.customerBirds.map(function(bird) {
            console.log(bird);
            return m(AppointmentBird, {
                bird: bird,
                onchange: function (birdAppointment) {
                    AppointmentDialogModel.updateBird(bird.BirdId);
                }
            });

            return m('.panel-block', {
                key: bird.id
            }, [
                m('label.checkbox', [
                    m('input', {
                        type: 'checkbox',
                        onchange: function() {
                            if (bird.selected) {
                                AppointmentDialogModel.unselectBird(bird.BirdId);
                            } else {
                                AppointmentDialogModel.selectBird(bird.BirdId);
                            }
                        },
                        checked: bird.selected
                    }),
                    m('span', bird.Name)
                ])
            ]);
        });

        return [
            m('.container', [
                m('nav.panel', [
                    m('p.panel-heading', 'Todos'),
                    m('.panel-block', [
                        m('select', {
                            name: 'customers',
                            oncreate: ({ dom }) => new Choices(dom).setChoices(async function() {
                                const data = await window.contextBridge.database.getAllCustomers();

                                return data.map(function(row) {
                                    return {
                                        value: row.CustomerId,
                                        label: row.Name
                                    };
                                });
                            }),
                            onchange: async function(event) {
                                event.redraw = false;
                                await AppointmentDialogModel.setCustomer(event.detail.value);
                                m.redraw();
                            }
                        })
                    ]),
                    elements
                ])
            ])
        ];
    }
}

m.mount(document.body, AppointmentDialog);
