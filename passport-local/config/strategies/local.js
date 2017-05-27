var passport = require('passport');
var local = require('passport-local');

var User = require('../../server/models/user');

var Strategy = local.Strategy;

module.exports = function(){
    // Tells the passport to use the strategy
    passport.use('signup', new Strategy(
        // take username and password from user
        function(username, password, done){
            //query to get the one user with same username
            User.findOne({username: username}, function(err, user){
                if(err){
                    console.log("Error in find user of same username", err);
                    return done(err);
                }

                if(user){
                    return done(null, false);
                }else{
                    var user1 = new User({
                        username : username,
                        password : password
                    });

                    user1.save(function(err){
                        if(err){
                            console.log("Error in saving user in database", err);
                            throw err;
                        }
                        return done(null, user1);
                    })
                }

            })
        }
    ));


    /* Login Strategy*/
    passport.use('login', new Strategy(
        function(username, password, done){
            User.findOne({username: username}, function(err, user){
                if(err){
                    return done(null,false, {message: err});
                }

                if(!user){
                    return done(null, false, {message: "username does'nt exist"});
                }

                user.comparePassword(password,user.password,function(err, isMatch){
                    if(err){
                        return done(null, false, {message: err});
                    }

                    if(!isMatch){
                        return done(null, false, {message: "password is incorrect"});
                    }

                    return done(null,user);
                })

            })
        }
    ))


}