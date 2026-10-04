const express = require('express')
const {connectDB} = require('./db.js');
const { Product } = require('./model/product.model.js');
require('dotenv').config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get('/',async (req,res)=>{
   try{
   const products = await Product.find();
   res.status(200).json(products);  
   }
   catch(err){
    res.status(404).json({message:err.message});
   }
})

app.post('/api/products',async (req,res)=>{
    try {
        const Product = await Product.create(req.body);
        res.status(200).json(Product);
    } catch(err){
        res.status(404).json({message:err.message});
        
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
})

