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
    origin: config.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.environment === "development") {
  const logger = morgan("dev");
  app.use(logger);
}

app.use("/api/v1", require("./routes/healthCheckRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/opportunities", require("./routes/opportunityRoutes"));
app.use("/api/v1/feedbacks", require("./routes/feedbackRoutes"));

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(
    `Server is running in ${config.environment} mode on port ${config.port}`
  );
});
