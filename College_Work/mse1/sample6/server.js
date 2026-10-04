const express = require('express');
const PORT = 3030;
const app = express();

app.use(express.json());


app.post('/api/simple-interest',(req,res)=>{
    const {principal,rate,time}=req.body;
    if(principal<=0 || typeof principal!="number" ||
    rate<=0 || typeof rate!="number" ||
    time<=0 || typeof time!="number"){
        return res.status(400).json({
            message:"Please provide valid input"
        })
    }
    const interest = (principal*rate*time)/100;
    res.status(200).send(interest);
})



app.listen(PORT,()=>{
console.log(`server is running on ${PORT}`);
})