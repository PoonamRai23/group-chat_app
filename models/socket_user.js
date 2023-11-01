const Sequelize = require("sequelize");
const sequelize_db = require("../util/chatAPP");

const SocketUser = sequelize_db.define("socket_user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  socket_id: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.STRING,
  },
});
module.exports = SocketUser;
