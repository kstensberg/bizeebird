'use strict';

import { Table } from './table.js';

var UpcomingDropoffsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingDropoffs();

        console.log(response);

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
                row.cage
            ]);
        }

        m.redraw();
    },
    view: function(vnode) {

        console.log(this.dataRows);

        return m(Table, {
            headers: ['Date', 'Customers', 'Bird Name', 'Bird Breed', 'Cage Needed'],
            data: this.dataRows
        });


    }
};

export { UpcomingDropoffsTable };
