
import {getTask,addTask,deleteTask} from '../controllers/task.controllers.js';
import express from 'express';
import protect from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/',getTask);
router.post('/',addTask);
router.delete('/:id',deleteTask);


export default router;