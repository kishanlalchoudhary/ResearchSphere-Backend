const { sendSuccessResponse } = require("../utils/sendSuccessResponse");

const healthCheck = (req, res) => {
  return sendSuccessResponse(res, 200, "API is running");
};

module.exports = { healthCheck };
