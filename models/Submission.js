const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true
    },

    code: String,
    language: String,
    pointEarned:Number,

    status: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "TLE", "Runtime Error"],
    },

    runtime: Number,
    memory: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);