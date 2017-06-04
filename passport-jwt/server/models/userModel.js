var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim : true
    }, 
    password : {
        type : String,
        trim : true
    }
});


userSchema.pre('save', function(next){
    var user = this;
    this.hasedPassword(user.password, function(err, hash){
        if(err){
            console.log("Error in pre save hook ", err);
            next(err)
        }

        user.password = hash;
        console.log("user at the end of pre save hook",user);
    });
})

userSchema.methods.hasedPassword = function(password, callback){
    bcrypt.genSalt(11,function(err, salt){
        if(err){
            console.log("err in bcrypt.genSalt()", err)
                return callback(err);
            }
            console.log("salt",salt);
            bcrypt.hash(password, salt, function(err, hashedPassword){
                if(err){
                    console.log("err in bcrypt.hash()", err)
                return callback(err);
            }
            console.log("hashedPassword",hashedPassword)
            return callback(null,hashedPassword);
            });
    });
};

userSchema.methods.comparePassword = function(password,hasedPassword, callback){
    bcrypt.compare(password, hasedPassword, function(err, isMatch){
        if(err){
            console.log("err in bcrypt.hash()", err)
            return callback(err);
        }
        return callback(null, isMatch)
    })
}

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;

