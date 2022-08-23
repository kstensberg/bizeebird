var assert = require('assert');
const searchCustomers = require('../queries/searchCustomers');

let actual;
let expected;
describe('#customerSearch()', function () {
    it('should pass if a single customer was located by email address', async () => {
        const customer = await searchCustomers('helenacallis@gmail.com');
        if (customer.length == 1) {
            actual = true;
            expected = true;
        } else {
            actual = false;
            expected = true;
        }
        assert.equal(actual, expected);
    });

    it('should pass if a single customer was located by exact name', async () => {
        const customer = await searchCustomers('Wendy Hinsberger');
        if (customer.length == 1) {
            actual = true;
            expected = true;
        } else {
            actual = false;
            expected = true;
        }
        assert.equal(actual, expected);
    })

    it('should pass if more than one customer was located by email address', async () => {
        const customer = await searchCustomers('helenacallis@gmail.com');
        if (customer.length > 1) {
            actual = true;
            expected = true;
        } else {
            actual = false;
            expected = true;
        }
        assert.equal(actual, expected);
    });

    it('should pass if more than one customer was located by name', async () => {
        const customer = await searchCustomers('zzz unknown');
        if (customer.length > 1) {
            actual = true;
            expected = true;
        } else {
            actual = false;
            expected = true;
        }
        assert.equal(actual, expected);
    });
});