const express = require("express");
const Submission = require("../../models/Submission");
const router = express.Router();

const User = require("../../models/User");

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboardData = await Submission.find({ groupId: null }, "pointEarned")
      .populate("user", "firstName lastName userName");

    let leaderData = leaderboardData.reduce((acc, curr) => {
      if (!curr.user) return acc;

      const userID = curr.user._id.toString();

      if (!acc[userID]) {
        acc[userID] = {
          userID,
          name: `${curr.user.userName || curr.user.firstName + " " + curr.user.lastName}`,
          totalPointEarned: curr.pointEarned,
        };
      } else {
        acc[userID].totalPointEarned += curr.pointEarned;
      }
      return acc;
    }, {});

    const allUsers = await User.find({}, "firstName lastName userName");

    allUsers.forEach((user) => {
      const userID = user._id.toString();

      if (!leaderData[userID]) {
        leaderData[userID] = {
          userID,
          name: `${user.userName || user.firstName + " " + user.lastName}`,
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
