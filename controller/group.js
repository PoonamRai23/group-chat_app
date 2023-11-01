const sequelize = require("sequelize");
const Group = require("../models/group");
const GroupMembers = require("../models/groupMember");

const createGroup = async (req, res) => {
  try {
    const groupName = req.body.groupname; //html
    const name = req.user.name;
    const members = req.body.members;
    console.log("postdata>>>>>", groupName, name, members);

    const group = await Group.create({
      groupname: groupName, //from backend
      createdBy: name,//The createdBy field is set to the user's name (name).
      userId: req.user.id,

      //The userId field is set to the user's ID (req.user.id), indicate the user creating the group is a member of the group.
    });
    // It creates a new group record in the Group model and retrieves the ID of the newly created group
// The function then maps user IDs to group-user associations and uses   bulkCreate to insert these associations into the GroupMembers model.
// Finally, it sends a response with the group details and the group-user associations created. If an error occurs, it sends an error response.
    const groupID = group.get("id");
    console.log("groupID>>>>>>>>>>>>>>>>>>", groupID);
    // here we are using the map function to convert an array of members (user IDs) into an array of objects, where each object represents a group-user association.
    const groupMemberData = members.map((userId) => ({
      chatgroupId: groupID,
      userId: userId,
    }));
  //  bulkCreate is used for inserting multiple records into the database table in a single operation.
    const groupdta = await GroupMembers.bulkCreate(groupMemberData);
    return res
      .status(200)
      .json({ groupdetails: group, groupMemberData: groupdta });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "cant send group data into db", err });
  }
};
const getGroupDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const GroupMem = await GroupMembers.findAll({
      where: { userId },
    });
    console.log("Group mem:>>>>>>>>>>>>>>>>>>>", GroupMem);

    const groupIDs = GroupMem.map((GroupMember) => GroupMember.chatgroupId);

    console.log("groupIDs>>>>>>>>>>>>>", groupIDs);
    const groups = await Group.findAll({
      where: { Id: groupIDs },
    });
    console.log("all groups", groups);
    return res
      .status(200)
      .json({ allGroupData: groups, groupmembers: GroupMem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Can't get group details from the database", error });
  }
};

module.exports = { createGroup, getGroupDetails };
