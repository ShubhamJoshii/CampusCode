const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Group = require("../../models/Group");
const router = express.Router();

router.get("/groupdetails/:_id", authMiddleware, async (req, res) => {
  const _id = req.params._id;
  console.log(_id);
  try {
    const group = await Group.findOne({ _id }, "name admins members problems");
    const totalMembers = group.members.length + group.admins.length
    const totalQuestions = group.problems.length
    const yourRank = 1
    // console.log(group);
    const groupObj = group.toObject();
    
    res.status(200).json({
      success: true,
      data: {...groupObj, totalMembers, totalQuestions, yourRank},
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
