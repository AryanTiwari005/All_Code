import jwt from 'jsonwebtoken';
const authMiddleware = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
    if(!token){
        res.status(401).json({message:"unauthorized"});
        return;
    }
    const decoded =  jwt.verify(token,process.env.SECRET_KEY);
    req.user = decoded;
    next();
    }
    catch(err){
        return res.status(500).json(
            {
                message:"no"
            }
        )
    }

}

export default authMiddleware;