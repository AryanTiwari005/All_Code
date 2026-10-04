import express from 'express';
const app = express.Router();
import {v4 as uuid4} from 'uuid';
app.use(express.json());
let Teachers = [
    {
        id:uuid4(),
        name:"something",
        course:"TOC"
    },
    {
        id:uuid4(),
        name:"some",
        course:"FullStack"
    },

]


app.get('/', async (req, res) => {
    try {
        res.send(Teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/post', async (req, res) => {
    try {
        const { name, course } = req.body;
        // const {course} = req.body;
        const id = uuid4();
        Teachers.push({ id, name, course });
        res.send("inserted");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = Teachers.find(Teacher => Teacher.id === id);
        
        if (!result) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        Teachers = Teachers.filter((e) => e.id != id);
        res.send("deleted");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const Teacher = Teachers.find((e) => e.id == id);
        if (!Teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        let Newname = req.body.name;
        Teacher.name = Newname;
        res.send("updated");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default app;