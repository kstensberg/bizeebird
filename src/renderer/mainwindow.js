
'use strict';

import { Tabs } from './components/tabs.js';


var BizeeBirdBoardingApp = {
    view: function() {
        return m('main', [
            m('div', [
                m('button', {
                    class: 'btn btn-primary',
                    onclick: async function() {
                        await window.contextBridge.openCustomerDialog();
                    }
                }, 'New Customer'),
                m('button', {
                    class: 'btn btn-primary',
                    onclick: async function() {
                        await window.contextBridge.openAppointmentDialog();
                    }
                }, 'New Appointment'),
            ]),
            m(Tabs)
        ]);
    }
};

m.mount(document.body, BizeeBirdBoardingApp);


window.contextBridge.attachEvent('customerSaved', function (){
    m.redraw();
});
