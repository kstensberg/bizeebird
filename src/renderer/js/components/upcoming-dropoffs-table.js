'use strict';

import { Table } from './table.js';

var UpcomingDropoffsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingDropoffs();

        for (const row of response) {
            this.dataRows.push([
                row.Date,
                m('button', {
                    'type': 'button',
                    'class': 'btn btn-link',
                    'onclick': async () => {
                        await window.contextBridge.openCustomerDialog(row.customerId);
                    }
                }, row.customerName),
                row.birdName,
                row.breed,
                row.cage
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
