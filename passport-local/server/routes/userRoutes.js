var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = function(router,passport){
    router.post('/signup', passport.authenticate('signup', {
        successRedirect : '/api/success',
        failureRedirect : '/api/failure'
    }));

    router.post('/login', passport.authenticate('login', {
        successRedirect : '/api/success',
        failureRedirect : '/api/failure',
        failureflash : true
    }));

    router.get('/success', function(req, res){
            res.send(req.user);
    });

    router.get('/failure', function(req, res){
        res.json({
            message : "Failure"
        });
    });
};