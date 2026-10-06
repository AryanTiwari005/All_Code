import jwt from 'jsonwebtoken';
const generateToken = (user)=>{
    return jwt.sign({
        role:user.role,
        email:user.email,
        id:user._id
    },
    process.env.SECRET_KEY,
    {
        expiresIn:'1h',
    }
    )
}
export default generateToken;