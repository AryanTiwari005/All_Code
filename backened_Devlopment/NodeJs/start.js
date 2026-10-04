Promise.resolve().then(()=>console.log("hii")
)
process.nextTick(()=>{console.log("hello")});
setTimeout(()=>{
    console.log("hell");
},2000);