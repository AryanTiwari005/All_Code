import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import StudentRoutes from './route/studentroutes.js';
import TeacherRoutes from './route/TeacherRoutes.js';

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//     console.log("middleware 1");
//     console.log("Request Type:", req.method);
//     console.log("Request URL:", req.originalUrl);

//     next();
// });

app.use('/students', StudentRoutes);
app.use('/teachers', TeacherRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});