var express = require('express');

var config = require('./config/property')
var app = express();
var port = config.port;

app.listen(port, function ( req , res ) {
	console.log("Server running on port ",port);
});

