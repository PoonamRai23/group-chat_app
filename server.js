const express= require('express')
const app=express()
const path=require('path')

const sequelize=require('./util/chatAPP')
const userRouter =require('./routes/user')

const user = require("./models/user");
const chat = require("./models/chatApp");
const group=require("./models/group")
const groupMembers=require("./models/groupMember")
const jwt=require('jsonwebtoken')
const bodyparser=require('body-parser')
const chatRoute = require("./routes/chatAPP");
const groupRoute = require("./routes/group");

const cors=require('cors')
const { emit, disconnect } = require("process");
app.use(cors());

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
 app.use(express.static(path.join(__dirname,'views')))

 app.use('/',userRouter)
app.use('/',chatRoute)
app.use('/',groupRoute)

//one to many relation
user.hasMany(chat)
chat.belongsTo(user);

user.hasMany(groupMembers);
groupMembers.belongsTo(user);

group.hasMany(groupMembers);
groupMembers.belongsTo(group);

group.hasMany(chat);
chat.belongsTo(group);




sequelize.sync({alter:true})
.then(()=>{
    console.log("Table created");
    

}) 
.catch((error)=>{
    console.log(error)

})
const server = app.listen(3000, () => {
    console.log("listening to port 3000");
  });
  
const { Server } = require("socket.io");
const {
  saveSocketId,

  sendMessage,
} = require("./controller/socket");
const SocketUser = require("./models/socket_user");
const io = new Server(server);
// var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  const socket_id = socket.id;
  //sending message for first connection
  console.log("someone is connected : - ", socket_id);
  io.to(socket.id).emit("connection", socket_id);

  socket.on("save-customer-details", saveSocketId);

  socket.on("disconnect", async (socketId) => {
    await SocketUser.destroy({ where: { socket_id } });
  });

  socket.on("sendMessage", (messageData) => {
    sendMessage(messageData, io);
  });
});



