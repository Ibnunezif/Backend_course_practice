import express from 'express';

const app= express();
const port=3000;

app.get ('/', (req,res)=>{
    res.send ("Hello, world!");
});

app.get ('/about', (req,res)=>{
    res.send ("<h1>about</h1>");
});

app.get ('/contact', (req,res)=>{
    res.send ("<h1>Contact</h1>");
});

app.listen (port, () => {
    console.log(`listening on port ${port}`);
});