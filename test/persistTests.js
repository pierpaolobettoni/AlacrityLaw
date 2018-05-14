var chai, { expect, should } = require('chai');

var chaiAsPromised = require("chai-as-promised");

var persist = require("../persist");
var randomstring = require("randomstring");
const { promisify } = require('util');
if (process.env.NODE_ENV !== 'production') {
    //console.log("Loading Env File");
    require('dotenv').config({ path: 'process.env' });

}

describe("Persistance works", function () {
    it("should PingPong", (done) => {
        persist.pingPong().should.eventually.equal("PONG");
        done();
    }
    );
    it("should store and retrieve a value", function () {

        var TEST_KEY = "TEST_REDIS_KEY";

        var randomValueToStore = randomstring.generate(100);
        var persisted = persist.setValue(TEST_KEY, randomValueToStore);

        persist.getValue(TEST_KEY).then((retrievedValue) => {
            retrievedValue.should.equal(randomValueToStore);
        });
    })




});