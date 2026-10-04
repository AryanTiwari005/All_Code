import fs from 'fs';
const readStream = fs.createReadStream('./sample.txt');
const writeStream = fs.createWriteStream('./output.txt');


// readStream.on('data',(chunk)=>{
//     writeStream.write(chunk);
    
// })
// readStream.on('end',()=>{
//     console.log("End of file");
//     writeStream.close();
// });
readStream.pipe(writeStream);
writeStream.on('finish',()=>{
    console.log("End of stream");
    
})

