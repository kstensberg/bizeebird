'use strict';

var SplitPane = {
    oncreate: function(vnode) {
        Split({
            onDragEnd: function() {
                this.currentSize = document.querySelector('.grid').style['grid-template-columns'];
            },
            columnGutters: [{
                track: 1,
                element: document.querySelector('.vertical-gutter'),
            }]
        });

    },
    onbeforeupdate: function(newVnode, oldVnode) {
        return true;
    },
    view: function(vnode) {
        return m('div',  { class: 'grid' }, [
            m('div', { class: 'splitpane-container' }, vnode.attrs.leftComponent),
            m('div', { class: 'splitpane-container' }, vnode.attrs.rightComponent),
            m('div', { class: 'vertical-gutter' })
        ]);
    }
};

export { SplitPane };
