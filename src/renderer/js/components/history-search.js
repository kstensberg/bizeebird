'use strict';

import { Table } from './table.js';

var HistorySearch = {
    dataRows: [],
    updateTable: async function(searchString) {
        this.dataRows = [];
        let data = [];
        if (searchString.length == 0) {
            data = await window.contextBridge.database.getAllHistory();
        } else {
            data = await window.contextBridge.database.searchHistory(searchString);
        }

        for (const row of data) {
            let boardingString = '';

            if (typeof row.rate == 'number' && row.rate != null) {
                boardingString = '$' + row.rate.toFixed(2);
            }

            const startDate = new Date(row.startDate).toLocaleDateString('en-US');
            const endDate = new Date(row.endDate).toLocaleDateString('en-US');

            let customerName = row.customerName;
            if (customerName.trim() == '') {
                customerName = '(unset)';
            }

            this.dataRows.push([
                m('button', {
                    'type': 'button',
                    'class': 'btn btn-link',
                    'onclick': async () => {
                        await window.contextBridge.openCustomerDialog(row.customerId);
                    }
                }, row.customerName),
                boardingString,
                row.birdName,
                row.breed,
                `${startDate} - ${endDate}`
            ]);
        }

        m.redraw();
    },
    oninit: async function(vnode) {
        await this.updateTable('');
    },
    view: function(vnode) {
        const component = this;
        return m('div', [
            m('div', { 'class': 'form-floating mb-3' }, [
                m('input', {
                    'class': 'form-control',
                    'type': 'text',
                    'placeholder': '',
                    onkeyup: function(e) {
                        component.updateTable(e.target.value);
                    }
                }),
                m('label', { 'for': 'floatingInput' },
                    'History Search'
                )]),
            m(Table, {
                headers: ['Customer Name', 'Boarding Rate', 'Bird Name', 'Breed', 'Dates'],
                data: this.dataRows
            }),
        ]);
    }
};

export { HistorySearch };
