const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getFeedbacks,
} = require("../controllers/feedbackControllers");

router.post("/", submitFeedback);
router.get("/", getFeedbacks);

module.exports = router;
