var 
fs = require("fs"),
path = require("path"),
cp = require("child_process"), 
express = require("express"),
app = express.createServer();

exports.PostsController = function (app, express) {
	/*
	var db = require("SqlConnection");
	
	
	app.get("/list", function(req, res){
	db.connect(function(){
	db.ExecuteQuery("select * from table", function(list){
	res.send(list.count());
	});
	});
	});
	
	 */
	
	app.remove("/teste");
	//app.all("/teste", function (req, res) {	res.send("Hello Teste! <br/> <h1>TESTE</h1>");	}); 
}
 