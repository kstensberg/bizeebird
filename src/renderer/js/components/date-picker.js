'use strict';

class DatePicker {
    constructor(vnode) {
        this.hiddenInput = vnode.attrs.hiddenInput ?? false;
        this.inline = vnode.attrs.inline ?? true;
        this.onselect = vnode.attrs.onselect ?? function(){};
    }

    oncreate(vnode) {
        this.easepick = new easepick.create({
            element: vnode.dom,
            css: [
                './lib/easepick-1.2.0/index.css'
            ],
            inline: this.inline,
            firstDay: 0,
            RangePlugin: { delimiter: ':' },
            plugins: [ 'RangePlugin' ],
            setup(picker) {
                picker.on('select', (evt) => {
                    const split = vnode.dom.value.split(':');
                    vnode.state.onselect(split[0], split[1]);
                });
            }
        });
    }

    view() {

        const config = {
            'name': 'daterange',
            'type': 'text'
        };

        if (this.hiddenInput == true) {
            config.style = 'display: none;';
        }

        return m('input', config);
    }

    onupdate(vnode) {
        if (vnode.attrs.startDate != null) {
            this.easepick.gotoDate(vnode.attrs.startDate);
            this.easepick.setStartDate(vnode.attrs.startDate);
        }

        if (vnode.attrs.endDate != null) {
            this.easepick.setEndDate(vnode.attrs.endDate);
        }
    }
}

export { DatePicker };
