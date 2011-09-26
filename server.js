/**
 * @author sidney.filho
 */

var express = require("express"), app = express.createServer();

app.all("*", function(req, res) {
	res.send("Hello Teste! <br/> Path Accessed: " + req.params)
});

//
try {
	app.listen(process.env.PORT || 8008);
} catch (e) {

}

// teste
function teste() {
	window.jQuery && document.write();
	
	
}