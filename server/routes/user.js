const router= require("express").Router();
const User=require("../models/user");
const bcrypt= require("bcryptjs");

const jwt = require('jsonwebtoken');



router.post("/sign-in",async(req,res)=>{
    try{
    const {username,email, password}=req.body;
    const existingUser=await User.findOne({username});
    const existingEmail=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"username alreay registered"});
    }else if(username.length<4){
        return res.status(400).json({message:"Username should hava atleast 4 characters"});
    }

    if(existingEmail){
        return res.status(400).json({message:"Email alreay exist"});
    }

    const hashPass=await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        email,
        password:hashPass,
    });
    await newUser.save();
    return res.status(200).json({message:"SignIn Successfully"});
}catch(err){
    console.log("error occured from signup block"+err.message);
    res.status(400).json({message:"Internal Server Error"});
}
})

router.post("/log-in",async(req,res)=>{
    try{
        console.log("first")
        const {username,email, password}=req.body;
    const existingUser=await User.findOne({username});
    
    if(!existingUser){
        return res.status(400).json({message: "Invalid Credentials"});
    }
    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            
            //generating token
            const authClaim=[{name:username},{jti: jwt.sign({},"SECRETKEY@123")}];
            const token= jwt.sign({authClaim},"SECRETKEY@123",{expiresIn:"2d"});
            return res.status(200).json({id:existingUser._id,token: token});
        }else{
            return res.status(400).json({message:"Invalid Credentials"});
        }
    })

    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error from login block hello"});
    }
})

module.exports=router;