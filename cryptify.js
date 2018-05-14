

const crypto = require('crypto');

const IV_LENGTH = 16;
const ALGORITHM = 'AES-256-CBC';
const ENCODING = 'hex';

var encrypt = function (plain_text, encryptionKey) {

    var validation = validateKey(encryptionKey);
    var cipher_text;
    var IV = new Buffer.from(crypto.randomBytes(IV_LENGTH)); // Random IV    
    var objectToReturn = {

    };
    if (validation.hasErrors == false) {
        // create encryptor
        var encryptor = crypto.createCipheriv(ALGORITHM, encryptionKey, IV);
        encryptor.setEncoding('hex');
        encryptor.write(plain_text);
        encryptor.end();

        // encrypt
        cipher_text = encryptor.read();
        // set up return values
        objectToReturn.initiationVector = IV.toString(ENCODING);
        objectToReturn.cipher = cipher_text;

    } else {
        objectToReturn = validation;
    }

    return objectToReturn;

};

var decrypt = function (cypher, initiationVector, encryptionKey) {
    var validation = validateKey(encryptionKey);
    var objectToReturn = {};

    if (validation.hasErrors == false) {
        initiationVector = new Buffer.from(initiationVector, ENCODING)

        var decryptor = crypto.createDecipheriv(ALGORITHM, encryptionKey, initiationVector);
        var clearText = decryptor.update(cypher, ENCODING);
        clearText += decryptor.final();
        objectToReturn.text = clearText;
    } else {
        objectToReturn = validation;
    }
    return objectToReturn;
};

// some light validation of parameters
function validateKey(encryptionKey) {
    var returnValue = {
        hasErrors: false,
        errors: []
    }
    if (encryptionKey == null) {
        returnValue.hasErrors = true;
        returnValue.errors.push("NULL_KEY");
    } else if (encryptionKey.length != 32) {
        returnValue.hasErrors = true;
        returnValue.errors.push("KEY_LENGTH_NOT_32: " + encryptionKey.length);
    }
    return returnValue;
}


module.exports = { decrypt, encrypt };
