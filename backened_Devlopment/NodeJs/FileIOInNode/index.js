import {readFile,writeFile} from 'fs/promises';
// fs is a built-in module in Node.js that provides an API for interacting with the file system. The 'fs/promises' module is a promise-based version of the 'fs' module, which allows you to work with files using async/await syntax.
// fs/promises provides a set of functions that return promises, making it easier to work with asynchronous file operations in a more readable and manageable way. This module is particularly useful when you want to perform file I/O operations without blocking the event loop, allowing your application to remain responsive while waiting for file operations to complete.
// fs.promises is es6 module, so you can use the import statement to import it in your code. However, if you are using CommonJS modules (the default module system in Node.js), you can use the require function to import it instead.
// const {readFile} = require('fs/promises');
console.log(import.meta.url);
// async function readGivenFile(pathFile){
//     const data = await readFile(pathFile);
//     console.log(data.toString());
// }
const pathFile =  new URL('./index.html',import.meta.url);
// console.log(pathFile)
// readGivenFile(pathFile);
const data = await readFile(pathFile);
console.log(data.toString());
let temp = data.toString();
let obj = {
    name:"Aryan",
    message:"HEllo"
}
for(const [key,value] of Object.entries(obj)){
    temp = temp.replace(`{{${key}}}`,value)   //name-> Aryan
}

await writeFile(new URL('./output.html',import.meta.url),temp);