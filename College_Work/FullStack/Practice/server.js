import express from 'express';
const app = express();
const PORT = 2005;


app.get('/square/area',(req,res)=>{
    const width =parseInt(req.query.width);
    const area = width*width;
    return res.json({"area of square":area});
})


app.get('/rectangle/area',(req,res)=>{
    const len =parseInt(req.query.length);
    const breadth = parseInt(req.query.breadth);
    const area = len*breadth;
    return res.json({"area of rectangle":area});
})


app.get('/square/perimeter',(req,res)=>{
    const perimeter =parseInt(req.query.s);
    
    const per= 4*(perimeter);
    return res.json({"perimeter of square":per});
})


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});

