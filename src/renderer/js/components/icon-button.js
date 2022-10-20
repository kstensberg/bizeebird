'use strict';

var IconButton = {
    view: function(vnode) {

        const imgFilename = vnode.attrs.label.toLowerCase();

        return m('button', {
            'class': 'btn btn-primary padded-btn',
            'type': 'button',
            'disabled': vnode.attrs.disabled || false,
            'onclick': vnode.attrs.onclick
        }, [
            m('img', { 'src': `../../assets/${imgFilename}.svg` }),
            vnode.attrs.label
        ]
        );
    }
};

export { IconButton };
