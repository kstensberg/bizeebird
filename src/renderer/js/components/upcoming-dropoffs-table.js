'use strict';

import { Table } from './table.js';

var UpcomingDropoffsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingDropoffs();
        for (const row of response) {
            this.dataRows.push([
                new Date(row.Date).toLocaleDateString("en-US"),
                m('button', {
                    'type': 'button',
                    'class': 'btn btn-link',
                    'onclick': async () => {
                        await window.contextBridge.openAppointmentDialog(row.appointmentId);
                    }
                }, row.customerName),
                row.birdName,
                row.breed,
                row.cage == 1 ? 
                    m('input', {'type':'checkbox','checked':'checked','disabled':'disabled'}) : 
                    m('input', {'type':'checkbox','disabled':'disabled'})
            ]);
        }

        m.redraw();
    },
    view: function(vnode) {
        return m(Table, {
            headers: ['Date', 'Customers', 'Bird Name', 'Bird Breed', 'Cage Needed'],
            data: this.dataRows
        });


    }
};

export { UpcomingDropoffsTable };
