var express=require('express');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
var app = express.Router();

app.get('/login',(req,res,next)=>{
    res.render('login',{title:'Login'});
});
app.get('/register', (req, res, next)=>{
    res.render('register',{title:'Register'});
});

app.post('/register',(req,res,next)=>{

});
module.exports = app;
