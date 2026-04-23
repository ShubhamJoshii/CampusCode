const express = require("express");
const Problems = require("../../models/Problems");
const router = express.Router();

router.get("/problemDetails/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const problem = await Problems.findById(_id);
    
    res.status(200).json({
      success: true,
      data: problem
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
