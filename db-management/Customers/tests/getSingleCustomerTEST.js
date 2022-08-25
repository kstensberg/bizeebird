var assert = require('assert');
const getSingleCustomer = require('../queries/getSingleCustomer.js');

let expected;
let actual;
describe('#getSingleCustomer()', function () {
    it('should return a single customer by ID', async () => {
        const customer = await getSingleCustomer(1);
        if (customer.length == 1) {
            actual = true;
            expected = true;
        } else {
            actual = false;
            expected = true;
        }
        assert.equal(actual, expected);
    });

    it('should fail if no customer is returned', async () => {
        const customer = await getSingleCustomer(122222);
        if (customer == undefined) {
            actual = false;
            expected = false;
        } else {
            actual = true;
            expected = false;
        }
        assert.notEqual(actual, expected);
    });
});
