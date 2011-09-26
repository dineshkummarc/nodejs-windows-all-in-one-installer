var db = require("SqlConnection");

exports.PostsController = function(app, express){
	app.get("/list", function(req, res){
		db.connect(function(){
			db.ExecuteQuery("select * from table", function(list){
				res.send(list.count());
			});
		});		
	});
}