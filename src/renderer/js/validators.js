validate.validators.optionalEmail = function(value, options, key, attributes) {
    if (value == '' || value == null) {
        return null;
    }

    if ((/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/).test(value)) {
        return null;
    }

    alert(value);

    return 'is not valid';
};
