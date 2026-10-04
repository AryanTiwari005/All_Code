const linearSearch =(arr,x)=>{
    for(let i=0;i<arr.length;i++){
        if(arr[i]==x) return i;
    }
    return null;
}

const add = (a,b)=>{
    if(a!=0 && b!=0) return a+b;
} 

module.exports ={
    linearSearch,
    add
}