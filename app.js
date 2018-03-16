var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var path = require('path');
var app = express();

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
app.use('/',index,);
app.use('/users',users);
app.use(express.static(path.join(__dirname,  'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.render('404');
  });

app.set("PORT", process.env.PORT || 5001);
app.listen(app.get('PORT'),()=>{
    session.username='Guest';
    session.online='Offline';
    session.skin='skin-green'
    console.log("Listening on port: "+app.get("PORT"));
});

