const authorization=async=(req,res,next)=>{
    const {userId,role}= req.body;
    if(role=="Dealer"){
        next();
    }else{
        return res.status(401).json({msg:"You are not Authorized for this Action !"})
    }
}


module.exports={
    authorization
}