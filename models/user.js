var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



var db = mongoose.connection;

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

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            newUser.password=hash;
            newUser.save(callback);
        });
    });
};
module.exports.comparePassword = function(pass1, hash, callback){
    bcrypt.compare(pass1, hash, function(err, isMatch) {
       if(err) throw err;
       callback(null,isMatch);
    });
};
module.exports.getUserByUsername= function(user, callback){
    var query ={ username : user };
    User.findOne(query, callback);
};
module.exports.getUserById= function(id, callback){
    User.findById(id, callback);
};