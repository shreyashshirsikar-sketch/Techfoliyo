const prisma = require("../config/prisma");


// ================= CREATE DRAFT =================
exports.createDraft = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        userId: req.userId
      }
    });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= SAVE SECTION =================
exports.saveSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, content } = req.body;

    if (!type || !content)
      return res.status(400).json({ message: "Type and content required" });

    const section = await prisma.projectSection.upsert({
      where: {
        projectId_type: {
          projectId: id,
          type
        }
      },
      update: { content },
      create: {
        projectId: id,
        type,
        content
      }
    });

    res.json(section);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET BUILDER DATA =================
exports.getBuilderProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: { sections: true }
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ================= PUBLISH PROJECT =================
exports.publishProject = async (req, res) => {
  try {
    const { id } = req.params;

    // check project exists
    const existing = await prisma.project.findUnique({
      where: { id }
    });

    if (!existing)
      return res.status(404).json({ message: "Project not found" });

    // publish
    const project = await prisma.project.update({
      where: { id },
      data: { isPublished: true }
    });

    return res.json({
      message: "Project published successfully",
      project
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



// ================= PUBLIC FEED =================
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      include: {
        user: { select: { id: true, username: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= SINGLE PROJECT =================
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, username: true } },
        sections: true,
        projectSkills: { include: { skill: true } }
      }
    });

    if (!project || !project.isPublished)
      return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= USER PROJECTS =================
exports.getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await prisma.project.findMany({
      where: { userId, isPublished: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
