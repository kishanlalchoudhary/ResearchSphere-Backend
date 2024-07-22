const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const { signup, login, logout } = require("../controllers/userControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticate, logout);

module.exports = router;
