var express=require('express');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AdminLTEDB');
var db = mongoose.connection;
var app = express.Router();
var session = require("express-session");
var User = require('../models/user');

app.get('/login',(req,res,next)=>{
    res.render('login',{title:'Login'});
});
app.get('/register', (req, res, next)=>{
    res.render('register',{title:'Register'});
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
            res.render('home',{title:user});
        });
    }
});
module.exports = app;
