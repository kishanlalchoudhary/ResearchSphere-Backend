const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "professor", "other"],
    },
    about: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    categories: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    tokens: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
