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

    if (!type || !content) {
      return res.status(400).json({ message: "Type and content required" });
    }

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

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= PUBLISH PROJECT =================
exports.publishProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.project.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

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
        user: { select: { id: true, username: true } },
        projectSkills: { 
          include: { 
            skill: true 
          } 
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Transform data to match frontend expectations
    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      category: project.category || "Web Development",
      viewCount: project.viewCount || Math.floor(Math.random() * 1000),
      createdAt: project.createdAt,
      user: project.user,
      creator: project.user?.username,
      creatorAvatar: (project.user?.username || "U").charAt(0).toUpperCase(),
      thumbnail: project.thumbnail || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop`,
      projectSkills: project.projectSkills
    }));

    res.json(transformedProjects);
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

    if (!project || !project.isPublished) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Increment view count
    await prisma.project.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    });

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
      include: {
        user: { select: { id: true, username: true } },
        projectSkills: { include: { skill: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      category: project.category || "Web Development",
      viewCount: project.viewCount || 0,
      createdAt: project.createdAt,
      user: project.user,
      creator: project.user?.username,
      projectSkills: project.projectSkills
    }));

    res.json(transformedProjects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= SEARCH PROJECTS =================
exports.searchProjects = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }

    const projects = await prisma.project.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { summary: { contains: q, mode: 'insensitive' } },
          { techStack: { contains: q, mode: 'insensitive' } },
          { user: { username: { contains: q, mode: 'insensitive' } } }
        ]
      },
      include: {
        user: { select: { id: true, username: true } },
        projectSkills: { include: { skill: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      category: project.category || "Web Development",
      viewCount: project.viewCount || 0,
      createdAt: project.createdAt,
      user: project.user,
      creator: project.user?.username,
      creatorAvatar: (project.user?.username || "U").charAt(0).toUpperCase(),
      projectSkills: project.projectSkills
    }));

    res.json(transformedProjects);
  } catch (err) {
    console.error("Search projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET PROJECTS BY CATEGORY =================
exports.getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const projects = await prisma.project.findMany({
      where: {
        isPublished: true,
        OR: [
          { techStack: { contains: category, mode: 'insensitive' } },
          { description: { contains: category, mode: 'insensitive' } },
          { summary: { contains: category, mode: 'insensitive' } },
          { title: { contains: category, mode: 'insensitive' } }
        ]
      },
      include: {
        user: { select: { id: true, username: true } },
        projectSkills: { include: { skill: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      category: project.category || "Web Development",
      viewCount: project.viewCount || 0,
      createdAt: project.createdAt,
      user: project.user,
      creator: project.user?.username,
      creatorAvatar: (project.user?.username || "U").charAt(0).toUpperCase(),
      projectSkills: project.projectSkills
    }));

    res.json(transformedProjects);
  } catch (err) {
    console.error("Get projects by category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= TRENDING PROJECTS =================
exports.getTrendingProjects = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      include: {
        user: { select: { id: true, username: true } },
        projectSkills: { include: { skill: true } }
      },
      orderBy: { viewCount: "desc" },
      take: parseInt(limit)
    });

    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      category: project.category || "Web Development",
      viewCount: project.viewCount || 0,
      createdAt: project.createdAt,
      user: project.user,
      creator: project.user?.username,
      projectSkills: project.projectSkills
    }));

    res.json(transformedProjects);
  } catch (err) {
    console.error("Get trending projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= FEATURED PROJECTS =================
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { 
        isPublished: true,
        featured: true 
      },
      include: {
        user: { select: { id: true, username: true } },
        projectSkills: { include: { skill: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 6
    });

    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      category: project.category || "Web Development",
      viewCount: project.viewCount || 0,
      createdAt: project.createdAt,
      user: project.user,
      creator: project.user?.username,
      projectSkills: project.projectSkills
    }));

    res.json(transformedProjects);
  } catch (err) {
    console.error("Get featured projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LIKE PROJECT =================
exports.likeProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if like exists
    const existingLike = await prisma.projectLike.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: id
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.projectLike.delete({
        where: {
          userId_projectId: {
            userId,
            projectId: id
          }
        }
      });
      
      return res.json({ liked: false, message: "Project unliked" });
    } else {
      // Like
      await prisma.projectLike.create({
        data: {
          userId,
          projectId: id
        }
      });
      
      return res.json({ liked: true, message: "Project liked" });
    }
  } catch (err) {
    console.error("Like project error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CHECK LIKE STATUS =================
exports.checkProjectLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const like = await prisma.projectLike.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: id
        }
      }
    });

    res.json({ liked: !!like });
  } catch (err) {
    console.error("Check like error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= INCREMENT VIEWS =================
exports.incrementProjectViews = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: { viewCount: true }
    });

    res.json({ viewCount: project.viewCount });
  } catch (err) {
    console.error("Increment views error:", err);
    res.status(500).json({ message: "Server error" });
  }
};