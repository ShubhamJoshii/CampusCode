const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"], 
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium"
  },
  tags: [String],
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    }
  ],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users"
  },
  group: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Group" 
  },
}, { timestamps: true });

module.exports = mongoose.model("Problem", ProblemSchema);
