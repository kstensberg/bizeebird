'use strict';

import { Table } from './table.js';

var UpcomingPickupsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingPickups();

        for (const row of response) {
            this.dataRows.push([row.Date, row.Name, row.BirdName, row.BirdBreed, row.Wings, row.Nails, row.Rate, row.Notes]);
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
