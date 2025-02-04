import express from 'express';
const port=3000;
const app=express();

var dayType;
var activity;

function day () {
    const d=new Date();
    if (d.getDay()===6 || d.getDay()===0){
        dayType="weekend";
        activity="have fun";
    }
    else {
        dayType="weekday";
        activity="work hard";
    }
}

app.get ('/',(req,res)=>{
    day();
    res.render("index.ejs",
    {dayType:dayType,activity:activity});

})

app.listen(port,(req,res)=>{
    console.log ("running on http://localhost:3000");
})