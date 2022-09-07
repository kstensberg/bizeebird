'use strict';

var Table = {
    view: function(vnode) {

        var displayHeaders = [];

        for (const header of vnode.attrs.headers) {
            displayHeaders.push(m('th', { 'scope':'col' },
                header
            ));
        }

        if (vnode.attrs.removeButton !== undefined) {
            displayHeaders.push(m('td'));
        }

        var displayRows = [];

        for (const idx in vnode.attrs.data) {
            const dataRow = vnode.attrs.data[idx];
            const displayRow = [];
            for (const dataCol of dataRow) {
                displayRow.push(m('td',
                    dataCol
                ));
            }

            if (vnode.attrs.removeButton !== undefined) {

                displayRow.push(m('td',
                    m('img', { 'src': './img/delete.svg', onclick: async function() {
                        return vnode.attrs.removeButton(idx);
                    } })
                ));
            }

            displayRows.push(m('tr', displayRow));
        }

        return m('table', { 'class':'table' },
            [
                m('thead',
                    m('tr',
                        displayHeaders
                    )
                ),
                m('tbody',
                    displayRows
                )
            ]
        );
    }
};

export { Table };
