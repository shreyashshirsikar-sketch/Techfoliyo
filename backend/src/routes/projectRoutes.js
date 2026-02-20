const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");

// create project
router.post("/", authMiddleware, projectController.createProject);

// read projects
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.get("/user/:userId", projectController.getProjectsByUser);

module.exports = router;
