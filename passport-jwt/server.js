var express = require('express');
var chalk = require('chalk');

var config = require('./config/properties');
var db = require('./config/database');
var serverConnect = chalk.bold.cyan;
var app = express();
var port = config.port;

db();
app.get('/', function(request, response){
    response.end("Tutorial of Passport-JWT");
})

app.listen(port, function(){
    console.log(serverConnect("Server is running on port ",port));
})

