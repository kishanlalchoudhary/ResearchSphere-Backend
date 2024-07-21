require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGO_URI,
  dbName: process.env.DB_NAME || "researchsphere",
};

module.exports = config;