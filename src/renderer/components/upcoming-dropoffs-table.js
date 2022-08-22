'use strict';

import { Table } from './table.js';

var UpcomingDropoffsTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingDropoffs();

        for (const row of response) {
            this.dataRows.push([row.Date, row.Name, row.BirdName, row.BirdBreed, row.CageNeeded]);
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
