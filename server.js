const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Server is running in production mode on port ${PORT}`);
  } else {
    console.log(`Server is running in development mode on port ${PORT}`);
  }
});
