const express = require("express");
const router = express.Router();
const {
  saveFeedback,
  getFeedbacks,
} = require("../controllers/feedbackControllers");

router.get("/", getFeedbacks);
router.post("/", saveFeedback);

module.exports = router;
