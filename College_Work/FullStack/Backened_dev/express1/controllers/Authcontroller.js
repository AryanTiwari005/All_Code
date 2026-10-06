
import generateToken from '../util/jwt.js';
import User from '../model/studentModel.js';

const register = async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(403).json({message:"name , email and password required"});
        return;
    }

    if(await User.findOne({email})){
        res.status(403).json({message:"user already exist"});
        return;
    }
    const hashedPassword = await bcrypt.hash(password,10); 
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    });
    const token = generateToken(user);
    res.status(200).json({user,token:token});
    return;
}   

const login = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(403).json({message:"email and password required"});
        return;
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(403).json({message:"invalid email or password"});
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(403).json({message:"invalid email or password"});
        return;
    }
    const token = generateToken(user);
    res.status(200).json({user,token:token});
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
    });
}

export default { register, login };