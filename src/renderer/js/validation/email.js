'use strict';

export default function(input) {
    if (!input.includes('@')) {
        return 'email must contain @';
    }

    if (validator.isEmail(input)) {
        return true;
    }

    return input + ' is not an email';
}