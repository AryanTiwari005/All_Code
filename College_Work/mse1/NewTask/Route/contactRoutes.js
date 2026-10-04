import express from 'express';
const Router  = express.Router();

let contacts = [
    {
        id:1,
        name:"Aryan",
        phone:857903903131,
        email:"aryan@example.com"
    },
    {
        id:2,
        name:"Arpit",
        phone:857903131,
        email:"arpit@example.com"
    }

]


Router.post('/contacts/post',(req,res)=>{
    const {id,name,phone,email} = req.body;
    contacts.push({id,name,phone,email});
    res.send("inserted");
})

Router.put('/put/:id',(req,res)=>{
    const id = req.params.id;
    const {name,phone , email} =req.body;
    const contact = contacts.find((e)=>e.id==id);
    if(!contact){
        res.json({
            message:"hii"
        })
    }
    contact.name=name;
    contact.phone= 38431413413;
    contact.email= email;
    res.send("contact updated");
   
})

Router.delete('/contacts/delete/:id',(req,res)=>{
    const id = req.params.id;
    const result = contacts.find((e)=>e.id==id);
    if(!result){
        res.json({
            message:"Id didnt found"
        })
    }
    contacts = contacts.filter((e)=>e.id!=id);
    res.json({
        contacts,
        message:"deleted"
    });
})

Router.get('/contacts',(req,res)=>{
    res.send(contacts);
})


export default Router;
