import student from '../model/studentModel.js';
export const Registration=(req,res)=>{
    const {userName,email,password}= req.body;
    if(!userName || !email || !password){
        res.status(400).json({
            message:"mandatory field required"
        })
    }
   const result = student.findOne({email});
   if(!result){
    res.status(400).json({
        message:"creditionals already exists"
    })
   }



}


export  const Login =(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(400).json({
            message:"mandatory field required"
        })
    }
   const result = student.findOne({email});
   if(!result){
    res.status(400).json({
        message:"creditionals already exists"
    })
   }
}