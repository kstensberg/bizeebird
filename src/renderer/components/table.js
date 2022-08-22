'use strict';

var Table = {
    view: function(vnode) {

        var displayHeaders = [];

        for (const header of vnode.attrs.headers) {
            displayHeaders.push(m('th', { 'scope':'col' },
                header
            ));
        }

        var displayRows = [];

        for (const dataRow of vnode.attrs.data) {
            const displayRow = [];
            for (const dataCol of dataRow) {
                displayRow.push(m('td',
                    dataCol
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
