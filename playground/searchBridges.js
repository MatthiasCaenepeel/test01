
var hue = require("node-hue-api"); 

var displayBridges = function(bridge) {
	console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

timeout = 30000;

hue.nupnpSearch(function(err, result) {
	if (err) throw err;
	displayBridges(result);
});


hue.upnpSearch(timeout).then(displayBridges).done();

