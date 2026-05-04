const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Group = require("../../models/Group");
const User = require("../../models/User");
const router = express.Router();

router.get("/joingroupdetails/:_id", async (req, res) => {
  const _id = req.params._id;

  try {
    const group = await Group.findById(_id).select(
      "name admins members problems invitationCode",
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const totalMemberIds = group.members.concat(group.admins);
    const members = await User.find({_id : {$in :totalMemberIds}},"firstName lastName email")
    // console.log(members);
    const groupObj = group.toObject();

    delete groupObj.problems;

    res.status(200).json({
      success: true,
      members,
      group: {
        ...groupObj,
        totalMembers:totalMemberIds.length
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
module.exports = router;
