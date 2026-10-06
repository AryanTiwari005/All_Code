import express from 'express';

const router = express.Router();

import {register,login} from '../controllers/Authcontroller.js';


router.post('/registerUser',register);
router.post('/loginUser',login);

export default router;