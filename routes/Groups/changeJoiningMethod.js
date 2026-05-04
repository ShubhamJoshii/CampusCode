const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Group = require("../../models/Group");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/group/changejoiningmethod", authMiddleware, async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const group = await Group.findOne({
      _id:_id,
      admins: { $in: [req.userID] },
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found or unauthorized",
      });
    }

    group.isPublic = !group.isPublic;
    await group.save();

    return res.status(200).json({
      success: true,
      message: "Group Joining Method updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
