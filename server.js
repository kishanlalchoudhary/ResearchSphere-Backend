const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();
connectDB();

app.use(
  cors({
    origin: config.frontendURL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = morgan(config.environment === "production" ? "common" : "dev");
app.use(logger);

app.use("/api", require("./routes/healthRoutes"));

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(
    `Server is running in ${config.environment} mode on port ${config.port}`
  );
});
