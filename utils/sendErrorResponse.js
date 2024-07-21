const sendErrorResponse = (res, statusCode, message, details = {}) => {
  res.status(statusCode).json({
    status: "error",
    message,
    details,
  });
};

module.exports = sendErrorResponse;
