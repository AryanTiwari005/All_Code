const express = require('express');
const PORT = 3030;
const app = express();

app.use(express.json());
 

app.post('/api/shorten',(req,res)=>{
    const {username,originalUrl}=req.body;
    if(!username || !originalUrl){
        return res.status(400).json({
            message:"username and originalUrl are required"
        })
    }
    const code = Math.random().toString(36).substring(2,8);
    return res.status(201).json({
        code
    })

})

app.get('/api/url/:code',(req,res)=>{
    const id = req.params.code;
    const or = something.find((e)=>e.id==id);
    if(!or){
        return res.status(404).json({
            message:"URL not found"
        })
    }
      res.status(200).json({
        originalUrl: link.originalUrl,
        username: link.username
    });
})

app.get('/api/users/:username/urls',(req,res)=>{
    const username  = req.params.username;
    const fin = link.filter((e)=>e.username==username);
    return res.status(200).json({
        fin
    })
})

app.listen(PORT,()=>{
console.log(`server is running on ${port}`);
})