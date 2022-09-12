const db = require('./dbConfig.js');

var chai = require('chai'),
    assert = chai.assert;
const getAllCustomers = require('../../src/db-management/Customers/queries/getAllCustomers.js');

describe('#getAllCustomers()', function () {
    it('should return a list of all customers', async function () {
        const customers = await getAllCustomers();
        assert.isAbove(customers.length, 10);
    });
});

