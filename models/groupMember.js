const Sequelize = require("sequelize");
const sequelize = require("../util/chatAPP");

const group_members = sequelize.define("groupMembers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
 
});

module.exports = group_members;