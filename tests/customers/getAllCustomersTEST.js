var assert = require('assert');
const getAllCustomers = require('../../db-management/Customers/queries/getAllCustomers.js');

describe('#getAllCustomers()', function () {
    it('should return a list of all customers', function () {
        const customers = getAllCustomers();
        customers.then(function(result) {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
    });
});

