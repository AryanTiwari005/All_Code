import express from 'express';
import taskRoute from './Route/taskRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use('/',taskRoute);
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})