const express = require('express');
const PORT = 3030;
const app = express();

app.use(express.json());
const events = [
    {
        id: 1,
        name: "Node.js Workshop",
        registrationCount: 0
    },
    {
        id: 2,
        name: "MongoDB Workshop",
        registrationCount: 0
    },
    {
        id: 3,
        name: "React Workshop",
        registrationCount: 0
    }
];

app.get('/api/events',(req,res)=>{
    return res.status(200).json({
        message:"Events retrieved successully",
        events
    })
})

app.post('/api/register',(req,res)=>{
    const {eventId} = req.body;
    if(!eventId){
        return res.status(400).json({
            message:"eventId is required"
        })
    }
   // const id = req.params.id;
    const event = events.find((e)=>e.id==eventId);
    if(!event){
        return res.status(404).json({
            message:"Event not found"
        })
    }
    event.registrationCount++;
    return res.status(200).json({
        message:"Registration successful"
    })

})

app.get('/api/events/:id',(req,res)=>{
const id = req.params.id;
    const event  = events.find((e)=>e.id==id);
    if(!event){
        return res.status(404).json({
            message:"Event not found"
        })
    }
    return res.json({
        event
        
    });
})

app.post('/api/cancel',(req,res)=>{
    const {eventId}=req.body;
    const event = events.find((e)=>e.id==eventId);
    if(!event){
        return res.status(404).json({
            message:"Event not found"
        })
    }
    if(event.registrationCount>0){
        event.registrationCount--;
    }
})



app.use((err,req,res,next)=>{
    return res.status(400).json({
        message:"Invalid json"
    });
});








app.listen(PORT,()=>{
console.log(`server is running on ${port}`);
})