const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  saveFeedback,
  getFeedbacks,
} = require("../controllers/feedbackControllers");

router.get("/", authenticate, getFeedbacks);
router.post("/", authenticate, saveFeedback);

module.exports = router;
