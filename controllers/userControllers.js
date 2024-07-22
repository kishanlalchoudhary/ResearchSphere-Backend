const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/userModel");
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
      "Oops! That doesn't look like a valid email address. Please try again."
    );
  }

  let user = await User.findOne({ email });
  if (user) {
    return sendErrorResponse(
      res,
      400,
      "This email is already associated with an account. Try logging in or use another email to register."
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
    "Welcome! Your account has been created successfully.",
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
      "Oops! That doesn't look like a valid email address. Please try again."
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendErrorResponse(
      res,
      400,
      "We couldn't find an account with that email or username. Please try again or sign up for a new account."
    );
  }

  const equal = await bcrypt.compare(password, user.password);
  if (!equal) {
    return sendErrorResponse(
      res,
      400,
      "Incorrect password. Please check and try again."
    );
  }

  const token = await generateUserToken(user._id);

  return sendSuccessResponse(
    res,
    200,
    "Welcome back! You have successfully logged in.",
    {
      token,
    }
  );
});

const logout = expressAsyncHandler(async (req, res) => {
  const { token, user } = req;

  await User.updateOne({ _id: user._id }, { $pull: { tokens: token } });

  return sendSuccessResponse(
    res,
    200,
    "You've been logged out successfully. Come back soon!"
  );
});

module.exports = {
  signup,
  login,
  logout,
};
