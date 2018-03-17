//#region GLOBAL REQUIRES
var express=require('express');
var app = express.Router();

//#endregion

//#region GET REQUESTS
app.get('/', (req,res)=>{
    res.render('home',{title:'Home'});
});

//#endregion

//#region POST REQUESTS
app.post('/',(req,res,next)=>{

});

//#endregion

module.exports=app;