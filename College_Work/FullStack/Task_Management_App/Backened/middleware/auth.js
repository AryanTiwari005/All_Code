import jwt from 'jsonwebtoken';

const protect=(req,res,next)=>{
    const token = req.cookies?.accessToken;
    if(!token) return res.status(401).json({
        message:"Unauthorized"
    })
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = {id:decoded.id};
        next();
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}
export default protect;