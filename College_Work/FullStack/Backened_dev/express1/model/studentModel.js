import mongoose from "mongoose";

const studentsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const student = mongoose.model("student", studentsSchema);
export default student;