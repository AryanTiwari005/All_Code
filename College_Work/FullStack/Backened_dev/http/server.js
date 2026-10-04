import fs from 'fs';
import { readFileSync, writeFileSync } from 'fs';
import http from 'http';
const readStream = readFileSync('../NodeBasedProject/test.txt');
const server=http.createServer((req,res)=>{
   switch(req.url){
    case '/':res.end("hello");
        console.log(req.headers);
        res.writeHead(200,{'content-type':''});
    case  '/about':
        const user={
            id:1,
            name:"aryan"
        }
       return res.end(JSON.stringify(user));
    case '/contactus':
        const time = Date.now();
        const date = new Date(time);

        fs.appendFileSync('../NodeBasedProject/test.txt', date.toString());

        return res.end("appended");

    default:
        console.log("hii");
        
   }
});
server.listen(4000,()=>{
    console.log("Server is Running");
});

