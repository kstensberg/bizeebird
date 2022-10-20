'use strict';

class ValidatedInput {
    constructor(vnode) {
        this.value = vnode.attrs.value ?? '';
        this.type = vnode.attrs.type ?? 'text'; 

        this.validator = vnode.attrs.validator ?? function(){ return true; };
        this.onchange = vnode.attrs.onchange ?? function(){};

        this.validatorStatus = true;
    }

    view() {
        const validatedInput = this;
        const children = [
            m('input', {
                'class': this.validatorStatus === true ? 'form-control' : 'form-control is-invalid',
                'type': this.type,
                'value': this.value,
                'onchange': function(event) {
                    validatedInput.value = event.target.value;
                    validatedInput.validatorStatus = validatedInput.validator(validatedInput.value);

                    const onchangeParams = {
                        value: validatedInput.value,
                        valid: validatedInput.validatorStatus
                    }

                    validatedInput.onchange(event, onchangeParams);
                }
            })
        ];

        if (this.validatorStatus !== true) {
            children.push(m('div', {
                'class': 'invalid-feedback',
            }, this.validatorStatus));
        }

        return m('div', children);
    }
}

export { ValidatedInput };
