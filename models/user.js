//#region GLOBAL REQUIRES

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//#endregion

//#region DATABASE SCHEMA SETUP

var UserSchema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    hasValidated:{
        type:Boolean
    },
    permission:{
        type:Number
    }
});

//#endregion

//#region EXPORT VARIABLE

// MAKE VISIBLE TO ANY MUDULE THAT MAKES A REQUIRE REQUEST
var User = module.exports = mongoose.model('User', UserSchema);

//#endregion


//#region DATABASE FUNCTION CALLS

//#region CREATE USER
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            newUser.password=hash;
            newUser.save(callback);
        });
    });
};

//#endregion

//#region COMPARE PASSWORD
module.exports.comparePassword = function(pass1, hash, callback){
    bcrypt.compare(pass1, hash, function(err, isMatch) {
       if(err) throw err;
       callback(null,isMatch);
    });
};

//#endregion

//#region GET USER BY NAME
module.exports.getUserByUsername = function(user, callback){
    var query ={ username : user };
    User.findOne(query, callback);
};

//#endregion

//#region GET USER BY ID
module.exports.getUserById= function(id, callback){
    User.findById(id, callback);
};


//#endregion

//#endregion

