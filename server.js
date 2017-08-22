var express  			= require('express');
var app      			= express();
var mongoose 			= require('bluebird').promisifyAll(require('mongoose'));
var passport 			= require('passport');
var flash    			= require('connect-flash');
var handlebars 	  = require('express3-handlebars');

var morgan        = require('morgan');
var winston 			= require('winston');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var configDB 			= require('./config/database.js');

// bring in handlebars helpers files
var hbsHelpers		= require('./views/helpers/hbsHelpers').helpers();

var favicon = require('serve-favicon');


// CONFIGURATION ================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


// LOGGING ==================
require('./logger');

// MIDDLEWARE ==================
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms
app.use(favicon(__dirname + '/public/images/favicon2.ico'));



app.engine('handlebars', handlebars({
	defaultLayout: 'main',
	helpers: hbsHelpers,
}));

app.set('view engine', 'handlebars'); // set up ejs for templating

app.use('/', express.static(__dirname + '/public')); // server static files

// required for passport
app.use(session(require('./config/session'))); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// ROUTES ========================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// CRON TASKS ==================
require('./cron/cron_meta');


// LAUNCH ======================
switch (process.env.NODE_ENV) {
	case 'test':
		var port = 3001;
		break;
	case 'production':
		var port = process.env.PORT || 3000;
		break;
	default:
		var port = 3000;
		break;
}
app.listen(port);

console.log('The magic happens on port ' + port);
console.log('You are in', process.env.NODE_ENV, 'mode.');

module.exports = app;
