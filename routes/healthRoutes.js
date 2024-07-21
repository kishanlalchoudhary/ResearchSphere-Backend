const express = require("express");
const router = express.Router();
const sendSuccessResponse = require("../utils/response");

router.get("/health", (req, res) => {
  sendSuccessResponse(res, 200, "API is running");
});

module.exports = router;