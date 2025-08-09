const jwt =require("jsonwebtoken");

const authenticateToken=(req,res,next)=>{
    // const tokenHeader= req.header("authorisation");    // headers is not a function
    const {authorisation}= req.headers;
    const tokenHeader=authorisation;

    const token=tokenHeader && tokenHeader.split(" ")[1];
    
    if(token=== null){
        return res.status(400).json({message:"Authentication Token Required"});
    }

    jwt.verify(token,"SECRETKEY@123",(err,user)=>{
        if(err){
            return res.status(400).json({message:err.message});
        }
        req.user=user;
        next();
    })
}

module.exports= {authenticateToken}