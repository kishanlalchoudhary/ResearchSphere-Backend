const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const validator = require("validator");
const config = require("../config/config");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");
const generateUserToken = require("../utils/generateUserToken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

const signup = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email address");
  }

  let user = await User.findOne({ email });
  if (user) {
    return sendErrorResponse(
      res,
      400,
      "This email is already associated with an account"
    );
  }

  if (password.length < 6) {
    return sendErrorResponse(
      res,
      400,
      "Your password is too short. It must be at least 6 characters long."
    );
  }

  const hashedPassword = await bcrypt.hash(password, config.salt);
  user = await User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();

  const token = await generateUserToken(user._id);

  return sendSuccessResponse(
    res,
    201,
    "Your account have been created successfully",
    {
      token,
    }
  );
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email address");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendErrorResponse(res, 404, "User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return sendErrorResponse(res, 400, "Incorrect password");
  }

  const token = await generateUserToken(user._id);

  return sendSuccessResponse(res, 200, "You have been logged in successfully", {
    token,
  });
});

const logout = expressAsyncHandler(async (req, res) => {
  const { token, user } = req;

  await User.updateOne({ _id: user._id }, { $pull: { tokens: token } });

  return sendSuccessResponse(res, 200, "You have been logged out successfully");
});

const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendErrorResponse(res, 400, "All fields required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email address");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendErrorResponse(res, 404, "User does not exist");
  }

  const otp = generateOTP();
  const otpExpiresAt = new Date();
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 5);

  const hashedOtp = await bcrypt.hash(otp, config.salt);

  await User.findByIdAndUpdate(user._id, { otp: hashedOtp, otpExpiresAt });

  const subject = "Password Reset OTP";
  const message = `<p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`;
  await sendEmail(email, subject, message);

  return sendSuccessResponse(res, 200, "OTP sent to your email");
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email address");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendErrorResponse(res, 404, "User does not exist");
  }

  if (!user.otp || user.otpExpiresAt < new Date()) {
    return sendErrorResponse(res, 400, "OTP expired");
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);
  if (!isOtpValid) {
    return sendErrorResponse(res, 400, "Incorrect OTP");
  }

  const newHashedPassword = await bcrypt.hash(newPassword, config.salt);
  await User.findByIdAndUpdate(user._id, {
    password: newHashedPassword,
    otp: null,
    otpExpiresAt: null,
  });

  return sendSuccessResponse(res, 200, "You have reset password successfully");
});

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
