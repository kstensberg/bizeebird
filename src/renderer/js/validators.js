validate.validators.optionalEmail = function(value, options, key, attributes) {
    if (value == '') {
        return null;
    }

    if ((/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/).test(value)) {
        return null;
    }

    return 'email is not valid';
};
