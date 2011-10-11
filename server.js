/**
 * @author sidney.filho
 */
/* Requires*/
var cp = require("child_process");
var express = require("express");

/* Identifing is Debuggable */
process.isDebuggable = process.env.isDebuggable || process.env.NODE_ENV === "Development" || process.argv.join('').indexOf('--debug') > 0;

/* Declaring variables */
var app = express.createServer()
	.all("*", function (req, res) {
			res.send("Hello Teste! <br/> Path Accessed: " + req.params);
		})
	.listen(process.isDebuggable ? 8888 : 80);

/*
fs.readFile(path.join(__dirname, '../config.json'), function(err, data) {
var config,
debugServer;
if (err) {
console.warn("could not load config.json\n" + err.toString());
config = {};
}
else {
config = JSON.parse(data);
if (config.hidden) {
config.hidden = config.hidden.map(function(s) {
return new RegExp(s, 'i');
});
}
}
if (!config.webPort) {
config.webPort = 8080;
}
if (!config.debugPort) {
config.debugPort = 5858;
}
if (options.webPort) {
config.webPort = options.webPort;
}

debugServer = new DebugServer();
debugServer.on('close', function () {
console.log('session closed');
process.exit();
});
debugServer.start(config);
});
 */

/* DEBUG Start Node Inspector */
/* if (process.isDebuggable) {
	cp.exec('cmd /K node "' + process.env.NODE_PATH + '\\node_modules\\node-inspector\\bin\\inspector.js"');
	cp.exec('cmd /K start http://localhost:8080');
} */

 