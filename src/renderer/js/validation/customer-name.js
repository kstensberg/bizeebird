'use strict';

export default function(input) {

    if (input.length < 2) {
        return 'name must be at least 2 characters';
    }

    return true;
}