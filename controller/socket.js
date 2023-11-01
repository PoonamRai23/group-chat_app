const ChatMsg = require("../models/chatApp");
const SocketUser = require("../models/socket_user");

const saveSocketId = async ({ userId, socket_id }) => {
  await SocketUser.create({
    socket_id,
    userId,
  });
};

// const socketDisconnect = (socketId) => {
//   console.log("user disconnected", socketId);
// };

const sendMessage = async (messageData, io) => {
  const { to } = messageData;
  // messageData likely contains information about the message, including the sender, recipient (to), message content, etc.
  console.log("check sending message : - ", messageData);
  const sendingSocketDetails = await SocketUser.findOne({
    where: { userId: to },
    order: [["id", "desc"]],
  });
  // It queries the SocketUser model to find the most recent socket ID associated with the recipient's user ID (to) and stores the result in sendingSocketDetails.
  io.to(sendingSocketDetails?.socket_id).emit("received_msg", messageData);
  // io.to(...). This is likely how the message is delivered to the recipient in real-time.
  await ChatMsg.create(messageData);
};
module.exports = { saveSocketId,  sendMessage };
