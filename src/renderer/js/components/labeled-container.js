'use strict';

var LabeledContainer = {
    view: function(vnode) {
        return m('fieldset', { 'class': 'labeled-container' },
            [
                m('legend',
                    vnode.attrs.label
                ),
                m('div', vnode.attrs.child)
            ]
        );
    }
};

export { LabeledContainer };
