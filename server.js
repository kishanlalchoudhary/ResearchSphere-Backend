const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();
connectDB();

const whitelist = [
  config.frontendUrl
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.environment === "development") {
  const logger = morgan("dev");
  app.use(logger);
}

app.use("/api/v1", require("./routes/healthCheckRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/profile", require("./routes/profileRoutes"));
app.use("/api/v1/opportunities", require("./routes/opportunityRoutes"));
app.use("/api/v1/applications", require("./routes/applicationRoutes"));
app.use("/api/v1/feedbacks", require("./routes/feedbackRoutes"));

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(
    `Server is running in ${config.environment} mode on port ${config.port}`
  );
});
