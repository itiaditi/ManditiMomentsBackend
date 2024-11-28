
const access=(...roles)=>{
    return (req,res,next)=>{
      const userRole=req.role;
      console.log(userRole);
      const hasCommonRole =  roles.includes(userRole);
      if(hasCommonRole){
        
        next();
      }else{
        res.status(403).json({error:"Access forbidden"});
      }
    }
}


module.exports={access}