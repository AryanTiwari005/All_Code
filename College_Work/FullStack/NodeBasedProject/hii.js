// import  {a} from './hello.js';
const fs = require("fs");
const FilePath ='./test.txt';
const Content = "hello";

// console.log(cal.add(5,3));
// console.log(cal.sub(5,3));
// console.log(cal.mul(5,3));
// console.log(cal.div(5,0));
// console.log(a);

// fs.writeFile(FilePath,Content,(err)=>{
//     if(err)
//     {
//         throw err;
//     }else{
//         console.log("print succssfully");
//     }
// });

// fs.readFile(FilePath, "utf-8", (err, data) => {
//     if (err) {
//         throw err;
//     }

//     console.log(data);
// });
const content2 = "  hii!!!!!!!!!";

// fs.appendFile(FilePath,content2,(err)=>{
//     if(err) throw err;
    
// });

fs.readFile(FilePath, "utf-8", (err, data) => {
    if (err) {
        throw err;
    }

    console.log(data);
});

console.log("bye");