const db = require('./dbConfig.js');

var chai = require('chai'),
    assert = chai.assert;
const searchCustomers = require('../../db-management/Customers/queries/searchCustomers');

describe('#searchCustomers()', function () {
    it('should pass if a single customer was located by email address', async () => {
        const customer = await searchCustomers(db, 'j.spunk@hotmail.com');
        assert.typeOf(customer, 'array', 'Customer is an array');
        assert.equal(customer.length, 1);
        assert.equal(customer[0].Email, 'j.spunk@hotmail.com');
    });

    it('should pass if a single customer was located by exact name', async () => {
        const customer = await searchCustomers(db, 'Wendy Hinsberger');
        assert.typeOf(customer, 'array', 'Customer is an array');
        assert.equal(customer.length, 1);
        assert.equal(customer[0].Name, 'Wendy Hinsberger');
    });

    it('should pass if more than one customer was located by email address', async () => {
        const customer = await searchCustomers(db, 'helenacallis@gmail.com');
        assert.typeOf(customer, 'array', 'Customer is an array');
        assert.isAbove(customer.length, 1);
        customer.forEach(item => {
            assert.equal(item.Email,'helenacallis@gmail.com');
        });
    });

    // below test currently deprecated because the query for searching
    // customers groups by name, thus eliminating duplicates from the search
    // I am leaving it in just in case it's needed later

    // it('should pass if more than one customer was located by exact name', async () => {
    //     const customer = await searchCustomers('zzz unknown');
    //     assert.typeOf(customer, 'array', 'Customer is an array');
    //     assert.isAbove(customer.length, 1);
    //     customer.forEach(item => {
    //         assert.equal(item.Name,'zzz unknown');
    //     });
    // });
});
