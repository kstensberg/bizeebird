'use strict';

class Dialog {
    constructor(vnode) {
        this.body = vnode.attrs.body;
        this.footerButtons = vnode.attrs.footerButtons;
    }

    view() {
        const footerButtons = [];
        for (const button of this.footerButtons) {
            let buttonClasses = 'btn btn-primary';
            if (button.classes) {
                buttonClasses = button.classes;
            }
            footerButtons.push(m('button', {
                'class': buttonClasses,
                onclick: button.onclick
            }, button.label));
        }

        return m('div', { 'class':'dialog-toplevel' },
            [
                m('div', { 'class':'dialog-body' },
                    this.body
                ),
                m('div', { 'class':'dialog-footer' },
                    m('div', { 'class': 'dialog-footer-button-container' },
                        footerButtons
                    )
                )
            ]
        );
    }
}

export { Dialog };
