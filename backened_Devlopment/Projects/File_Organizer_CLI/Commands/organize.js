import { existsSync,readdir, readdirSync, statSync } from "fs";
import { extname, join } from "path";

export default function PrintOrganizr(directory){
    console.log("command executed");
    console.log("target directory",directory);
    const exist = existsSync(directory);
    if(!exist){
        console.log("Directory does not exist");
        return;
    }
    
    console.log("Directory is valid");
    const items = readdirSync(directory);
    console.log(items);
    for (const item of items) {
    const itemPath = join(directory, item);
    const stats = statSync(itemPath);
    const ex = extname(item);


    if (stats.isFile()) {
        console.log(item, "-> File");
    } else if (stats.isDirectory()) {
        console.log(item, "-> Directory");
    }
    console.log(ex);
}
    
    
    
    
    
}