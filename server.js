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

/* Identifing is Debuggable */
process.isDebuggable = process.env.isDebuggable || process.env.NODE_ENV === "Development" || process.argv.join('').indexOf('--debug') > 0;

/**
 * read config file
 */
var configFilePath = path.join(__dirname, 'config.json');
app.config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
console.log(app.config);

/*
 **  Watch folders
 */
function watchAllNodeFiles(app, targetPath) {
	targetPath = path.resolve(targetPath);
	var stats = fs.statSync(targetPath);
	
	if (stats.isDirectory()) {
		fs.readdirSync(targetPath).forEach(function (fileName) {
				watchAllNodeFiles(app, targetPath + '/' + fileName);
			});
		
	} else if (/.*\.(node|jsx|njs)/.test(targetPath)) {
		
		delete(require.cache[targetPath]);
		var entry,
		target = require(targetPath);
		for (entry in target) {
			if (target.hasOwnProperty(entry)) {
				target[entry](app, express);
			}
		}
	}
}

function MountAppByPath(targetPath) {
	var tmp = express.createServer();
	tmp.set('views', targetPath + '/views');
	tmp.use(express.static(targetPath + '/static'));
	watchAllNodeFiles(tmp, targetPath);
	return tmp;
}

function MountApp(entry) {
	entry.middlewares = [];
	for (var i = 0; i < entry.hosts.length; i += 1) {
		var host = entry.hosts[i];
		
		app.use(express.vhost(host, MountAppByPath(entry.path)));
		entry.middlewares.push(app.stack.length - 1); // Save middleware position
		
		fs.watch(entry.path, function (action) {
				for (var i = 0; i < entry.middlewares.length; i++) {
					app.stack.splice(entry.middlewares[i], 1); // remove item
				}
				
				MountApp(entry);
				//app.use(host, express.vhost(host, MountAppByPath(entry.path)));
			});
	}
}

var entry, i;
for (entry in app.config) {
	if (app.config.hasOwnProperty(entry)) {
		entry = app.config[entry];
		entry.path = entry.path.replace(/\~/g, __dirname);
		entry.hosts = entry.hosts || ["localhost"];
		
		MountApp(entry);
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
 