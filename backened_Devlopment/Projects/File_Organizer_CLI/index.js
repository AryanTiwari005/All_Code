import  PrintOrganizr  from "./Commands/organize.js";
import { existsSync } from "fs";
const command = process.argv[2];
const directory = process.argv[3];
console.log(command);


function handleCommand(command){
   switch (command) {
    case "organize":
        
    PrintOrganizr(directory);
        break;
        
   case "tree":
    console.log("show tree");
    break;
    case "help":
        console.log(("show help"));
        break;
        
    default:
        console.log("unknown Command")
        break;
   }
}

handleCommand(command);