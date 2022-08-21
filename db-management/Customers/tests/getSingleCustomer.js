var assert = require('assert');
const getSingleCustomer = require('../queries/getSingleCustomer.js');

describe('#getSingleCustomer()', function () {
    it('should return a single customer', function () {
        const customer = getSingleCustomer(1);
        customer.then(function(result) {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
    });
});