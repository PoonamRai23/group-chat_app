 const jwt=require('jsonwebtoken')
 const User=require('../models/user')
 
 
 const authenticate=(req,res,next)=>{
     try{
         const token=req.header('Authorization')
         console.log("auth token>>>>",token)
         const user=jwt.verify(token,'poonam@233')
         console.log("token user>>>",user)
         console.log('userID>>>>>>>',user.userID)
         User.findByPk(user.userId).then(user=>{
             console.log('user>>>>',user)
             console.log(JSON.stringify(user))
             req.user=user;
             next();
         })
         .catch(err=>{throw new Error(err)})
 
     }
     catch(err){
         console.log("error"+err)
         return res.status(401).json({success:"fail"})
     }
 }
 module.exports={
     authenticate:authenticate
 }