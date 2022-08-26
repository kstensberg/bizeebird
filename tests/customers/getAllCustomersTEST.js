var chai = require('chai'),
    assert = chai.assert;
const getAllCustomers = require('../../db-management/Customers/queries/getAllCustomers.js');

describe('#getAllCustomers()', function () {
    it('should return a list of all customers', async function () {
        const customers = await getAllCustomers();
        assert.isAbove(customers.length, 10);
    });
});

