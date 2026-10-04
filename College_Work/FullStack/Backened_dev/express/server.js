import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
console.log(PORT);
const app = express();

app.get('/',(req,res)=>{
    res.send("hello");
})

app.get('/user',(req,res)=>{
    res.send("hii Aryan");
})
 app.get('/about',(req,res)=>{
    res.send("about");
 })

app.listen(PORT,()=>{
    console.log("hii");
    
})