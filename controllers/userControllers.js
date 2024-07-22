const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const validator = require("validator");
const config = require("../config/config");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");
const generateUserToken = require("../utils/generateUserToken");

const signup = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(
      res,
      400,
      "Invalid email address"
    );
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
    "Your account has been created successfully",
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
    return sendErrorResponse(
      res,
      400,
      "Invalid email address"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendErrorResponse(
      res,
      400,
      "We couldn't find an account with this email"
    );
  }

  const equal = await bcrypt.compare(password, user.password);
  if (!equal) {
    return sendErrorResponse(res, 400, "Incorrect password");
  }

  const token = await generateUserToken(user._id);

  return sendSuccessResponse(res, 200, "You've been logged in successfully", {
    token,
  });
});

const logout = expressAsyncHandler(async (req, res) => {
  const { token, user } = req;

  await User.updateOne({ _id: user._id }, { $pull: { tokens: token } });

  return sendSuccessResponse(res, 200, "You've been logged out successfully");
});

module.exports = {
  signup,
  login,
  logout,
};
