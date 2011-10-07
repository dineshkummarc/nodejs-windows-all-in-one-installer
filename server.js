/**
 * @author sidney.filho
 */

/* Declaring variables */
var express = require("express");
var app = express.createServer();
app.port = process.argv[process.argv.length - 1];

/*  */
app.all("*", function(req, res) {
	res.send("Hello Teste! <br/> Path Accessed: " + req.params)
});

/*  */
app.listen(app.port || 8008);
