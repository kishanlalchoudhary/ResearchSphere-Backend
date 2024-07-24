const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const config = require("../config/config");

const generateUserToken = expressAsyncHandler(async (userId) => {
  const token = jwt.sign({ id: userId }, config.jwtSecretKey);

  await User.findOneAndUpdate({ _id: userId }, { $push: { tokens: token } });

  return token;
});

module.exports = generateUserToken;
