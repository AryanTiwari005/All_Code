import Task from '../model/taskSchema.js';
import mongoose from 'mongoose';
import asynchandler from '../utils/asynchandler.js';


export const getTask = asynchandler(async (req, res) => {
    const tasks = await Task.find({userId: req.user.id});
    return  res.status(201).json(tasks);
})

export const addTask = asynchandler(async (req, res) => {
        const {title} = req.body;
        
       const exisitingTask = await Task.findOne({title,userId:req.user.id});
            if(exisitingTask){
            return res.status(400).json({
                message:"already added"
            })
            }
         const createTask = await Task.create({
            title:title,  
            userId:req.user.id
            })
      //  const token = generateToken(createTask);
       return res.status(201).json({createTask});
   
})
export const deleteTask = asynchandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: 'Invalid task id' });

  const deleted = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Task not found' });
  return res.status(200).json({ message: 'Task deleted' });
});


