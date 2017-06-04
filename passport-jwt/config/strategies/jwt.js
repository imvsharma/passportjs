var passport = require('passport');
var JWT = require('passport-jwt');
var ExtractJWT = JWT.ExtractJwt;
var JWTStrategy = JWT.Strategy;
var User = require('../../server/models/userModel');
var config = require('../properties')

module.exports = function(){
    var options = {
        jwtFromRequest : ExtractJWT.fromAuthHeader(),
        secretOrKey : config.key
    };

    
}
