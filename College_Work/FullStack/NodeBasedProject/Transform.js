import fs from 'fs';
import zlib from 'zlib';
const readStream = fs.createReadStream('./test.txt');

const gzip = zlib.createGzip();

const writeStream = fs.createWriteStream('./data.txt.gz');
readStream.pipe(gzip).pipe(writeStream);