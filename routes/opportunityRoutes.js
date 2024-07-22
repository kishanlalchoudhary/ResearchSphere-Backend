const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  createOpportunity,
  editOpportunity,
  deleteOpportunity,
  getMyOpportunities,
  getAllOpportunities,
} = require("../controllers/opportunityControllers");

router.get("/all", getAllOpportunities);
router.get("/my", authenticate, getMyOpportunities);
router.post("/my", authenticate, createOpportunity);
router.put("/my/:opportunityId", authenticate, editOpportunity);
router.delete("/my/:opportunityId", authenticate, deleteOpportunity);

module.exports = router;
