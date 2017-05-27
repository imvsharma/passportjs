var passport = require('passport');
var User = require('../server/models/user');
var local = require('./strategies/local');

module.exports = function(passport){
/*The user id (you provide as the second argument of the done function) is saved in the session 
and is later used to retrieve the whole object via the deserializeUser function.

serializeUser determines, which data of the user object should be stored in the session.
The result of the serializeUser method is attached to the session as req.session.passport.user = {}. 
Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id:'xyz'}
*/

    //Serialize the user
    passport.serializeUser(function(user,done){
        done(null, user._id);
    });

    // Deserialize the user

/*
The first argument of deserializeUser corresponds to the key of the user object that 
was given to the done function (see 1.). So your whole object is retrieved with help of that key. 
That key here is the user id (key can be any key of the user object i.e. name,email etc). 
In deserializeUser that key is matched with the in memory array / database or any data resource.

The fetched object is attached to the request object as req.user
    */
    passport.deserializeUser(function(id, done){
        User.findById(id,function(err, user){
            if(err){
                console.log("Error in deserialize the user", err);
                throw err;
            }
            done(null, user);
        })
    });

    local();
}