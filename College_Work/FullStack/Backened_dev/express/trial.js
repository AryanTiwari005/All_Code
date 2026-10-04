import express from 'express';
const app = express();
const port = 3000;
app.use((req,res,next)=>{
    console.log("middleware executed");
  next();
})
app.use((req,res,next)=>{
    console.log("middleware1 executed");
   // next();
})

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})