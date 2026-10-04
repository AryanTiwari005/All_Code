import express, { json } from 'express';
import teacher from '../model/teacherModel.js';
import student from '../model/studentModel.js'; 
import checkRoles from '../middleware/roleMiddleware.js';
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
let students = [
    {   
        id:uuidv4(),
        name:"Aryan",
        course:"btech"
    },
    {
        id:uuidv4(),
        name:"Lipsha",
        course:"mbbs"
    }
]-

//

router.get('/local',checkRoles("teacher", "students", "admin"),(req,res)=>{
    res.send(students);
})

//--------mongodb----------




// To get all student data from MongoDB
router.get('/', checkRoles("teacher", "students", "admin"), async (req, res) => {
    try {
        const result = await student.find();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search student by course from MongoDB
router.get('/search', async (req, res) => {
    try {
        const course = req.query.course;
        const result = await student.find({ course: course });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new student into MongoDB
router.post('/post', checkRoles("admin", "teacher"), async (req, res) => {
    try {
        const { name, user, age, course } = req.body;
        const newStudent = await student.create({
            name: name || user,
            age: age || 20,
            course
        });
        res.redirect('/students');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Replace a specific value with the new value (PATCH)
router.patch('/:id', checkRoles("admin", "teacher"), async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await student.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Updated", student: updatedStudent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Replace / update student (PUT)
router.put('/:id', checkRoles("admin", "teacher"), async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await student.findByIdAndUpdate(
            id,
            req.body,
            { new: true, overwrite: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "cannot update" });
        }
        res.json({ message: "updated", student: updatedStudent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// To get a student by ID from MongoDB
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await student.findById(id);

        if (!result) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// To delete a student by ID from MongoDB
router.delete('/:id', checkRoles("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await student.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.json({ message: "Student deleted successfully", student: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;