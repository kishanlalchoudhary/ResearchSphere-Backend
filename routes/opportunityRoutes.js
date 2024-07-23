const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  createOpportunity,
  editOpportunity,
  deleteOpportunity,
  getAllOpportunities,
  getAllOpportunityById,
  getMyOpportunities,
  getMyOpportunityById,
  applyForOpportunity,
  getMyOpportunityApplications,
  acceptApplication,
  rejectApplication
} = require("../controllers/opportunityControllers");

router.post("/my", authenticate, createOpportunity);
router.put("/my/:opportunityId", authenticate, editOpportunity);
router.delete("/my/:opportunityId", authenticate, deleteOpportunity);
router.get("/all", getAllOpportunities);
router.get("/all/:opportunityId", getAllOpportunityById);
router.get("/my", authenticate, getMyOpportunities);
router.get("/my/:opportunityId", authenticate, getMyOpportunityById);
router.post("/all/:opportunityId/apply", authenticate, applyForOpportunity);
router.get(
  "/my/:opportunityId/applications",
  authenticate,
  getMyOpportunityApplications
);
router.put("/my/applications/:applicationId/accept", authenticate, acceptApplication);
router.put("/my/applications/:applicationId/reject", authenticate, rejectApplication);

module.exports = router;
