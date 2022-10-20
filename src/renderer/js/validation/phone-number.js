'use strict';

export default function(input) {
    if (input.length < 2) {
        return 'phone must be at least 2 numbers';
    }

    if (validator.isMobilePhone(input, ['en-US'])) {
        return true;
    }

    return input + ' is not valid phone number';
}