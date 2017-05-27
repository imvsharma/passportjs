var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    }
},{
    timestamps : true
});

userSchema.pre('save', function(next){
    var user = this;
    this.hasedPassword(user.password, function(err, hash){
        if(err){
            console.log("Error in pre save hook ", err);
            next(err)
        }
        user.password = hash;
        next();
    })
})

userSchema.methods.hasedPassword = function (password,cb){
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            console.log("err in bcrypt.genSalt",err);
            return cb(err);
        }
        bcrypt.hash(password,salt, function(err, hasedPassword){
            if(err){
                console.log("Error in bcrypt.hash", err);
                return cb(err);
                
            }
            return cb(null,hasedPassword);
        })
    })
};

userSchema.methods.comparePassword = function(password, hasedPassword, cb){
    bcrypt.compare(password, hasedPassword, function(err, isMatch){
        if(err){
            console.log("Error in comparing password ", err);
            return cb(err);
        }

        return cb(null, isMatch);

    });
};





var userModel = mongoose.model('User', userSchema);
module.exports = userModel;