const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("./config/config");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.listen(config.port, () => {
  console.log(
    `Server is running in ${config.environment} mode on port ${config.port}`
  );
});
