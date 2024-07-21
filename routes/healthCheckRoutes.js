const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/healthCheckControllers");

router.get("/health-check", healthCheck);

module.exports = router;
