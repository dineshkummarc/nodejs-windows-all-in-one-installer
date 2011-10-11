/**
 * @author sidney.filho
 */
/* Requires*/
var
fs = require("fs"),
cp = require("child_process"),
express = require("express"),
app = express.createServer();

/* Identifing is Debuggable */
process.isDebuggable = process.env.isDebuggable || process.env.NODE_ENV === "Development" || process.argv.join('').indexOf('--debug') > 0;

/* Start express process */
app
.all("*", function (req, res) {
		res.send("Hello Teste! <br/> Path Accessed: " + req.params);
	})
.listen(process.isDebuggable ? 8888 : 80);

/**
 * read config file
 */
var configFilePath = require("path").join(__dirname, '\\config.json');
app.config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));



