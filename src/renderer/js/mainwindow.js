'use strict';

import { Tabs } from './components/tabs.js';


var BizeeBirdBoardingApp = {
    view: function() {
        return m('div', { id: 'main-window-toplevel' }, [
            m('div', { id: 'main-window-button-bar' }, [
                m('button', {
                    class: 'btn btn-primary padded-btn',
                    onclick: async function() {
                        await window.contextBridge.openCustomerDialog();
                    }
                }, 'New Customer'),
                m('button', {
                    class: 'btn btn-primary padded-btn',
                    onclick: async function() {
                        await window.contextBridge.openAppointmentDialog();
                    }
                }, 'New Appointment'),
            ]),
            m('div', { id: 'main-window-body-toplevel' }, [
                m(Tabs)
            ])
        ]);
    }
};

m.mount(document.body, BizeeBirdBoardingApp);

window.contextBridge.attachEvent('appointmentSaved', function () {
    window.location.reload();
});

window.contextBridge.attachEvent('customerSaved', function () {
    window.location.reload();
});
