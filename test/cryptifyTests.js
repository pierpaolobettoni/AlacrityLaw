var should = require("should");
var cryptify = require("../cryptify");
var randomstring = require("randomstring");

describe("Encryption and decription work", function () {
    it("should encrypt and decrypt", function () {
        var randomTextToCypher = randomstring.generate(100);
        var randomKey = randomstring.generate(32);
        var encryptedJSON = cryptify.encrypt(randomTextToCypher, randomKey);
        encryptedJSON.cipher.should.not.be.empty();
        var decryptionJSON = cryptify.decrypt(encryptedJSON.cipher, encryptedJSON.initiationVector, randomKey);
        decryptionJSON.text.should.equal(randomTextToCypher);

    })

    it("Each encryption should be different", function () {
        var randomTextToCypher = randomstring.generate(100);
        var randomKey = randomstring.generate(32);
        var results = [];
        // encrypting the same thing many times and store values
        for (var i = 0; i < 100; i++) {
            var encryptedJSON = cryptify.encrypt(randomTextToCypher, randomKey);
            results.push(encryptedJSON.cipher);

        }
        // make sure no value is duplicated
        for (var i = 0; i < results.length; i++) {
            var value = results[i];
            var lastPos = results.lastIndexOf(value);
            lastPos.should.equal(i);
        }

    })


});