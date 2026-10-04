import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    age:{
         type:Number,
        required:true

    },
    course:{
         type:String,
        required:true

    }
})

const teacher  = mongoose.model("teacher",teacherSchema);
export default teacher;