const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../../database");
const { ValidationError } = require("../../util/error");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new ValidationError("email", "Email is incorrect");
    if (!user.isVerified)
      throw new ValidationError(
        "email",
        "Email not verified. Check your inbox or re-register",
      );
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const isProduction = process.env.NODE_ENV === "production";
    if (isPasswordValid) {
      const Token = await user.generateAuthToken();
      // if (rememberMe) {
        res.cookie("LeetCodeToken", Token, {
          expires: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: isProduction, // true on Vercel, false on localhost
          sameSite: isProduction ? "none" : "lax", 
        });
        // });
      // } else {
      //   res.cookie("LeetCodeToken", Token, { httpOnly: true });
      // }
      await user.save();
      return res.status(200).send({
        msg: "Welcome back! You're logged in.",
        user: {
          ...user._doc,
          password: null,
        },
        success: true,
      });
    } else {
      throw new ValidationError("password", "Incorrect Password");
    }
  } catch (error) {
    return res.status(400).send({
      msg: { message: error.message, target: error.target },
      success: false,
    });
  }
});


module.exports = router;