import dotenv from 'dotenv';
import express from 'express';
import taskRoute from './Route/taskRoute.js';
import userRoute from './Route/UserRoutes.js';
import connectDB from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorhandler from './middleware/errorhandler.js';
const app = express();

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/tasks',taskRoute);
app.use('/api/users',userRoute);
app.use(errorhandler);
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})


// Task:- pagination, how to find previous and next page number. 