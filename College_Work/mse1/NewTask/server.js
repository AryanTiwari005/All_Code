import express from 'express';
import contactRoutes from './Route/contactRoutes.js';
const app = express();
const PORT = 7070;
app.use(express.json());
app.use('/contact',contactRoutes);


app.listen(PORT,()=>{
console.log(`server is running on the ${PORT}`);
})