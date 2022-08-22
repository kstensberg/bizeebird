'use strict';

import { LabeledContainer } from './labeled-container.js';
import { SplitPane } from './splitpane.js';
import { UpcomingDropoffsTable } from './upcoming-dropoffs-table.js';
import { UpcomingPickupsTable } from './upcoming-pickups-table.js';
import { CustomerSearch } from './customers-search.js';

var Tabs = {
    view: function(vnode) {
        return m('div',
            [
                m('ul', { 'class':'nav nav-tabs','id':'mainTabs','role':'tablist' },
                    [
                        m('li', { 'class':'nav-item','role':'presentation' },
                            m('button', { 'class':'nav-link active','id':'appointments-tab','data-bs-toggle':'tab','data-bs-target':'#appointments','type':'button','role':'tab','aria-controls':'Appointments','aria-selected':'true' },
                                'Appointments'
                            )
                        ),
                        m('li', { 'class':'nav-item','role':'presentation' },
                            m('button', { 'class':'nav-link','id':'customers-tab','data-bs-toggle':'tab','data-bs-target':'#customers','type':'button','role':'tab','aria-controls':'customers','aria-selected':'false' },
                                'Customers'
                            )
                        ),
                        m('li', { 'class':'nav-item','role':'presentation' },
                            m('button', { 'class':'nav-link','id':'history-tab','data-bs-toggle':'tab','data-bs-target':'#history','type':'button','role':'tab','aria-controls':'contact','aria-selected':'false' },
                                'History'
                            )
                        )
                    ]
                ),
                m('div', { 'class':'tab-content','id':'mainTabsContent' },
                    [
                        m('div', { 'class':'tab-pane fade show active','id':'appointments','role':'tabpanel','aria-labelledby':'appointments-tab' },
                            m(SplitPane, {
                                leftComponent: m(LabeledContainer, {
                                    label: 'Upcoming Drop Offs',
                                    child: m(UpcomingDropoffsTable)
                                }),
                                rightComponent: m(LabeledContainer, {
                                    label: 'Upcoming Pickups',
                                    child: m(UpcomingPickupsTable)
                                })
                            })
                        ),
                        m('div', { 'class':'tab-pane fade','id':'customers','role':'tabpanel','aria-labelledby':'customers-tab' },
                            m(CustomerSearch)
                        ),
                        m('div', { 'class':'tab-pane fade','id':'history','role':'tabpanel','aria-labelledby':'history-tab' },
                            'history'
                        )
                    ]
                )
            ]
        );
    }
};

export { Tabs };
