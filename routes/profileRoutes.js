const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  getMyProfile,
  getProfileById,
  editMyProfile
} = require("../controllers/profileControllers");

router.get("/all/:userId", getProfileById);
router.get("/my", authenticate, getMyProfile);
router.put("/my", authenticate, editMyProfile);

module.exports = router;
