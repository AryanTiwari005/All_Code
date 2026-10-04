import http from 'http';
const server = http.createServer((req,res)=>{
    if(req.url==='/users' && req.method==='POST')
    {
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            console.log("Raw data",body);
            const user = JSON.parse(body);
            console.log('user:',user);
            res.writeHead(200,{'content-type':'application/json'})
            res.end(JSON.stringify(user));
        })
       
    }
    else{
        res.end("error found");
    }
    
})

server.listen(3000,()=>{console.log("server is running");
})
