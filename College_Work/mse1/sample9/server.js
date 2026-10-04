// code
const express = require('express');

const app = express();

const students = [
    { id: 1, name: "Aryan", present: 0, absent: 0 },
    { id: 2, name: "Rahul", present: 0, absent: 0 },
    { id: 3, name: "Priya", present: 0, absent: 0 }
];

app.get('/api/students',(req,res)=>{
   return res.status(200).json({
        students,
        message:"Students retrieved successfully"
    })
})

app.post('/api/attendance',(req,res)=>{
    const {studentId , status} = req.body;
    if(!studentId || !status){
        return res.status(400).json({
            message:"studentId and status are required"
        })
    }
    const student = students.find((e)=>e.id==studentId);
    if(!student){
        return res.status(404).json({
            message:"Student not found"
        })
    }
    if(status=="present"){
        student.present++;
    }
    if(status=="absent"){
        student.absent++;
    }
})

app.get('/api/attendance/:studentId',(req,res)=>{
    const id = req.params.studentId;
    const student = students.find((e)=>e.id==id);
    if(!student){
         return res.sendStatus(404);
    }
    return res.json({
        present:student.present,
        absent:student.absent
    })
})

app.get('/api/attendance',(req,res)=>{
    let totalPresent=0;
    let totalAbsent =0;
    students.forEach((e)=>{
        totalPresent+=e.present;
        totalAbsent+=e.absent;
    })
    res.status(200).json({
        present:totalAbsent,
       absent: totalPresent
    })
})

