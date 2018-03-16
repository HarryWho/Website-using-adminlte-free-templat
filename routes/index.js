var express=require('express');
var app = express.Router();

app.get('/', (req,res)=>{
    res.render('home',{title:'Home'});
});
app.post('/',(req,res,next)=>{

});

module.exports=app;