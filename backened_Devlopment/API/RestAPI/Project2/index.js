import express from "express";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import methodOverride from "method-override"; 
import { fileURLToPath } from "url";
const PORT  = 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
let posts = [
    
    {
        id:uuidv4(),
        username:"Aryan",
        say:"hii"

    },
    {
        id:uuidv4(),
        username:"Arpit",
        say:"hello"

    },
    {
        id:uuidv4(),
        username:"Ashish",
        say:"bye"

    }

]


app.get('/posts',(req,res)=>{
 res.render("index",{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render("new");
})

app.post('/posts',(req,res)=>{
    let {username, say}=req.body;
    const id = uuidv4();
    posts.push({username,say,id });
    res.redirect('/posts');    
})

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render('show',{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id } = req.params;
    let newContent = req.body.say;
    let post = posts.find((p)=>id===p.id);
    post.say = newContent;
    res.redirect("/posts")

})


 
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit",{post})
})


app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id!==id);
    res.redirect("/posts");
})


app.listen(PORT,()=>{
    console.log("it is listening on");
})