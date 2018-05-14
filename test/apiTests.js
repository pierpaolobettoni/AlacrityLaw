var supertest = require("supertest");

var randomString = require("randomstring");
var request = require('request-promise');
var chai, { expect, should } = require('chai');

var chaiAsPromised = require("chai-as-promised");

if (process.env.NODE_ENV !== 'production') {
  //console.log("Loading Env File");
  require('dotenv').config({ path: 'process.env' });

}
const serverUrl = "http://localhost:3000";

console.log("Testing on url  " + serverUrl);
// This agent refers to PORT where program is runninng.

var server = supertest.agent(serverUrl);



describe("API is up and running", function () {

  it("HELLO should return a greeting", function (done) {

    // calling home page api
    server.get("/hello/paolo")
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.equal("hello paolo");
        done();
      });
  });

});





describe("API / encrypts and decrypts data with a given ID", function () {

  it("Data can be stored and retrieved", function (done) {
    var aRandomString = "TEST STRING " + randomString.generate(50);
    var aRandomId = randomString.generate(10);
    var anEncryptionKey = randomString.generate(32);
    request({
      "method": "POST",
      "uri": serverUrl + "/",
      "json": true,
      body: {
        "encryptionKey": anEncryptionKey,
        "text": aRandomString,
        "id": aRandomId
      }
    }).then((res) => {
      request({
        "method": "GET",
        "uri": serverUrl + "/?encryptionKey=" + anEncryptionKey + "&id=" + aRandomId

      }).then((getResponse) => {

        JSON.parse(getResponse).text.should.equal(aRandomString);

      })
      done();
    });
    // calling home page api

  });

});

describe("API / returns nothing if ID is not valid", function () {

  it("Data can be stored and retrieved", function (done) {
    var aRandomString = "TEST STRING " + randomString.generate(50);
    var aRandomId = randomString.generate(10);
    var aWrongId = "WRONG_ID";
    var anEncryptionKey = randomString.generate(32);
    request({
      "method": "POST",
      "uri": serverUrl + "/",
      "json": true,
      body: {
        "encryptionKey": anEncryptionKey,
        "text": aRandomString,
        "id": aRandomId
      }
    }).then((res) => {
      request({
        "method": "GET",
        "uri": serverUrl + "/?encryptionKey=" + anEncryptionKey + "&id=" + aWrongId

      }).then((getResponse) => {

        getResponse.should.equal("{}");

      })
      done();
    });
    // calling home page api

  });

});

describe("API / returns nothing key is not valid", function () {

  it("Data can be stored and retrieved", function (done) {
    var aRandomString = "TEST STRING " + randomString.generate(50);
    var aRandomId = randomString.generate(10);
    var aWrongEncryptionKey = randomString.generate(32);
    var anEncryptionKey = randomString.generate(32);
    request({
      "method": "POST",
      "uri": serverUrl + "/",
      "json": true,
      body: {
        "encryptionKey": anEncryptionKey,
        "text": aRandomString,
        "id": aRandomId
      }
    }).then((res) => {
      request({
        "method": "GET",
        "uri": serverUrl + "/?encryptionKey=" + aWrongEncryptionKey + "&id=" + aRandomId

      }).then((getResponse) => {

        getResponse.should.equal("{}");

      })
      done();
    });
    // calling home page api

  });

});




