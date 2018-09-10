
const hue = require("node-hue-api");
const chalk = require('chalk');
const yargs = require('yargs');
const argv = yargs.argv;

var HueApi = hue.HueApi;

var ConnectionString = argv.conStr;
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var client = DeviceClient.fromConnectionString(ConnectionString, Mqtt);

var displayResult = function(result) {
    console.log(chalk.blue(JSON.stringify(result, null, 2)));
};

var displayError = function(err) {
    console.error(chalk.red(err));
};


function receiveMessageCallback(msg) {
    console.log("Msg received!");
    var message = msg.getData();
    var data = JSON.parse(message);
}

console.log(chalk.yellow.bold("IP address: ", argv.ip));
console.log(chalk.yellow.bold("User name: ", argv.userName));

var host = argv.ip;
var username = argv.userName;
var api;

api = new HueApi(host, username);

//api.getConfig().then(displayResult).done();
//api.getVersion().then(displayResult).done();
//api.getFullState().then(displayResult).done();

api.setLightState(1, {"on": true, "rgb": [255,255,0]}) // provide a value of false to turn off
    .then(displayResult)
    .fail(displayError)
    .done();

/*process.on('uncaughtException', function (err) {
    console.log(err);
}); */


client.open((err)=> {
    if (err) {
        console.error('IoT Hub connect error: '+ err.message);
        return;
    } else {
        console.log(chalk.yellow.bold("Connected to IoT Hub!"));
    }

    client.on('message',receiveMessageCallback);

});
