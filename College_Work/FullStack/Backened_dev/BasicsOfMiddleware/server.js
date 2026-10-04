import express from 'express';

const app = express();
const PORT = 2005;
app.use('/student',(req,res,next)=>{
    console.log("middleware1");
    console.log("Request Type",req.method);
    console.log("Request URL",req.originalUrl);    
    
   next();
})
app.use((req,res,next)=>{
    console.log("middleware 2");
    next();
})


app.get('/student/:id',(req,res,next)=>{
   if(req.params.id==0) next('route')
    //next('route') we are sending to the next route not to next middleware
    else next()

    
},
(req,res)=>{
    res.end('regular route')
}
)

app.get('/student/:id',(req,res)=>{
    res.end('special route');
})

// error handling middleware
app.use((err,res,req,next)=>{
    console.log("hii");
    res.status(404).send("error");
    
})

app.listen(PORT,()=>{
    console.log("hii");
    
})