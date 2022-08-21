'use strict';

var UpcomingDropoffTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getAllCustomers();

        for (const row of response) {
            this.dataRows.push(['08/20/2022', row.Name, 'River', 'Dog', 'false']);
        }

        m.redraw();
    },
    view: function(vnode) {
        
        var displayRows = [];

        console.log(this.dataRows);

        for (let dataRow of this.dataRows) {
            let displayRow = [];
            for (let dataCol of dataRow) {
                displayRow.push(m('td',
                    dataCol
                ))
            }
            displayRows.push(displayRow);
        }

        return m('table', { 'class':'table' },
            [
                m('thead',
                    m('tr',
                        [
                            m('th', { 'scope':'col' },
                                'Date'
                            ),
                            m('th', { 'scope':'col' },
                                'Customer'
                            ),
                            m('th', { 'scope':'col' },
                                'Bird Name'
                            ),
                            m('th', { 'scope':'col' },
                                'Bird Breed'
                            ),
                            m('th', { 'scope':'col' },
                                'Cage Needed'
                            )
                        ]
                    )
                ),
                m('tbody',
                    displayRows
                )
            ]
        );
    }
};

export { UpcomingDropoffTable };
