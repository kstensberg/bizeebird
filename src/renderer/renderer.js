
'use strict';

import { SplitPane } from './components/splitpane.js';

var root = document.body;
var count = 0; // added a variable

var BizeeBirdBoardingApp = {
    view: function() {
        return m('main', [
            m('div', [
                m('button', {
                    class: 'btn btn-primary',
                    onclick: function() {
                        contextBridge.openWindow('src/renderer/index.html');
                        count++;
                    }
                }, 'New Customer'),
                m('button', {
                    class: 'btn btn-primary',
                    onclick: function() {
                        count++;
                    }
                }, 'New Appointment'),
            ]),
            m(SplitPane, {
                leftComponent: m('div', 'LEFT'),
                rightComponent: m('div', 'RIGHT')
            })
        ]);
    }
};

m.mount(document.body, BizeeBirdBoardingApp);
