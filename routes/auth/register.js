const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");
const { ValidationError } = require("../../util/error");
const verifyEmailMail = require("../../util/verifyEmailMail");
const { transporter } = require("../../util/transporter.js");

const crypto = require("crypto");

const env = process.env.NODE_ENV;
const validator = require("../../middleware/validator.js");
const registerSchema = require("../../validators/registerSchema.js");

// router.post("/register",validator(registerSchema), async (req, res) => {
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // const BASE_URL = `https://${req.headers.host}/api`;
  const BASE_URL =
    env === "PRODUCTION"
      ? `https://${req.headers.host}/api`
      : "http://localhost:5000/api";

  let emailToken = crypto.randomBytes(32).toString("hex");

  var VerfiedLink = `${BASE_URL}/verify-email?token=${emailToken}`;

  try {
    if (!firstName || !lastName || !email || !password)
      throw new ValidationError("All", "All Field are required");
    if (password != confirmPassword)
      throw new ValidationError("password", "Password doen't Matched");

    const userAlreadyExist = await UserModel.findOne({ email });
    if (!userAlreadyExist) {
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        emailToken,
        password,
      });
      let message = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Let's complete your account setup",
        html: verifyEmailMail(firstName + " " + lastName, VerfiedLink),
      };
      let temp = await newUser.save();

      try {
        await transporter.sendMail(message);

        return res.send({
          msg: "User registered successfully. Verification email sent.",
          user: { email: req.body.email, _id: temp._doc._id },
          success: true,
        });
      } catch (error) {
        return res.send({
          msg: "User registered, but email could not be sent.",
          user: { email: req.body.email, _id: temp._doc._id },
          success: false,
        });
      }
    }
    throw new ValidationError("email", "Email already exists!");
    // return res.send("Hello World");
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      msg: { message: error.message, target: error.target },
      success: false,
    });
  }
});

module.exports = router;
