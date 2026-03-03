import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, searchProjects, getProjectsByCategory } from "../api/projects";
import { getUsers, searchUsers } from "../api/users";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("engineers");
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("");
  const [selectedHasLiveDemo, setSelectedHasLiveDemo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Use refs to prevent unnecessary re-renders
  const initialLoadRef = useRef(true);
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Popular skills for filtering
  const popularSkills = useMemo(() => 
    ["React", "Python", "Java", "Node.js", "MongoDB", "TensorFlow", "Flutter", "AWS"], 
  []);

  // Domains for filtering
  const domains = useMemo(() => [
    "Web Development",
    "Machine Learning",
    "Mobile Development",
    "Backend",
    "Data Science",
    "DevOps",
    "IoT",
    "Cybersecurity"
  ], []);

  // Experience levels
  const experienceLevels = useMemo(() => 
    ["Beginner", "Intermediate", "Advanced"], 
  []);

  // Memoized data transformation functions
  const transformProjects = useCallback((projectsData) => {
    if (!Array.isArray(projectsData)) return [];
    
    return projectsData.map(project => ({
      id: project.id,
      title: project.title,
      creator: project.user?.username || project.creator || "Unknown",
      creatorAvatar: (project.user?.username || project.creator || "U").charAt(0).toUpperCase(),
      thumbnail: project.thumbnail || project.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop`,
      techStack: Array.isArray(project.techStack) 
        ? project.techStack 
        : (typeof project.techStack === 'string' ? project.techStack.split(',').map(t => t.trim()) : 
           project.projectSkills?.map(ps => ps.skill?.name) || []),
      description: project.description || project.summary || "",
      status: project.isPublished ? "Completed" : "Ongoing",
      hasLiveDemo: !!(project.liveUrl || project.demoUrl),
      hasGitHub: !!(project.githubUrl || project.repoUrl),
      domain: project.category || project.domain || "Web Development",
      views: project.viewCount || project.views || Math.floor(Math.random() * 1000),
      createdAt: project.createdAt,
      difficulty: project.difficulty || "Intermediate",
      featured: project.featured || false,
      user: project.user
    }));
  }, []);

  const transformEngineers = useCallback((usersData) => {
    if (!Array.isArray(usersData)) return [];
    
    return usersData.map(user => ({
      id: user.id,
      name: user.username || user.name,
      role: user.role || user.title || "Developer",
      avatar: user.profileImage || (user.username || user.name || "U").charAt(0).toUpperCase(),
      skills: user.skills || user.userSkills?.map(us => us.skill?.name) || [],
      college: user.college || user.institution || "University",
      bio: user.bio || `Member since ${new Date(user.createdAt).toLocaleDateString()}`,
      projectsCount: user.projects?.length || user.projectCount || 0,
      availability: user.availability || "Open to opportunities",
      experience: user.experienceLevel || "Intermediate",
      profileImage: user.profileImage,
      createdAt: user.createdAt
    }));
  }, []);

  // Fetch data with abort controller
  const fetchData = useCallback(async (signal) => {
    try {
      setLoading(true);
      
      if (activeTab === "projects") {
        let projectsData;
        
        if (selectedDomain) {
          projectsData = await getProjectsByCategory(selectedDomain, { signal });
        } else if (searchQuery) {
          projectsData = await searchProjects(searchQuery, { signal });
        } else {
          projectsData = await getProjects({ signal });
        }
        
        setProjects(transformProjects(projectsData));
      } else {
        let usersData;
        
        if (searchQuery) {
          usersData = await searchUsers(searchQuery, { signal });
        } else {
          usersData = await getUsers({ signal });
        }
        
        setEngineers(transformEngineers(usersData));
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      console.error("Failed to fetch data:", error);
      setProjects([]);
      setEngineers([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedDomain, searchQuery, transformProjects, transformEngineers]);

  // Handle data fetching with debounce and abort
  useEffect(() => {
    // Create new abort controller for this request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchData(signal);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery, activeTab, selectedDomain, fetchData]);

  // Initial load
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      fetchData(new AbortController().signal);
    }
  }, [fetchData]);

  // Scroll effect with RAF for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter functions with useMemo
  const filteredEngineers = useMemo(() => {
    if (!engineers.length) return [];
    
    let filtered = [...engineers];

    if (selectedSkills.length > 0) {
      filtered = filtered.filter(engineer =>
        selectedSkills.every(skill => 
          engineer.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    if (selectedRole) {
      filtered = filtered.filter(engineer => 
        engineer.role?.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    if (selectedExperience) {
      filtered = filtered.filter(engineer => 
        engineer.experience === selectedExperience
      );
    }

    return filtered;
  }, [engineers, selectedSkills, selectedRole, selectedExperience]);

  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];
    
    let filtered = [...projects];

    if (selectedDomain) {
      filtered = filtered.filter(project => 
        project.domain === selectedDomain
      );
    }

    if (selectedProjectStatus) {
      filtered = filtered.filter(project => 
        project.status === selectedProjectStatus
      );
    }

    if (selectedHasLiveDemo) {
      const hasLive = selectedHasLiveDemo === "Yes";
      filtered = filtered.filter(project => 
        project.hasLiveDemo === hasLive
      );
    }

    return filtered;
  }, [projects, selectedDomain, selectedProjectStatus, selectedHasLiveDemo]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSelectedSkills([]);
    setSelectedRole("");
    setSelectedExperience("");
    setSelectedDomain("");
    setSelectedProjectStatus("");
    setSelectedHasLiveDemo("");
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    clearFilters();
  }, [clearFilters]);

  // Handle skill selection
  const handleSkillToggle = useCallback((skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  }, []);

  // Handle category click
  const handleCategoryClick = useCallback((category) => {
    if (activeTab === "engineers") {
      setSelectedSkills([category]);
      setSearchQuery(category);
    } else {
      setSelectedDomain(category);
    }
  }, [activeTab]);

  if (loading && !engineers.length && !projects.length && initialLoadRef.current) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'var(--font-body)',
        color: 'var(--neutral-600)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🚀</div>
          <div>Loading directory...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Your existing styles remain exactly the same */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          /* 20% Blue, 40% Black, 50% White Color Scheme */
          --blue-20: #2563EB;
          --blue-dark: #1D4ED8;
          --blue-light: #3B82F6;
          --blue-soft: #60A5FA;
          --blue-mist: #EFF6FC;
          
          --black-40: #0A0A0A;
          --black-light: #1A1A1A;
          --black-soft: #2A2A2A;
          
          --white-50: #FFFFFF;
          --white-off: #FAFAFA;
          --white-soft: #F3F4F6;
          
          /* Neutral Colors */
          --neutral-50: #F9FAFB;
          --neutral-100: #F3F4F6;
          --neutral-200: #E5E7EB;
          --neutral-300: #D1D5DB;
          --neutral-400: #9CA3AF;
          --neutral-500: #6B7280;
          --neutral-600: #4B5563;
          --neutral-700: #374151;
          --neutral-800: #1F2937;
          
          /* Typography */
          --font-display: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Inter', sans-serif;
          
          /* Shadows */
          --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          
          /* Border Radius */
          --radius-sm: 6px;
          --radius-md: 8px;
          --radius-lg: 12px;
          --radius-xl: 16px;
          --radius-full: 9999px;
          
          /* Status Colors */
          --green-500: #10B981;
          --green-100: #D1FAE5;
          --green-700: #047857;
          --orange-500: #F59E0B;
        }

        body {
          font-family: var(--font-body);
          background: var(--white-50);
          color: var(--black-40);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 1rem 2rem;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .nav {
            padding: 1.25rem 4rem;
          }
        }

        .nav-scrolled {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--neutral-200);
          padding: 0.75rem 2rem;
        }

        @media (min-width: 768px) {
          .nav-scrolled {
            padding: 1rem 4rem;
          }
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--black-40);
          cursor: pointer;
          letter-spacing: -0.02em;
        }

        .nav-logo span {
          color: var(--blue-20);
        }

        .nav-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--neutral-600);
          font-size: 1.3rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: all 0.2s;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .icon-btn:hover {
          color: var(--blue-20);
          background: var(--neutral-100);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--blue-20);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-50);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .avatar:hover {
          background: var(--blue-dark);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* Global Search */
        .global-search-section {
          padding-top: 90px;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 2rem;
          padding-right: 2rem;
        }

        @media (min-width: 768px) {
          .global-search-section {
            padding-left: 4rem;
            padding-right: 4rem;
          }
        }

        .global-search-bar {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          margin-bottom: 1.5rem;
          font-family: var(--font-body);
          box-shadow: var(--shadow-sm);
        }

        .global-search-bar:focus {
          border-color: var(--blue-20);
          box-shadow: 0 0 0 4px var(--blue-mist);
        }

        /* Main Layout */
        .main-layout {
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 2rem;
          padding-right: 2rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .main-layout {
            grid-template-columns: 280px 1fr;
            padding-left: 4rem;
            padding-right: 4rem;
          }
        }

        /* Filters Sidebar */
        .filters-sidebar {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          height: fit-content;
        }

        .filters-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .filters-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--neutral-700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .clear-filters {
          color: var(--blue-20);
          font-size: 0.875rem;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s;
        }

        .clear-filters:hover {
          background: var(--blue-mist);
        }

        .filter-group {
          margin-bottom: 1.5rem;
        }

        .filter-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--neutral-700);
          margin-bottom: 1rem;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-chip {
          padding: 0.4rem 1rem;
          background: var(--neutral-100);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          color: var(--neutral-600);
          cursor: pointer;
          transition: all 0.2s;
        }

        .skill-chip:hover {
          background: var(--blue-mist);
          border-color: var(--blue-20);
          color: var(--blue-20);
        }

        .skill-chip.selected {
          background: var(--blue-20);
          border-color: var(--blue-20);
          color: var(--white-50);
        }

        .filter-select {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--neutral-700);
          outline: none;
          background: var(--white-50);
          cursor: pointer;
        }

        /* Mode Switch */
        .mode-switch {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: var(--neutral-100);
          padding: 0.25rem;
          border-radius: var(--radius-lg);
          width: fit-content;
        }

        .mode-btn {
          padding: 0.6rem 1.5rem;
          border: none;
          background: transparent;
          color: var(--neutral-600);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: var(--radius-md);
        }

        .mode-btn.active {
          background: var(--white-50);
          color: var(--blue-20);
          box-shadow: var(--shadow-sm);
        }

        /* Results Grid */
        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .results-count {
          color: var(--neutral-600);
          font-size: 0.9375rem;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Engineer Card */
        .engineer-card {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .engineer-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--blue-20);
        }

        .engineer-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .engineer-avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--blue-20);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-50);
          font-weight: 600;
          font-size: 1.125rem;
          overflow: hidden;
        }

        .engineer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .engineer-info h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .engineer-info p {
          color: var(--neutral-500);
          font-size: 0.875rem;
        }

        .engineer-bio {
          color: var(--neutral-600);
          font-size: 0.875rem;
          margin-bottom: 1rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .engineer-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .engineer-skill {
          background: var(--blue-mist);
          color: var(--blue-20);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .engineer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--neutral-500);
          padding-top: 1rem;
          border-top: 1px solid var(--neutral-200);
        }

        .engineer-college {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .engineer-projects {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .availability-badge {
          background: var(--green-100);
          color: var(--green-700);
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        /* Project Card */
        .project-card {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--blue-20);
        }

        .project-thumbnail {
          height: 160px;
          background-size: cover;
          background-position: center;
          background-color: var(--neutral-200);
        }

        .project-content {
          padding: 1.25rem;
        }

        .project-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .project-creator-avatar {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-full);
          background: var(--blue-20);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-50);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .project-creator {
          font-size: 0.875rem;
          color: var(--neutral-600);
        }

        .project-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .project-description {
          font-size: 0.875rem;
          color: var(--neutral-600);
          margin-bottom: 1rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .project-tech-tag {
          background: var(--neutral-100);
          color: var(--neutral-600);
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .project-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--neutral-500);
          padding-top: 0.75rem;
          border-top: 1px solid var(--neutral-200);
        }

        .project-status {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--green-500);
        }

        .status-dot.ongoing {
          background: var(--orange-500);
        }

        .project-stats {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .explore-categories {
          margin-top: 3rem;
          padding: 2rem 0;
          border-top: 1px solid var(--neutral-200);
        }

        .categories-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--neutral-700);
          margin-bottom: 1.5rem;
        }

        .categories-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .category-item {
          padding: 0.5rem 1.5rem;
          background: var(--neutral-100);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: var(--neutral-600);
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-item:hover {
          background: var(--blue-20);
          color: var(--white-50);
          transform: translateY(-2px);
        }

        /* Footer */
        .footer {
          background: var(--black-40);
          color: var(--white-50);
          padding: 4rem 2rem 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-tagline {
          text-align: center;
          color: var(--neutral-500);
          font-size: 0.875rem;
        }

        .loading-skeleton {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .featured-badge {
          background: var(--orange-500);
          color: var(--white-50);
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-left: 0.5rem;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")}>
            tech<span>foliyo</span>
          </div>
          <div className="nav-right">
            <button className="icon-btn" onClick={() => navigate("/messages")} aria-label="Messages">✉</button>
            <button className="icon-btn" onClick={() => navigate("/notifications")} aria-label="Notifications">🔔</button>
            <div 
              className="avatar" 
              onClick={() => navigate("/profile")}
              aria-label="Profile"
            >
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.username} />
              ) : (
                user?.username?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search */}
      <div className="global-search-section">
        <input
          type="text"
          className="global-search-bar"
          placeholder={`Search ${activeTab === "engineers" ? "engineers by name, skills, or college..." : "projects by title, tech stack, or creator..."}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
        />
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          {activeTab === "engineers" ? (
            <>
              {/* Skills Filter */}
              <div className="filter-group">
                <div className="filter-label">Skills</div>
                <div className="skills-container">
                  {popularSkills.map(skill => (
                    <span
                      key={skill}
                      className={`skill-chip ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role Filter */}
              <div className="filter-group">
                <div className="filter-label">Role</div>
                <select 
                  className="filter-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  aria-label="Filter by role"
                >
                  <option value="">All Roles</option>
                  <option value="Frontend">Frontend Developer</option>
                  <option value="Backend">Backend Engineer</option>
                  <option value="Full Stack">Full Stack Developer</option>
                  <option value="ML">AI/ML Engineer</option>
                  <option value="Mobile">Mobile Developer</option>
                  <option value="Data">Data Scientist</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="filter-group">
                <div className="filter-label">Experience</div>
                <select 
                  className="filter-select"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  aria-label="Filter by experience"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Project Filters */}
              <div className="filter-group">
                <div className="filter-label">Domain</div>
                <select 
                  className="filter-select"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  aria-label="Filter by domain"
                >
                  <option value="">All Domains</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <div className="filter-label">Status</div>
                <select 
                  className="filter-select"
                  value={selectedProjectStatus}
                  onChange={(e) => setSelectedProjectStatus(e.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="">All Projects</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>

              <div className="filter-group">
                <div className="filter-label">Has Live Demo</div>
                <select 
                  className="filter-select"
                  value={selectedHasLiveDemo}
                  onChange={(e) => setSelectedHasLiveDemo(e.target.value)}
                  aria-label="Filter by live demo"
                >
                  <option value="">Any</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main>
          {/* Mode Switch */}
          <div className="mode-switch">
            <button
              className={`mode-btn ${activeTab === "engineers" ? "active" : ""}`}
              onClick={() => handleTabChange("engineers")}
            >
              👨‍💻 Explore Engineers
            </button>
            <button
              className={`mode-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => handleTabChange("projects")}
            >
              🚀 Explore Projects
            </button>
          </div>

          {/* Results Header */}
          <div className="results-header">
            <span className="results-count">
              {loading ? (
                "Loading..."
              ) : (
                activeTab === "engineers" 
                  ? `${filteredEngineers.length} engineer${filteredEngineers.length !== 1 ? 's' : ''} found` 
                  : `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`
              )}
            </span>
          </div>

          {/* Results Grid */}
          <div className="results-grid">
            {loading ? (
              // Loading skeletons
              Array(6).fill(0).map((_, i) => (
                <div key={i} className={`${activeTab === "engineers" ? 'engineer-card' : 'project-card'} loading-skeleton`}>
                  {activeTab === "engineers" ? (
                    <>
                      <div className="engineer-header">
                        <div className="engineer-avatar" style={{ background: 'var(--neutral-300)' }}></div>
                        <div className="engineer-info">
                          <h4 style={{ height: '1.5rem', width: '120px', background: 'var(--neutral-300)', borderRadius: 'var(--radius-sm)' }}></h4>
                          <p style={{ height: '1rem', width: '80px', background: 'var(--neutral-200)', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem' }}></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="project-thumbnail" style={{ background: 'var(--neutral-300)' }}></div>
                      <div className="project-content">
                        <div style={{ height: '1.25rem', width: '60%', background: 'var(--neutral-300)', borderRadius: 'var(--radius-sm)' }}></div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              activeTab === "engineers" ? (
                filteredEngineers.length > 0 ? (
                  filteredEngineers.map(engineer => (
                    <div 
                      key={engineer.id} 
                      className="engineer-card"
                      onClick={() => navigate(`/profile/${engineer.id}`)}
                    >
                      <div className="engineer-header">
                        <div className="engineer-avatar">
                          {engineer.profileImage ? (
                            <img src={engineer.profileImage} alt={engineer.name} />
                          ) : (
                            engineer.avatar
                          )}
                        </div>
                        <div className="engineer-info">
                          <h4>{engineer.name}</h4>
                          <p>{engineer.role}</p>
                        </div>
                      </div>
                      <p className="engineer-bio">{engineer.bio}</p>
                      <div className="engineer-skills">
                        {engineer.skills.slice(0, 4).map(skill => (
                          <span key={skill} className="engineer-skill">{skill}</span>
                        ))}
                        {engineer.skills.length > 4 && (
                          <span className="engineer-skill">+{engineer.skills.length - 4}</span>
                        )}
                      </div>
                      <div className="engineer-meta">
                        <span className="engineer-college">🎓 {engineer.college}</span>
                        <span className="engineer-projects">📁 {engineer.projectsCount} projects</span>
                      </div>
                      {engineer.availability && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <span className="availability-badge">{engineer.availability}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--neutral-500)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>No engineers found</h3>
                    <p>Try adjusting your filters or search query</p>
                  </div>
                )
              ) : (
                filteredProjects.length > 0 ? (
                  filteredProjects.map(project => (
                    <div 
                      key={project.id} 
                      className="project-card"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <div 
                        className="project-thumbnail"
                        style={{ backgroundImage: `url(${project.thumbnail})` }}
                      />
                      <div className="project-content">
                        <div className="project-header">
                          <div className="project-creator-avatar">{project.creatorAvatar}</div>
                          <span className="project-creator">{project.creator}</span>
                          {project.featured && (
                            <span className="featured-badge">✨ Featured</span>
                          )}
                        </div>
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.techStack?.slice(0, 3).map(tech => (
                            <span key={tech} className="project-tech-tag">{tech}</span>
                          ))}
                          {project.techStack?.length > 3 && (
                            <span className="project-tech-tag">+{project.techStack.length - 3}</span>
                          )}
                        </div>
                        <div className="project-meta">
                          <span className="project-status">
                            <span className={`status-dot ${project.status === 'Ongoing' ? 'ongoing' : ''}`}></span>
                            {project.status}
                          </span>
                          <span className="project-stats">
                            {project.hasLiveDemo && "🌐 "}
                            {project.hasGitHub && "⌨️ "}
                            👁 {project.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--neutral-500)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>No projects found</h3>
                    <p>Try adjusting your filters or search query</p>
                  </div>
                )
              )
            )}
          </div>

          {/* Explore Categories (shown when no search and not loading) */}
          {!searchQuery && !loading && (
            <div className="explore-categories">
              <div className="categories-title">
                {activeTab === "engineers" ? "Popular Skills to Explore" : "Popular Domains to Explore"}
              </div>
              <div className="categories-grid">
                {activeTab === "engineers" ? (
                  popularSkills.map(skill => (
                    <span 
                      key={skill} 
                      className="category-item"
                      onClick={() => handleCategoryClick(skill)}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  domains.map(domain => (
                    <span 
                      key={domain} 
                      className="category-item"
                      onClick={() => handleCategoryClick(domain)}
                    >
                      {domain}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-tagline">
            Built for people who build things. © {new Date().getFullYear()} techfoliyo
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;