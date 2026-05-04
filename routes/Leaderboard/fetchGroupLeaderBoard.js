const express = require("express");
const Submission = require("../../models/Submission");
const Group = require("../../models/Group");
const router = express.Router();

router.get("/leaderboard/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    const leaderboardData = await Submission.find(
      { groupId },
      "pointEarned"
    ).populate("user", "firstName lastName userName");

    let leaderData = leaderboardData.reduce((acc, curr) => {
      if (!curr.user) return acc;

      const userID = curr.user._id.toString();

      if (!acc[userID]) {
        acc[userID] = {
          userID,
          name: curr.user.userName ||
            `${curr.user.firstName} ${curr.user.lastName}`,
          totalPointEarned: curr.pointEarned,
        };
      } else {
        acc[userID].totalPointEarned += curr.pointEarned;
      }

      return acc;
    }, {});

    const group = await Group.findById(groupId)
      .populate("members admins", "firstName lastName userName")
      .lean();

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const allUsers = [
      ...(group.members || []),
      ...(group.admins || []),
    ];

    const seen = new Set();

    allUsers.forEach((user) => {
      if (!user) return;

      const userID = user._id.toString();

      if (seen.has(userID)) return;
      seen.add(userID);

      if (!leaderData[userID]) {
        leaderData[userID] = {
          userID,
          name: user.userName ||
            `${user.firstName} ${user.lastName}`,
          totalPointEarned: 0,
        };
      }
    });

    leaderData = Object.values(leaderData).sort(
      (a, b) => b.totalPointEarned - a.totalPointEarned
    );

    res.status(200).json({
      success: true,
      data: leaderData,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;