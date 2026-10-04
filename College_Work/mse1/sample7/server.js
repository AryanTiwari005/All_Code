const express = require('express');
const PORT = 3030;
const app = express();

app.use(express.json());

app.post('/api/compound-interest',(req,res)=>{
    const {principal,rate,time}= req.body;
    if(principal<=0 || rate<=0 || time<=0){
        return res.status(400).json({
            message:"Please provide valide input"
        })
    }
    const CI = (principal*(1+rate/100)**time)-principal;
})

app.listen(PORT,()=>{
console.log(`server is running on ${PORT}`);
})