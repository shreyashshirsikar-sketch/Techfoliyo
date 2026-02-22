const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");


// ================= BUILDER FLOW =================

// create empty draft
router.post("/draft", authMiddleware, projectController.createDraft);

// save or update a section
router.post("/:id/section", authMiddleware, projectController.saveSection);

// get project for editing (builder reopen)
router.get("/:id/builder", authMiddleware, projectController.getBuilderProject);

// publish project → generates skills
router.patch("/:id/publish", authMiddleware, projectController.publishProject);



// ================= PUBLIC =================

// public feed
router.get("/", projectController.getAllProjects);

// portfolio page
router.get("/user/:userId", projectController.getProjectsByUser);

// single project
router.get("/:id", projectController.getProjectById);



module.exports = router;
