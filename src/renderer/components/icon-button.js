'use strict';

var IconButton = {
    view: function(vnode) {

        const imgFilename = vnode.attrs.label.toLowerCase();

        return m('button', { 'class':'btn btn-primary','type':'button' },
            [
                m('img', { 'src':`./img/${imgFilename}.svg` }),
                vnode.attrs.label
            ]
        );
    }
};

export { IconButton };
