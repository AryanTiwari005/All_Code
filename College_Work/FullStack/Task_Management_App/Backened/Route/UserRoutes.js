
import express from 'express';
import {registerUser,loginUser,refresh,logoutUser,getMe} from '../controllers/User.controller.js'; 
const router = express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post("/refresh", refresh);
router.post('/logout', logoutUser);
router.get('/me', getMe);
export default router;