'use strict';

import { Table } from './table.js';

var UpcomingPickupsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingPickups();

        for (const row of response) {
            this.dataRows.push([
                row.date, 
                m('button', {
                    'type': 'button',
                    'class': 'btn btn-link',
                    'onclick': async () => {
                        await window.contextBridge.openCustomerDialog(row.customerId);
                    }
                }, row.customerName), 
                row.birdName, 
                row.breed, 
                row.wings, 
                row.nails, 
                row.rate, 
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
