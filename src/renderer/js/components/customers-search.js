'use strict';

import { Table } from './table.js';

var CustomerSearch = {
    dataRows: [],
    updateTable: async function(searchString) {
        this.dataRows = [];
        let data = [];
        if (searchString.length == 0) {
            data = await window.contextBridge.database.getAllCustomers();
        } else {
            data = await window.contextBridge.database.searchCustomers(searchString);
        }

        for (const row of data) {
            let boardingString = '';

            if (typeof row.rate == 'number' && row.rate != null) {
                boardingString = '$' + row.rate.toFixed(2);
            }

            this.dataRows.push([
                m('button', {
                    'type': 'button',
                    'class': 'btn btn-link',
                    'onclick': async () => {
                        await window.contextBridge.openCustomerDialog(row.customerId);
                    }
                }, row.name),
                row.phoneNumber,
                row.email,
                boardingString,
                row.notes
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
                    'placeholder': 'name@example.com',
                    onkeyup: function(e) {
                        component.updateTable(e.target.value);
                    }
                }),
                m('label', { 'for': 'floatingInput' },
                    'Customer Search'
                )]),
            m(Table, {
                headers: ['Customer Name', 'Phone Number', 'Email', 'Boarding Rate', 'Notes'],
                data: this.dataRows
            }),
        ]);


    }
};

export { CustomerSearch };
