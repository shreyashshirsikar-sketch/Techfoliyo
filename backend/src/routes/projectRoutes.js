const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");

// Debug logging
console.log("✅ Project routes initialized with all handlers");

// ================= BUILDER FLOW =================
router.post("/draft", authMiddleware, projectController.createDraft);
router.post("/:id/section", authMiddleware, projectController.saveSection);
router.get("/:id/builder", authMiddleware, projectController.getBuilderProject);
router.patch("/:id/publish", authMiddleware, projectController.publishProject);

// ================= PUBLIC ROUTES =================
router.get("/search", projectController.searchProjects);
router.get("/category/:category", projectController.getProjectsByCategory);
router.get("/trending", projectController.getTrendingProjects);
router.get("/featured", projectController.getFeaturedProjects);
router.get("/user/:userId", projectController.getProjectsByUser);
router.get("/", projectController.getAllProjects);

// ================= INTERACTION ROUTES =================
router.post("/:id/like", authMiddleware, projectController.likeProject);
router.get("/:id/like/status", authMiddleware, projectController.checkProjectLike);
router.post("/:id/view", projectController.incrementProjectViews);

// ================= SINGLE PROJECT (must be last) =================
router.get("/:id", projectController.getProjectById);

module.exports = router;