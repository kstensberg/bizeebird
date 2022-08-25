var chai = require('chai'),
    assert = chai.assert;
const searchCustomers = require('../queries/searchCustomers');

describe('#searchCustomers()', function () {
    it('should pass if a single customer was located by email address', async () => {
        const customer = await searchCustomers('helenacallis@gmail.com');
        assert.equal(Object.keys(customer).length, 1);
    });

    it('should pass if a single customer was located by exact name', async () => {
        const customer = await searchCustomers('Wendy Hinsberger');
        assert.equal(Object.keys(customer).length, 1);
    })

    it('should pass if more than one customer was located by email address', async () => {
        const customer = await searchCustomers('helenacallis@gmail.com');
        assert.isAbove(Object.keys(customer).length, 1);
    });

    it('should pass if more than one customer was located by name', async () => {
        const customer = await searchCustomers('zzz unknown');
        assert.isAbove(Object.keys(customer).length, 1);
    });
});
