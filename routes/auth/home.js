const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/home", authMiddleware, async (req, res) => {
  if (req.rootUser) {
    res.send({
      user: { ...req.rootUser._doc, password: null, tokens: null },
      success: true,
    });
  } else {
    res.send({ success: false });
  }
});

module.exports = router;