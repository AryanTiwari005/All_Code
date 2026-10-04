const express = require('express');
const PORT  = 1010;

const app = express();

app.use(express.json());

const polls = [
  {
    id: 1,
    question: "What is your favorite programming language?",
    options: [
      {
        id: 1,
        text: "Java",
        responses: 5
      },
      {
        id: 2,
        text: "JavaScript",
        responses: 8
      },
      {
        id: 3,
        text: "Python",
        responses: 12
      },
      {
        id: 4,
        text: "C++",
        responses: 3
      }
    ]
  },

  {
    id: 2,
    question: "Which database do you prefer?",
    options: [
      {
        id: 1,
        text: "MySQL",
        responses: 10
      },
      {
        id: 2,
        text: "MongoDB",
        responses: 7
      },
      {
        id: 3,
        text: "PostgreSQL",
        responses: 4
      }
    ]
  },

  {
    id: 3,
    question: "What do you prefer for backend development?",
    options: [
      {
        id: 1,
        text: "Node.js",
        responses: 15
      },
      {
        id: 2,
        text: "Java Spring Boot",
        responses: 9
      },
      {
        id: 3,
        text: "Django",
        responses: 6
      }
    ]
  }
];  


app.get('/api/polls',(req,res)=>{
    res.status(200).json({
        message:"Polls retrieved successfully",
        polls
    })

})
app.get('/api/polls/:id',(req,res)=>{
    const id = req.params.id;
    let poll = polls.find((e)=>e.id==id);
    if(!poll){
        return res.status(404).json({
            message:"Poll not found"
        })
    }
    res.send(poll);
})

app.post('/api/vote',(req,res)=>{
    const {pollId , optionId} = req.body;
    if (!pollId || !optionId) {
    return res.status(400).json({
        message: "pollId and optionId are required"
    });
    }
    let poll = polls.find((e)=>e.id==pollId);
    if(!poll){
        return res.status(404).json({
            message:"Poll not found"
        })
    }
    const option = poll.options.find((e)=>e.id==optionId);
    if(!option){
         return res.status(400).json({
            message:"Invalid option"
        })
        
    }
    
    option.responses+=1;
})

app.get('/api/polls/:id/results',(req,res)=>{
 const id = req.params.id;
    let poll = polls.find((e)=>e.id==id);
    const results = poll.options.map((e)=>({
        optionId:e.id,
        option:e.text,
        responses:e.responses
    }));
    const totalRes = poll.options.reduce(
        (total,e)=>total+e.responses,0
    );
    return res.status(200).json({
        pollId:poll.id,
        results:results,
        totalRes:totalRes
    });

})

app.listen(PORT,()=>{
   console.log(`Server is running on the port ${PORT}`);
})