import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }


},{timestamps:true})

const task = mongoose.model('task', taskSchema);
export default task;