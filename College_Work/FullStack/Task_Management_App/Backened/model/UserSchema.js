import mongoose from "mongoose";

const UserSchema  = new  mongoose.Schema({
    username:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        unique:true,
        required:true,
        type:String,
        trim:true
    },
    password:{
        required:true,
        type:String,
        trim:true,
        select:false
    },
    refreshToken:{
        type:String,
        select:false    
    }


},{timestamps:true})

const user = mongoose.model('user',UserSchema);

export default user;