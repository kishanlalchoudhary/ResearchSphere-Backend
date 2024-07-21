const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.mongoUri}${config.dbName}`
    );
    console.log(
      "MongoDB connected !! DB HOST:",
      connectionInstance.connection.host
    );
  } catch (err) {
    console.log(`MongoDB connection FAILED \n${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
