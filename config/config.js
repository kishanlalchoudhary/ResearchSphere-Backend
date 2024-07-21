require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/",
  dbName: process.env.DB_NAME || "researchsphere",
  frontendURL: process.env.FRONTEND_URL || "*",
};

module.exports = config;
