

var express=require('express');
var session = require('express-session');

var app = express.Router();

var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//#region GET REQUESTS
app.get('/login',(req,res,next)=>{
    res.render('login',{title:'Login'});
});
app.get('/register', (req, res, next)=>{
    res.render('register',{title:'Register'});
});
app.get('/logout', (req,res,next)=>{
    
    
    req.logout();

    
    session.username = 'Guest';
    session.permission=0;
    session.online="Offline";
    res.redirect('/');
    

});
//#endregion

//#region PASSPORT FUNCTIONS
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
        if(err) throw err;
        if(!user){
            
            return done(null,false,{message: 'Unknown username'});
            
        }
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(!isMatch){
                
                return done(null,false,{message: "Incorrect Pasword"});
                
            }else{
                session.username = user.username;
                session.permission=user.permission;
                session.online='Online'
               
                return done(null,user);
                
                
                
            }
        });
    });
  }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
//#endregion

//#region POST REQUESTS
app.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/');
    
  });

app.post('/register',(req,res,next)=>{
    
    req.check('username').isLength({min:1}).withMessage("User name is a required fielfd");
    req.check('email').isLength({min:1}).withMessage("You must supply a valid email");
    req.check('email').isEmail().withMessage("The email address is not valid");
    req.check('password').isLength({min:6}).withMessage("The password must be a minimum of 6 characters");
    req.check('password2').equals(req.body.password).withMessage("The passwords do not match");
    var errors = req.validationErrors();
    if(errors){
        res.render('register',{title:"Register",errors:errors});
    }else{
        var user=new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            hasValidated : false,
            permission : 1
        });
        // db.connect();
        User.createUser(user,(err,user)=>{
            if(err) throw err;
            console.log(user);
            res.render('home',{title:"Home"});
        });
    }
});

//#endregion


module.exports = app;
