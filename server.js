/**
 * @author sidney.filho
 */
/* Requires*/
var
fs = require("fs"),
path = require("path"),
cp = require("child_process"),
express = require("express"),
app = express.createServer();

/*
 **  Watch folders
 */
function reloadAllNodeModules(app, targetPath) {
	var
	entry,
	target,
	stats = fs.statSync(targetPath),
	targetPath = path.resolve(targetPath);
	
	if (stats.isDirectory()) {
		
		fs.readdirSync(targetPath).forEach(function (fileName) {
			reloadAllNodeModules(app, targetPath + '/' + fileName);
		});
		
	} else if (/\.(node|jsx|njs)$/.test(targetPath)) {
		
		delete require.cache[targetPath];
		target = require(targetPath);
		for (entry in target) {
			if (target.hasOwnProperty(entry)) {
				target[entry](app, express);
			}
		}
		
	}
}

function mountAppByPath(targetPath) {
	
	var tmp = express.createServer();
	tmp.set('views', targetPath + '/views');
	tmp.use(express.static(targetPath + '/static'));
	reloadAllNodeModules(tmp, targetPath);
	return tmp;
	
}

function mountApp(entry) {
	entry.middlewares = [];
	var i = 0;
	for (i = 0; i < entry.hosts.length; i += 1) {
		/* Create a vhost to encapsulate the application, in future will changed to a fork*/
		app.use(express.vhost(entry.hosts[i], mountAppByPath(entry.path)));
		// Save middleware position
		entry.middlewares.push(app.stack.length - 1);
	}
	
	fs.watch(entry.path, function (action) {
		for (i = 0; i < entry.middlewares.length; i += 1) {
			app.stack.splice(entry.middlewares[i], 1); // remove item to dont use oldies routes
		}
		
		mountApp(entry);
	});
	
}

function main() {
	/* Identifing is Debuggable */
	process.isDebuggable = process.env.isDebuggable || process.env.NODE_ENV === "Development";
	
	/**
	 * read config file
	 */
	var configFilePath = path.join(__dirname, 'config.json');
	app.config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
	console.log(app.config);
	
	var i = 0,
	entry = {};
	
	for (entry in app.config) {
		if (app.config.hasOwnProperty(entry)) {
			entry = app.config[entry];
			entry.path = entry.path.replace(/\~/g, __dirname);
			entry.hosts = entry.hosts || ["localhost"];
			
			mountApp(entry);
		}
	}
	
	/* Start express process */
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.set('view engine', 'ejs');
	
	//app.set('views', __dirname + '/views');
	//app.use(express.static(__dirname + '/static'));
	
	app.all("/", function (req, res) {
		res.send("<h1>Hello World! </h1>");
	})
	.listen(process.isDebuggable ? 3000 : 80);
}
main();
