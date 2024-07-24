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
    profession: {
      type: String,
      default: "Student",
      enum: ["Student", "Professor", "Other"],
    },
    about: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    domains: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    tokens: {
      type: [String],
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
