const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Submission = require("../../models/Submission");
const router = express.Router();

router.post("/submitSolution", authMiddleware, async (req, res) => {
  const { problemId, code, status, runtime, memory } = req.body;

  try {
    console.log(req.userID, problemId, code, status, runtime, memory);
    const submitSol = await Submission({
      user: req.userID,
      problem: problemId,
      code,
      status,
      runtime,
      memory,
    });
    const response = await submitSol.save();
    res.send(response);
  } catch (error) {
    res.send("dfas2");
  }
});

module.exports = router;
