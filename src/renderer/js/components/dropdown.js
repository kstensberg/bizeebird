'use strict';

class Dropdown {
    constructor(vnode) {
        this.getData = vnode.attrs.getData ?? async function(){};
        this.onSelect = vnode.attrs.onSelect ?? function(){};
    }

    oncreate(vnode) {
        const component = this;
        new Choices(vnode.dom, {}).setChoices(async function() {
            const data = await component.getData();

            const result = [];
            for (const row of data) {
                result.push({ value: row.value, label: row.label });
            }

            return result;
        });
    }

    view() {
        const component = this;
        return m('select', { onchange: function(event) {
            return component.onSelect(event.detail.value);
        } });
    }
}

export { Dropdown };
