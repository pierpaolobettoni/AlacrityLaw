const { promisify } = require('util');
console.log("Connecting to redis at url: " + process.env.REDIS_ENDPOINT)
var redis = require("redis"),
    client = redis.createClient(
        //     {
        //         host: process.env.REDIS_HOST,
        //         port: process.env.REDIS_PORT
        //     }
    );
//client.auth(process.env.REDIS_PASSWORD);
client.on("redis error", function (err) {
    console.log("Error " + err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const pingAsync = promisify(client.ping).bind(client);


var setValue = function (key, value) {
    return client.set(key, value);
}

var getValue = function (key) {
    return getAsync(key);
}

var pingPong = function () {
    return pingAsync();
}


module.exports = { setValue, getValue, pingPong };










