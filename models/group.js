const Sequelize = require("sequelize");
const sequelize_db = require("../util/chatAPP");

const Group = sequelize_db.define("chatgroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  groupname: {
    type: Sequelize.STRING,
  },
  createdBy: {
    type: Sequelize.STRING,
  },
});
module.exports = Group;