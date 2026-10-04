const buffer = Buffer.from("hello");
console.log(buffer.toString());
console.log(buffer.length);
console.log(String.fromCharCode(buffer[1]));
// buffer creation by alloc
const buffer2 = Buffer.alloc(10);
buffer2.fill("hello");
console.log(buffer2.toString());
