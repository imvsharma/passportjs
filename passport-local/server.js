var express = require('express');
var chalk = require('chalk');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var config = require('./config/property');
var db = require('./config/database');
var setupPassport = require('./config/passport');
var routes = require('./server/routes/userRoutes');
var app = express();
var router = express.Router();
var port = config.port;
var log = morgan('dev');
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var sessionProperty = session({
	secret : config.secretKey,
	resave : true,
	saveUninitialized : true
});
var passportInitialize = passport.initialize();
var passportSession = passport.session()
var success = chalk.bold.magenta;
db();
setupPassport(passport);

//app.use
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cookieParser());
app.use(sessionProperty);
app.use(passportInitialize);
app.use(passportSession);

//routes
app.use('/api',router);

routes(router,passport);


app.listen(port, function ( req , res ) {
	console.log(success("Server running on port ",port));
});

