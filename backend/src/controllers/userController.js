const prisma = require("../config/prisma");

// @desc    Get all users
// @route   GET /users
// @access  Public
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            projects: true,
          }
        },
        projects: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            description: true,
            summary: true,
            difficulty: true,
            isPublished: true,
            techStack: true,
            githubUrl: true,
            liveUrl: true,
            createdAt: true
          }
        },
        userSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true
              }
            },
            score: true
          }
        }
      }
    });
    
    const transformedUsers = users.map(user => ({
      id: user.id,
      name: user.username,
      username: user.username,
      email: user.email,
      role: "Developer",
      title: "Developer",
      college: "University",
      bio: `Member since ${new Date(user.createdAt).toLocaleDateString()}`,
      skills: user.userSkills?.map(us => us.skill.name) || [],
      projects: user.projects,
      projectsCount: user._count?.projects || 0,
      createdAt: user.createdAt,
      experienceLevel: "Intermediate",
      availability: "Open to opportunities",
      profileImage: null
    }));
    
    res.json(transformedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        projects: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            description: true,
            summary: true,
            difficulty: true,
            techStack: true,
            githubUrl: true,
            liveUrl: true,
            createdAt: true,
            isPublished: true,
            viewCount: true
          }
        },
        userSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true
              }
            },
            score: true
          }
        },
        _count: {
          select: {
            projects: true,
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const transformedUser = {
      id: user.id,
      name: user.username,
      username: user.username,
      email: user.email,
      role: "Developer",
      title: "Developer",
      college: "University",
      bio: `Member since ${new Date(user.createdAt).toLocaleDateString()}`,
      skills: user.userSkills?.map(us => us.skill.name) || [],
      projects: user.projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description || project.summary,
        techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        difficulty: project.difficulty,
        status: project.isPublished ? "Completed" : "Ongoing",
        hasLiveDemo: !!project.liveUrl,
        hasGitHub: !!project.githubUrl,
        createdAt: project.createdAt,
        viewCount: project.viewCount || 0
      })),
      projectsCount: user._count?.projects || 0,
      createdAt: user.createdAt,
      experienceLevel: "Intermediate",
      availability: "Open to opportunities",
      profileImage: null
    };
    
    res.json(transformedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// @desc    Get user profile (protected)
// @route   GET /users/profile/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ error: "Not authorized to view this profile" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        projects: {
          select: {
            id: true,
            title: true,
            description: true,
            summary: true,
            difficulty: true,
            isPublished: true,
            techStack: true,
            githubUrl: true,
            liveUrl: true,
            createdAt: true,
            updatedAt: true,
            viewCount: true
          }
        },
        userSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true
              }
            },
            score: true
          }
        },
        _count: {
          select: {
            projects: true
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const transformedUser = {
      id: user.id,
      name: user.username,
      username: user.username,
      email: user.email,
      skills: user.userSkills?.map(us => ({
        name: us.skill.name,
        score: us.score
      })) || [],
      projects: user.projects,
      projectsCount: user._count?.projects || 0,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    res.json(transformedUser);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// @desc    Update user profile
// @route   PUT /users/profile/:id
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    if (req.userId !== req.params.id) {
      return res.status(403).json({ error: "Not authorized to update this profile" });
    }
    
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          NOT: { id: req.userId }
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }
    
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: req.userId }
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ error: "Email already taken" });
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        username,
        email
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// @desc    Get user's projects
// @route   GET /users/:id/projects
// @access  Public/Private
const getUserProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { 
        userId: req.params.id,
        ...(req.userId !== req.params.id ? { isPublished: true } : {})
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        projectSkills: {
          include: {
            skill: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.summary,
      techStack: project.techStack ? project.techStack.split(',').map(t => t.trim()) : [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      difficulty: project.difficulty,
      isPublished: project.isPublished,
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!project.liveUrl,
      hasGitHub: !!project.githubUrl,
      skills: project.projectSkills?.map(ps => ps.skill.name) || [],
      creator: project.user?.username,
      createdAt: project.createdAt,
      viewCount: project.viewCount || 0
    }));
    
    res.json(transformedProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};

// @desc    Search users
// @route   GET /users/search
// @access  Public
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        projects: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true
          }
        },
        userSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true
              }
            },
            score: true
          }
        },
        _count: {
          select: {
            projects: true
          }
        }
      },
      orderBy: { username: 'asc' }
    });

    const transformedUsers = users.map(user => ({
      id: user.id,
      name: user.username,
      username: user.username,
      email: user.email,
      role: "Developer",
      title: "Developer",
      college: "University",
      bio: `Member since ${new Date(user.createdAt).toLocaleDateString()}`,
      skills: user.userSkills?.map(us => us.skill.name) || [],
      projects: user.projects,
      projectsCount: user._count?.projects || 0,
      createdAt: user.createdAt,
      experienceLevel: "Intermediate",
      availability: "Open to opportunities",
      profileImage: null,
      avatar: (user.username || "U").charAt(0).toUpperCase()
    }));

    res.json(transformedUsers);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Failed to search users" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  searchUsers
};