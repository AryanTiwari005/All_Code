const express = require('express');
const PORT = 3030;
const app = express();

app.use(express.json());

app.get('/api/tasks',(req,res)=>{
    return res.status(200).json({
        tasks
    })
})

app.post('/api/tasks', (req, res) => {
    const { title, status } = req.body;

    if (!title || !['pending', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({
            message: "Please provide valid task details"
        });
    }

    const task = {
        id: tasks.length + 1,
        title,
        status
    };

    tasks.push(task);

    res.status(201).json(task);
});

app.delete('/api/tasks/:id',(req,res)=>{
    const id  = req.params.id;
    const task = tasks.find((e)=>e.id==id);
    if(!task){
        return res.sendStatus(404)
    }
    tasks = tasks.filter((e)=>e.id!=id);
   return res.sendStatus(200);
})

app.get('/api/tasks/status/:status',(req,res)=>{
const {status} = req.params;
const result = tasks.filter((e)=>e.status==status);
return res.send(result);
})



app.listen(PORT,()=>{
console.log(`server is running on ${PORT}`);
})