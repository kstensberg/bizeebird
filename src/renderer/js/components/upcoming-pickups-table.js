'use strict';

import { Table } from './table.js';

var UpcomingPickupsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingPickups();

        for (const row of response) {
            this.dataRows.push([
                new Date(row.Date).toLocaleDateString("en-US"),
                m('button', {
                    'type': 'button',
                    'class': 'btn btn-link',
                    'onclick': async () => {
                        await window.contextBridge.openCustomerDialog(row.customerId);
                    }
                }, row.customerName),
                row.birdName,
                row.breed,
                row.wings == 1 ? 
                    m('input', {'type':'checkbox','checked':'checked','disabled':'disabled'}) : 
                    m('input', {'type':'checkbox','disabled':'disabled'}),
                row.nails == 1 ? 
                    m('input', {'type':'checkbox','checked':'checked','disabled':'disabled'}) : 
                    m('input', {'type':'checkbox','disabled':'disabled'}),
                '$' + row.rate,
                row.notes
            ]);
        }

        m.redraw();
    },
    view: function(vnode) {
        return m(Table, {
            headers: ['Date', 'Customers', 'Bird Name', 'Bird Breed', 'Wings', 'Nails', 'Rate', 'Notes'],
            data: this.dataRows
        });


    }
};

export { UpcomingPickupsTable };
