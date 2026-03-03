const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { 
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  getUserById,
  searchUsers
} = require("../controllers/userController");

console.log("✅ User routes initialized");

// ================= PUBLIC ROUTES =================
router.get("/search", searchUsers);
router.get("/", getUsers);
router.get("/:id", getUserById);

// ================= PROTECTED ROUTES =================
router.get("/profile/:id", protect, getUserProfile);
router.put("/profile/:id", protect, updateUserProfile);
router.get("/:id/projects", protect, getUserProjects);

module.exports = router;