import express from "express";

const router = express.Router();

let tasks = [];
let taskid = 1;

router.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks);
});

router.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(404).json({
            message: "Title is missing"
        });
    }

    const task = {
        id: taskid++,
        title: title.trim()
    };

    tasks.push(task);

    res.status(200).json(task);
});

router.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const taskExists = tasks.some(task => task.id === id);

    if (!taskExists) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.status(200).json(tasks);
});

export default router;