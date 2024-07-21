const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const config = require("../config/config");
const { sendErrorResponse } = require("../utils/sendErrorResponse");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return sendErrorResponse(res, 401, "Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);

    const user = await User.findOne({
      _id: decoded.id,
      tokens: token,
    });

    if (!user) {
      return sendErrorResponse(res, 401, "Invalid or expired token.");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendErrorResponse(res, 401, "Token has expired.");
    }

    return sendErrorResponse(res, 401, "Invalid token.");
  }
};

module.exports = { authenticate };
