const express = require("express");
const router = express.Router();

router.use("/",require("./auth/home"));
router.use("/",require("./auth/register"));
router.use("/",require("./auth/login"));
router.use("/",require("./auth/logout"));
router.use("/",require("./auth/updatePassword"));
router.use("/",require("./auth/verifyEmail"));
router.use("/",require("./auth/deleteUser"));
router.use("/",require("./auth/forgetPassword/sendOTP"));
router.use("/",require("./auth/forgetPassword/verifyOTP"));

router.use("/",require("./Problems/addproblem"));
router.use("/",require("./Problems/problemDetails"));
router.use("/",require("./Problems/fetchAllProblems"));
router.use("/",require("./Problems/searchProblems"));

module.exports = router;
