const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  createOpportunity,
  editOpportunity,
  deleteOpportunity,
  getMyOpportunities,
  getMyOpportunityById,
  getAllOpportunities,
  getAllOpportunityById,
} = require("../controllers/opportunityControllers");

router.get("/all", getAllOpportunities);
router.get("/all/:opportunityId", getAllOpportunityById);
router.get("/my", authenticate, getMyOpportunities);
router.get("/my/:opportunityId", authenticate, getMyOpportunityById);
router.post("/my", authenticate, createOpportunity);
router.put("/my/:opportunityId", authenticate, editOpportunity);
router.delete("/my/:opportunityId", authenticate, deleteOpportunity);

module.exports = router;
