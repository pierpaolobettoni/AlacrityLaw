'use strict';

var restify = require('restify');
var cryptify = require('./cryptify');
var persist = require('./persist');
var restifyValidation = require('node-restify-validation')
if (process.env.NODE_ENV !== 'production') {
    console.log("Loading Env File");
    require('dotenv').config({ path: 'process.env' });

}


function heartbit(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

function encrypt(req, res, next) {

    var encryptionKey = req.body.encryptionKey;
    var text = req.body.text;
    res.send(cryptify.encrypt(text, encryptionKey));
}

function decrypt(req, res, next) {

    var encryptionKey = req.query.encryptionKey;
    var cipher = req.query.cipher;
    var initiationVector = req.query.initiationVector;
    res.send(cryptify.decrypt(cipher, initiationVector, encryptionKey));
}

function storeValueById(req, res, next) {
    // first encrypt it
    var encryptionKey = req.body.encryptionKey;
    var text = req.body.text;
    var id = req.body.id;
    var encryptedData = cryptify.encrypt(text, encryptionKey);
    // store the value regardless of if it is there or not
    persist.setValue(id, JSON.stringify(encryptedData));
    res.send(cryptify.encrypt(text, encryptionKey));
}

function getStoredValue(req, res, next) {
    // first encrypt it
    var encryptionKey = req.query.encryptionKey;
    var id = req.query.id;
    var encryptedData = {};
    // store the value regardless of if it is there or not
    persist.getValue(id).then((value) => {

        if (value) {
            value = JSON.parse(value);
            encryptedData = cryptify.decrypt(value.cipher, value.initiationVector, encryptionKey);

        }
        res.send(encryptedData);
    }).catch(() => { res.send({}); });



}

// Setup the server
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));
server.use(restifyValidation.validationPlugin({
    // Shows errors as an array
    errorsAsArray: false,
    // Not exclude incoming variables not specified in validator rules
    forbidUndefinedVariables: true,
    errorHandler: restify.errors.InvalidArgumentError
}));

// heartbit method
server.get('/hello/:name', heartbit);

//  method
server.post({
    url: '/',
    // simple validation to make sure only required JSON properties are there
    validation: {
        resources: {
            encryptionKey: { isRequired: true, isLength: 32 },
            text: { isRequired: true },
            id: { isRequired: true }
        }
    }
}, storeValueById);

//  method
server.get({
    url: '/',
    // simple validation to make sure only required JSON properties are there
    validation: {
        resources: {
            encryptionKey: { isRequired: true, isLength: 32 },
            id: { isRequired: true }
        }
    }
}, getStoredValue);

if (process.env.ENVIRONMENT == "DEV") {
    // these endpoints are not necessary in prod.
    // encrypt and decrypt only
    server.post({
        url: '/encryptNoStorage',
        // simple validation to make sure only required JSON properties are there
        validation: {
            resources: {
                encryptionKey: { isRequired: true, isLength: 32 },
                text: { isRequired: true }
            }
        }
    },
        encrypt
    );

    server.get({
        // sample URL: /decrypt?encryptionKey=jWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y&cipher=32d3cbc045e9b5d7c32c803a45c52f24&initiationVector=8d23cfac62da8a951b830cb7fdddca6a
        url: '/decryptNoStorage',
        // simple validation to make sure only required query properties are there
        validation: {
            resources: {
                encryptionKey: { isRequired: true, isLength: 32 },
                cipher: { isRequired: true },
                initiationVector: { isRequired: true },

            }
        }
    }, decrypt
    );
}

server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', process.env.WEB_HOST, process.env.PORT);
});