'use strict';

var UpcomingDropoffTable = {
    dataRows: [],
    oninit: async function(vnode) {
        const response = await window.contextBridge.database.getUpcomingDropoffs();

        for (const row of response) {
            this.dataRows.push([row.Date, row.Name, row.BirdName, row.BirdBreed, row.CageNeeded]);
        }

        m.redraw();
    },
    view: function(vnode) {

        var displayRows = [];

        for (const dataRow of this.dataRows) {
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
