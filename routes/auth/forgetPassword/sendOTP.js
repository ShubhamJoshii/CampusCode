const express = require("express");
const bcrypt = require("bcrypt");

const { UserModel, OTPModel } = require("../../../database");
const { ValidationError } = require("../../../util/error");
const OTPMail = require("../../../util/OTPMail");
const { transporter } = require("../../../util/transporter");
const router = express.Router();

router.post("/sendOTP", async (req, res) => {
  const { email } = req.body;
  try {
    const emailExist = await UserModel.findOne({ email });
    if (!emailExist) throw new ValidationError("email", "Invalid Email");
    if (!emailExist.isVerified)
      throw new ValidationError(
        "email",
        "Email not verified. Check your inbox or re-register",
      );
    const otp = `${Math.floor(Math.random() * 900000) + 100000}`;
    const hashedOTP = await bcrypt.hash(otp, 12);
    const otpPreviousSave = await OTPModel.deleteMany({
      userID: emailExist._id,
    });

    const OTPSaveOnDB = new OTPModel({
      userID: emailExist._id,
      OTP: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    let message = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Forget Password Request",
      html: OTPMail(emailExist.firstName + " " + emailExist.lastName, otp),
    };

    try {
      await transporter.sendMail(message);

      const otpsaved = await OTPSaveOnDB.save();

      return res.send({
        msg: "OTP sent successfully",
        user: { otpID: otpsaved._id, email },
        success: true,
      });
    } catch (error) {
      throw new ValidationError("email", "Failed to send OTP");
    }
  } catch (error) {
    return res.status(400).send({
      msg: { message: error.message, target: error.target },
      success: false,
    });
  }
});

module.exports = router;
