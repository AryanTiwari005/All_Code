// without export default we can simply export the function and import it in another file
export function add(x,y){
    return x+y;
}

export function sub(x,y){
    return x-y;
}
// merge function into an object and export it as default
export default
{
    add,
    sub
}