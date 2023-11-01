const  ChatMsg = require("../models/chatApp")
const Chatapp=require("../models/chatApp")
const sequelize = require("sequelize");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const postChat = async (req, res) => {
  try {
    
    const msg = req.body.message;
    // console.log("msg from you", msg);
    const data= await Chatapp.create({
      chat:msg,
      userId:req.user.id,
    });
    return res.status(200).json({chatMsg:data});
  } catch {
    return res.status(500).json({ message: "cant send in database" });
  }
};

const getChat = async (req, res) => {
  try {
    // const userId=req.user.id;
    //   const selectedUserId=req.params.userId
    //   console.log("userid>>>>",userId)

    // const data = await Chatapp.findAll({where:{
    //   [sequelize.Op.or]:[
    //     [{
    //       userId: userId
    //     }, {
    //       selectedId: selectedUserId
    //     }]
    //   ]
    // },
    // order: [['createdAt', 'ASC']] //asscending order m de dega
  
    //  });
    const data = await Chatapp.findAll({where:{ userId: req.user.id } });
    // console.log("getdata>>>>>>>>>>",data);
    return res.status(200).json({ chatMsg: data, message:"data fetched successfully"});
      
  } catch (err) {
    console.log("something went wrong", err);
  }
};
const getMyMessages = async (req, res) => {
  const { to, from } = req.params;
  data = await ChatMsg.findAll({
    where: {
      to: [to, from],
      from: [to, from],
    },
  });
  return res
    .status(200)
    .json({ chatMsg: data, message: " data fetched successfully" });
};
module.exports = {postChat:postChat,getChat,getMyMessages} 
  