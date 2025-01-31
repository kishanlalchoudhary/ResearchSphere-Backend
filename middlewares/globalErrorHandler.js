const sendErrorResponse = require("../utils/sendErrorResponse");

const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack);
  sendErrorResponse(res, 500, "Internal Server Error", { error: err.message });
};

module.exports = globalErrorHandler;
