require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/",
  dbName: process.env.DB_NAME || "researchsphere",
  frontendUrl: process.env.FRONTEND_URL || "*",
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  loginExpires: process.env.LOGIN_EXPIRES || "30d",
  salt: Number(process.env.SALT) || 10,
};

module.exports = config;
