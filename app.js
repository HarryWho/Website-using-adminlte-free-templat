var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();

app.use(express.static('public'));

app.engine('.hbs', exphbs({defaultLayout: 'main',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.get('/', (req,res)=>{
    res.render('home');
});


app.set("PORT", process.env.PORT || 5001);
app.listen(app.get('PORT'),()=>{
    console.log("Listening on port: "+app.get("PORT"));
});

