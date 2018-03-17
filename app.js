var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var app = express();
var flash = require('flash');
var index=require('./routes/index');
var users = require('./routes/users')



var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        username: function () { return session.username; },
        online: function(){ return session.online;},
        skin: function(){ return session.skin; }
    },
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,  'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use(passport.initialize());
app.use(passport.session());
// connect flash 
app.use(flash());

// global messages
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(expressValidator());
app.use('/',index,);
app.use('/users',users);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.render('404');
  });

app.set("PORT", process.env.PORT || 5001);
app.listen(app.get('PORT'),()=>{
    session.username='Guest';
    session.online='Offline';
    session.skin='skin-green';
    session.loggedin=false;
    console.log("Listening on port: "+app.get("PORT"));
});

