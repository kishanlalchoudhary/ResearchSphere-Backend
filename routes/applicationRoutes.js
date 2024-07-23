const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  getMyApplications,
  withdrawApplication
} = require("../controllers/applicationControllers");

router.get("/my", authenticate, getMyApplications);
router.delete("/my/:applicationId/withdraw", authenticate, withdrawApplication);

module.exports = router;
