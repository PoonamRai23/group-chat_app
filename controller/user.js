const express = require("express");
const user=require('../models/user')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const database=require('../util/chatAPP');


exports.createSignupController=async(req,res)=>{
    try{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const number=req.body.number

    // console.log( "this is req data>>>>>>>>>>>>>>>>>>>>",name, email,password)
       

    if(name===undefined||name.length===0 ||password===undefined||password.length=== 0||email===undefined||email.length===0||number===undefined||number.length===0){
        return res.status(400).json({err:'bad parameters something is missing'})
    }

    let saltrounds=10
    bcrypt.hash(password,saltrounds, async(err,hash)=>{

    // console.log("this is server end response",name,email,password)
    const data=await user.create({
        name:name,
        email:email,
        number:number,
        password:hash
    })
   return res.status(200).json({addData:data,message:"post data"})
})  
}
catch(error){
    console.log("failed",error)
    return res.status(500).json({error:"failed to post data"})
}

}

//function for authentication

function genrateAccesstoken(id,name)
{
    return jwt.sign({userId:id,name:name},"poonam@233")
}



//login
exports.createloginController=async(req,res)=>{
    try{
      const{email,password}=req.body

      console.log('email>..>>>>>>>',email,password)

      if(email.length===undefined||email.length===0||password===undefined||password.length===0){
        return res.status(400).json({message:'emailID or pswd is missing'})
      }
      const User=await user.findAll({where:{email}})
      console.log('user>>>>>>>>>>>>>>>>>>>>>>>>',User)
      if(User.length>0){
        bcrypt.compare(password,User[0].password,(err,result)=>{
            if(err){
                console.log('bcrypt error')
            }
            const loginId=User[0].id
        console.log('loginid>>>>>',loginId)
        console.log('user[0],,,,,,',user)

        if(result===true){
          user.update({status:"online"},{where:{id:loginId}})
          console.log('user[0],,,,,,',user)


        
            return res.status(200).json({message:'user logged in successfully',token:genrateAccesstoken(User[0].id,User[0].name)})
        }
        else{
            return res.status(400).json({message:'password is not correct'})
        }
    })
      }
      else{
        return res.status(400).json({message:'user doesnot exist'})
      }
    }
    catch(error){
        console.log('errrrrr',error
        )

    }
}
// createloginController is an asynchronous function for user login. It expects the user's email and password in the request body. It retrieves the user's information from the database, compares the hashed password with the provided password using bcrypt, and if they match, it generates and returns a JWT for user authentication
exports.updateUsers = async (req, res) => {
  try {
    const userId= req.params.id;
     console.log("userid>>>>",userId)
    const updateUser=await user.update({status:"offline"},{where:{id:userId}})
    // console.log("updateUser>>>>",updateUser)
    
    // const User=await user.findAll()
    if(updateUser[0]===0){
      return res.status(400).json({ message: "unable to update users" });
    }
    return res.status(200).json({message:"user updated successfully"})
    

}
catch(err){
  console.log("err",err)
  return res.status(400).json({ message: "unable to get all users" });

}
}
exports.getLoginUsers = async (req, res) => {
    try {
      
      const allUsers = await user.findAll()

      return res
        .status(200)
        .json({ allUsers: allUsers, message: "here are all users" });
    } catch (error) {
      console.log("cant get all users");
      return res.status(400).json({ message: "unable to get all users" });
    }
  };
  // getLoginUsers is an asynchronous function used to retrieve a list of all users. It fetches user data from the database and returns it in the response.

