//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path'
import { fileURLToPath } from 'url';
const __dirname=dirname (fileURLToPath(import.meta.url));
const password="ILoveProgramming";

const port=3000;
const app=express();
app.use (bodyParser.urlencoded({extended:true}));

app.get ('/',(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
});

app.post ('/check',(req,res)=>{
    const writtenPassword=req.body.password;
    if (writtenPassword===password){
        res.sendFile(__dirname +"/public/secret.html");
    }
})

app.listen(port ,(req,res)=>{
    console.log (`listening on port ${port}`)
})
