import express from "express";
const app=express();
const port=3000;

app.get ("/",(req,res)=>{
    res.send ("<h1>home page</h1>");
});

app.get ("/about",(req,res)=>{
    res.send ("<h1>About me</h1>");
}); 

app.listen(port,()=>{
    console.log(`The surver is runnin on port ${port}.`);
});