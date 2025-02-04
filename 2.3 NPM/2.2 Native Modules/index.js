const fs=require("fs");
fs.readFile("message.txt","utf8",function (error,message){
    console.log(message);
});
