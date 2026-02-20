const prisma = require("../config/prisma");

exports.createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;

    if (!title || !description || !techStack) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        githubUrl,
        liveUrl,
        userId: req.userId
      }
    });

    res.json({
      message: "Project created successfully",
      project
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PROJECTS (feed)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: { id: true, username: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET SINGLE PROJECT
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true }
        }
      }
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET PROJECTS OF A USER (portfolio page)
exports.getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

