const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Group = require("../../models/Group");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/group/changename", authMiddleware, async (req, res) => {
  const { _id, name } = req.body;

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

    group.name = name;
    await group.save();

    return res.status(200).json({
      success: true,
      message: "Group name updated successfully",
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
