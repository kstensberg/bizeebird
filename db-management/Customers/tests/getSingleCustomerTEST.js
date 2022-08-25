var chai = require('chai'),
    assert = chai.assert;
const getSingleCustomer = require('../queries/getSingleCustomer.js');

describe('#getSingleCustomer()', function () {
    it('should return a single customer by ID', async () => {
        const customer = await getSingleCustomer(592);
        assert.typeOf(customer, 'object', 'Customer is an object');
        assert.notEqual(customer.Name, undefined, 'Customer name is not undefined');
        assert.equal(customer.Name, 'Helen 2');
    });

    it('should return null if no customer is found', async () => {
        const customer = await getSingleCustomer(122222);
        assert.isUndefined(customer);
    });
});
