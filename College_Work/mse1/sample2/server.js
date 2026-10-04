const express = require('express');
const PORT = 2020;
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: "Node.js",
    ratingCount: 0,
    averageRating: 0
  },
  {
    id: 2,
    name: "MongoDB",
    ratingCount: 0,
    averageRating: 0
  },
  {
    id: 3,
    name: "React",
    ratingCount: 0,
    averageRating: 0
  }
]; 


app.get('/api/products',(req,res)=>{
return res.status(200).json({
    message:"Courses retrieved successfully",
    courses
})
})


app.post('/api/rate',(req,res)=>{
    const {courseId,rating} = req.body;
    if(!courseId || !rating){
        return res.status(400).json({
           message: "productId and rating are required"
        })
    }
    let course  = courses.find((e)=>e.id==courseId);
    if(!course){
         return res.status(404).json({
           message: "Product not found"
        })
    }
    if((rating<1 || rating>5)){
         return res.status(400).json({
           message: "Rating must be between 1 and 5"
        })
    }

    course.ratingCount++;
});


app.get('/api/ratings',(req,res)=>{
    
    const ratings = courses.map((course) => ({
    name: course.name,
    ratingCount: course.ratingCount,
    averageRating: course.averageRating
    } ));
    return res.status(200).json({
        message:"Product ratings retrieved successfully",
        ratings
    })

})

app.listen(PORT,()=>{
console.log(`server is running on ${PORT}`)
})