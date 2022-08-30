
'use strict';

import { Tabs } from './components/tabs.js';

var BizeeBirdBoardingApp = {
    view: function() {
        return m('main', [
            m('div', [

                m('button', {
                    class: 'btn btn-primary',
                    onclick: function() {
                        window.open('./newcustomer.html');
                    }
                }, 'New Customer'),
                m('button', {
                    class: 'btn btn-primary',
                    onclick: async function() {
                        await window.contextBridge.openNewAppointment();
                    }
                }, 'New Appointment'),
            ]),
            m(Tabs)
        ]);
    }
};

m.mount(document.body, BizeeBirdBoardingApp);
