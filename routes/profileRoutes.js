const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  editMyProfile,
  getMyProfile,
  getProfileById,
} = require("../controllers/profileControllers");

router.put("/my", authenticate, editMyProfile);
router.get("/my", authenticate, getMyProfile);
router.get("/all/:userId", getProfileById);

module.exports = router;
