import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

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

  // User data state
  const [userData, setUserData] = useState({
    name: "Alex Rivera",
    headline: "Senior Full Stack Engineer & Open Source Contributor",
    location: "San Francisco, CA",
    email: "alex.rivera@email.com",
    connections: "1.2k",
    followers: "3.8k",
    about: "Passionate about building scalable distributed systems and improving Developer Experience (DX). Over 8 years of experience in full-stack development with a focus on performance and maintainability. I enjoy bridging the gap between complex backend architectures and intuitive frontend interfaces.",
    
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 95 },
      { name: "Node.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Go", level: 75 },
      { name: "Kubernetes", level: 70 },
      { name: "AWS", level: 80 },
      { name: "GraphQL", level: 82 }
    ],
    
    experience: [
      {
        id: 1,
        title: "Lead Developer",
        period: "2021 - PRESENT",
        company: "Vercel",
        description: "Leading the edge runtime optimization team, improving cold start times by 40% across global regions.",
        tech: ["Next.js", "Rust", "TypeScript"]
      }
    ],
    
    education: [
      {
        id: 1,
        degree: "M.S. in Computer Science",
        school: "Stanford University",
        period: "2016 - 2018"
      },
      {
        id: 2,
        degree: "B.S. in Software Engineering",
        school: "UC Berkeley",
        period: "2012 - 2016"
      }
    ],
    
    social: [
      { platform: "GitHub", handle: "@alexrivera", url: "#" },
      { platform: "LinkedIn", handle: "in/alexrivera", url: "#" },
      { platform: "Twitter", handle: "@alexrivera", url: "#" },
      { platform: "Website", handle: "alexrivera.dev", url: "#" }
    ],
    
    portfolio: [
      {
        id: 1,
        title: "Supra Analytics",
        description: "Real-time analytics engine for high-traffic SaaS platforms with sub-second latency.",
        tech: ["React", "Node.js", "Redis", "AWS"],
        stats: "284",
        views: "1.2k"
      },
      {
        id: 2,
        title: "OpenDeploy CLI",
        description: "Universal deployment tool for containerized applications across any cloud provider.",
        tech: ["Go", "Docker", "Kubernetes", "Terraform"],
        stats: "156",
        views: "890"
      },
      {
        id: 3,
        title: "DevFlow",
        description: "Developer workflow automation platform with CI/CD pipeline optimization.",
        tech: ["TypeScript", "Node.js", "GitHub Actions"],
        stats: "342",
        views: "2.1k"
      },
      {
        id: 4,
        title: "CloudCost Optimizer",
        description: "AI-powered cloud cost optimization tool that reduces AWS spend by up to 35%.",
        tech: ["Python", "AWS", "TensorFlow", "React"],
        stats: "198",
        views: "1.5k"
      }
    ]
  });

  // Edit form state for all sections
  const [editForm, setEditForm] = useState({
    name: userData.name,
    headline: userData.headline,
    location: userData.location,
    email: userData.email,
    about: userData.about,
    skills: [...userData.skills],
    experience: JSON.parse(JSON.stringify(userData.experience)),
    education: JSON.parse(JSON.stringify(userData.education)),
    social: [...userData.social],
    portfolio: JSON.parse(JSON.stringify(userData.portfolio))
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...editForm.skills];
    updatedSkills[index][field] = value;
    setEditForm({ ...editForm, skills: updatedSkills });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...editForm.experience];
    updatedExp[index][field] = value;
    setEditForm({ ...editForm, experience: updatedExp });
  };

  const handleExperienceTechChange = (expIndex, techIndex, value) => {
    const updatedExp = [...editForm.experience];
    updatedExp[expIndex].tech[techIndex] = value;
    setEditForm({ ...editForm, experience: updatedExp });
  };

  const addExperienceTech = (expIndex) => {
    const updatedExp = [...editForm.experience];
    updatedExp[expIndex].tech.push("New Tech");
    setEditForm({ ...editForm, experience: updatedExp });
  };

  const removeExperienceTech = (expIndex, techIndex) => {
    const updatedExp = [...editForm.experience];
    updatedExp[expIndex].tech.splice(techIndex, 1);
    setEditForm({ ...editForm, experience: updatedExp });
  };

  const addExperience = () => {
    setEditForm({
      ...editForm,
      experience: [
        ...editForm.experience,
        {
          id: Date.now(),
          title: "New Position",
          period: "2024 - PRESENT",
          company: "Company Name",
          description: "Description of your role",
          tech: ["Tech1", "Tech2"]
        }
      ]
    });
  };

  const removeExperience = (index) => {
    const updatedExp = editForm.experience.filter((_, i) => i !== index);
    setEditForm({ ...editForm, experience: updatedExp });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEdu = [...editForm.education];
    updatedEdu[index][field] = value;
    setEditForm({ ...editForm, education: updatedEdu });
  };

  const addEducation = () => {
    setEditForm({
      ...editForm,
      education: [
        ...editForm.education,
        {
          id: Date.now(),
          degree: "New Degree",
          school: "School Name",
          period: "Year - Year"
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const updatedEdu = editForm.education.filter((_, i) => i !== index);
    setEditForm({ ...editForm, education: updatedEdu });
  };

  const handleSocialChange = (index, field, value) => {
    const updatedSocial = [...editForm.social];
    updatedSocial[index][field] = value;
    setEditForm({ ...editForm, social: updatedSocial });
  };

  const handlePortfolioChange = (index, field, value) => {
    const updatedPortfolio = [...editForm.portfolio];
    updatedPortfolio[index][field] = value;
    setEditForm({ ...editForm, portfolio: updatedPortfolio });
  };

  const handlePortfolioTechChange = (portIndex, techIndex, value) => {
    const updatedPortfolio = [...editForm.portfolio];
    updatedPortfolio[portIndex].tech[techIndex] = value;
    setEditForm({ ...editForm, portfolio: updatedPortfolio });
  };

  const addPortfolioTech = (portIndex) => {
    const updatedPortfolio = [...editForm.portfolio];
    updatedPortfolio[portIndex].tech.push("New Tech");
    setEditForm({ ...editForm, portfolio: updatedPortfolio });
  };

  const removePortfolioTech = (portIndex, techIndex) => {
    const updatedPortfolio = [...editForm.portfolio];
    updatedPortfolio[portIndex].tech.splice(techIndex, 1);
    setEditForm({ ...editForm, portfolio: updatedPortfolio });
  };

  const handleSave = () => {
    setUserData({
      name: editForm.name,
      headline: editForm.headline,
      location: editForm.location,
      email: editForm.email,
      about: editForm.about,
      skills: editForm.skills,
      experience: editForm.experience,
      education: editForm.education,
      social: editForm.social,
      portfolio: editForm.portfolio
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: userData.name,
      headline: userData.headline,
      location: userData.location,
      email: userData.email,
      about: userData.about,
      skills: [...userData.skills],
      experience: JSON.parse(JSON.stringify(userData.experience)),
      education: JSON.parse(JSON.stringify(userData.education)),
      social: [...userData.social],
      portfolio: JSON.parse(JSON.stringify(userData.portfolio))
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --blue-20: #2563EB;
          --blue-dark: #1D4ED8;
          --blue-light: #3B82F6;
          --blue-soft: #60A5FA;
          --blue-mist: #EFF6FF;
          
          --black-40: #0A0A0A;
          --black-light: #1A1A1A;
          --black-soft: #2A2A2A;
          
          --white-50: #FFFFFF;
          --white-off: #FAFAFA;
          --white-soft: #F3F4F6;
          
          --neutral-50: #F9FAFB;
          --neutral-100: #F3F4F6;
          --neutral-200: #E5E7EB;
          --neutral-300: #D1D5DB;
          --neutral-400: #9CA3AF;
          --neutral-500: #6B7280;
          --neutral-600: #4B5563;
          --neutral-700: #374151;
          --neutral-800: #1F2937;
          
          --font-display: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Inter', sans-serif;
          
          --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }

        body {
          font-family: var(--font-body);
          background: var(--white-50);
          color: var(--black-40);
          line-height: 1.5;
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
          background: var(--white-50);
          border-bottom: 1px solid var(--neutral-200);
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
          max-width: 1280px;
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
        }

        .nav-logo span {
          color: var(--blue-20);
        }

        .nav-right {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-icon {
          color: var(--neutral-500);
          cursor: pointer;
          font-size: 1.3rem;
        }

        .avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--blue-20);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-50);
          font-weight: 600;
          cursor: pointer;
        }

        /* Square Black Logout Button */
        .btn-logout {
          padding: 0.5rem 1.2rem;
          background: var(--black-40);
          border: none;
          border-radius: 0;
          color: var(--white-50);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: var(--black-light);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* Main Content */
        .main-content {
          padding-top: 100px;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: 2rem;
          padding-right: 2rem;
          padding-bottom: 3rem;
        }

        /* Profile Header */
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          background: var(--white-50);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--neutral-200);
          box-shadow: var(--shadow-sm);
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--black-40);
          margin-bottom: 0.5rem;
        }

        .profile-headline {
          font-size: 1.1rem;
          color: var(--neutral-600);
          margin-bottom: 0.75rem;
        }

        .profile-meta {
          display: flex;
          gap: 2rem;
          color: var(--neutral-500);
          font-size: 0.9rem;
        }

        .profile-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .profile-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-edit {
          padding: 0.75rem 2rem;
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: 8px;
          color: var(--neutral-600);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-edit:hover {
          background: var(--neutral-50);
          border-color: var(--blue-20);
          color: var(--blue-20);
        }

        .btn-save {
          padding: 0.75rem 2rem;
          background: var(--blue-20);
          border: none;
          border-radius: 8px;
          color: var(--white-50);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-save:hover {
          background: var(--blue-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-cancel {
          padding: 0.75rem 2rem;
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: 8px;
          color: var(--neutral-600);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: var(--neutral-100);
          border-color: var(--neutral-400);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s;
        }

        .stat-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-md);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--blue-mist);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-20);
          font-size: 1.2rem;
          font-weight: 600;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--black-40);
          line-height: 1.2;
        }

        .stat-label {
          color: var(--neutral-500);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--neutral-200);
          padding-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          color: var(--neutral-600);
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab:hover {
          color: var(--blue-20);
          background: var(--neutral-100);
        }

        .tab.active {
          background: var(--blue-20);
          color: var(--white-50);
        }

        .tab.active:hover {
          background: var(--blue-dark);
          color: var(--white-50);
        }

        /* Cards */
        .card {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--black-40);
          margin-bottom: 1.5rem;
          border-bottom: 2px solid var(--blue-20);
          padding-bottom: 0.75rem;
          display: inline-block;
        }

        /* Form Elements */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--neutral-700);
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--neutral-200);
          border-radius: 8px;
          font-size: 0.95rem;
          background: var(--white-50);
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--blue-20);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* Edit Section */
        .edit-section {
          margin-top: 2rem;
        }

        .edit-item {
          background: var(--neutral-50);
          border: 1px solid var(--neutral-200);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .edit-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .edit-item-title {
          font-weight: 600;
          color: var(--blue-20);
        }

        .remove-btn {
          background: none;
          border: 1px solid var(--neutral-300);
          border-radius: 4px;
          padding: 0.25rem 0.75rem;
          color: var(--neutral-500);
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }

        .remove-btn:hover {
          background: var(--neutral-200);
          color: var(--neutral-700);
        }

        .add-btn {
          background: var(--white-50);
          border: 1px solid var(--blue-20);
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          color: var(--blue-20);
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.2s;
        }

        .add-btn:hover {
          background: var(--blue-20);
          color: var(--white-50);
        }

        .tech-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .tech-tag {
          background: var(--blue-mist);
          color: var(--blue-20);
          padding: 0.25rem 1rem;
          border-radius: 4px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tech-tag-remove {
          color: var(--neutral-500);
          cursor: pointer;
          font-size: 1rem;
          transition: color 0.2s;
        }

        .tech-tag-remove:hover {
          color: var(--red-500);
        }

        .add-tech-btn {
          background: none;
          border: 1px dashed var(--neutral-300);
          border-radius: 4px;
          padding: 0.25rem 1rem;
          color: var(--neutral-500);
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .add-tech-btn:hover {
          border-color: var(--blue-20);
          color: var(--blue-20);
        }

        /* About */
        .about-text {
          color: var(--neutral-600);
          line-height: 1.8;
          font-size: 0.95rem;
        }

        /* Skills */
        .skills-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skill-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .skill-name {
          width: 100px;
          font-weight: 600;
          color: var(--black-40);
        }

        .skill-bar {
          flex: 1;
          height: 8px;
          background: var(--neutral-100);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          background: var(--blue-20);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .skill-percent {
          width: 45px;
          color: var(--neutral-500);
          font-size: 0.9rem;
        }

        /* Experience */
        .exp-item {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--neutral-200);
        }

        .exp-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .exp-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--black-40);
        }

        .exp-period {
          background: var(--blue-mist);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          color: var(--blue-20);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .exp-company {
          color: var(--neutral-600);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .exp-description {
          color: var(--neutral-600);
          line-height: 1.6;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .exp-tech {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .exp-tech-tag {
          background: var(--neutral-100);
          color: var(--neutral-600);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        /* Education */
        .edu-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--neutral-200);
        }

        .edu-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .edu-degree {
          font-size: 1rem;
          font-weight: 700;
          color: var(--black-40);
          margin-bottom: 0.25rem;
        }

        .edu-school {
          color: var(--neutral-600);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .edu-period {
          color: var(--neutral-500);
          font-size: 0.85rem;
        }

        /* Portfolio Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .portfolio-item {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .portfolio-item:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .portfolio-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--black-40);
          margin-bottom: 0.5rem;
        }

        .portfolio-desc {
          color: var(--neutral-600);
          font-size: 0.85rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .portfolio-tech {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .portfolio-tech-tag {
          background: var(--blue-mist);
          color: var(--blue-20);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .portfolio-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--neutral-200);
          padding-top: 1rem;
        }

        .portfolio-stats {
          display: flex;
          gap: 1rem;
          color: var(--neutral-500);
          font-size: 0.8rem;
        }

        .portfolio-link {
          color: var(--blue-20);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          transition: color 0.2s;
        }

        .portfolio-link:hover {
          color: var(--blue-dark);
          text-decoration: underline;
        }

        /* Social Links */
        .social-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .social-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--neutral-50);
          border-radius: 8px;
          border: 1px solid var(--neutral-200);
          transition: all 0.2s;
        }

        .social-item:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-sm);
        }

        .social-platform {
          font-weight: 700;
          color: var(--black-40);
          font-size: 0.9rem;
        }

        .social-handle {
          color: var(--neutral-500);
          font-size: 0.8rem;
        }

        /* Footer */
        .footer {
          background: var(--black-40);
          color: var(--white-50);
          padding: 4rem 2rem 2rem;
          margin-top: 4rem;
        }

        @media (min-width: 768px) {
          .footer {
            padding: 4rem 4rem 2rem;
          }
        }

        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr repeat(4, 1fr);
            gap: 3rem;
          }
        }

        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--white-50);
        }

        .footer-logo span {
          color: var(--blue-20);
        }

        .footer-desc {
          color: var(--neutral-400);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 300px;
        }

        .footer-social {
          display: flex;
          gap: 1.5rem;
        }

        .social-link {
          color: var(--neutral-400);
          font-size: 0.875rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .social-link:hover {
          color: var(--blue-20);
        }

        .footer-col h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: var(--white-50);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-link {
          display: block;
          color: var(--neutral-400);
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: var(--blue-20);
        }

        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid var(--neutral-800);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--neutral-400);
          font-size: 0.8125rem;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }

        .footer-bottom-links span {
          cursor: pointer;
          transition: color 0.2s;
        }

        .footer-bottom-links span:hover {
          color: var(--blue-20);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .portfolio-grid,
          .form-row,
          .social-grid {
            grid-template-columns: 1fr;
          }
          
          .profile-header {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .profile-actions {
            width: 100%;
            justify-content: flex-start;
          }
          
          .tabs {
            flex-wrap: wrap;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: var(--neutral-100);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--neutral-400);
          border-radius: var(--radius-full);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--blue-20);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")}>
            tech<span>folio</span>
          </div>
          <div className="nav-right">
            <span className="nav-icon">✉</span>
            <span className="nav-icon">🔔</span>
            <div className="avatar-small" onClick={() => navigate("/profile")}>AR</div>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1 className="profile-name">{userData.name}</h1>
                <div className="profile-headline">{userData.headline}</div>
                <div className="profile-meta">
                  <span className="profile-meta-item">📍 {userData.location}</span>
                  <span className="profile-meta-item">✉ {userData.email}</span>
                </div>
              </>
            ) : (
              <div className="edit-section">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
                </div>
                <div className="form-group">
                  <label>Headline</label>
                  <input type="text" name="headline" value={editForm.headline} onChange={handleEditChange} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={editForm.location} onChange={handleEditChange} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={editForm.email} onChange={handleEditChange} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
            ) : (
              <>
                <button className="btn-save" onClick={handleSave}>Save Changes</button>
                <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <span className="stat-value">{userData.connections}</span>
              <span className="stat-label">CONNECTIONS</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-value">{userData.followers}</span>
              <span className="stat-label">FOLLOWERS</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</div>
          <div className={`tab ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</div>
          <div className={`tab ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</div>
          <div className={`tab ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</div>
          <div className={`tab ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>Portfolio</div>
          <div className={`tab ${activeTab === 'social' ? 'active' : ''}`} onClick={() => setActiveTab('social')}>Social</div>
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="card">
            <h2 className="card-title">About Me</h2>
            {!isEditing ? (
              <p className="about-text">{userData.about}</p>
            ) : (
              <div className="form-group">
                <textarea 
                  name="about" 
                  rows="6" 
                  value={editForm.about} 
                  onChange={handleEditChange}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="card">
            <h2 className="card-title">Skills & Expertise</h2>
            {!isEditing ? (
              <div className="skills-container">
                {userData.skills.map((skill, index) => (
                  <div key={index} className="skill-row">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="edit-section">
                {editForm.skills.map((skill, index) => (
                  <div key={index} className="skill-row" style={{ marginBottom: '1rem' }}>
                    <input 
                      type="text" 
                      value={skill.name} 
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      style={{ width: '100px', padding: '0.5rem', marginRight: '1rem' }}
                    />
                    <input 
                      type="number" 
                      value={skill.level} 
                      onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                      style={{ width: '60px', padding: '0.5rem' }}
                      min="0"
                      max="100"
                    />
                    <span>%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="card">
            <h2 className="card-title">Work Experience</h2>
            {!isEditing ? (
              <>
                {userData.experience.map((exp, index) => (
                  <div key={index} className="exp-item">
                    <div className="exp-header">
                      <span className="exp-title">{exp.title}</span>
                      <span className="exp-period">{exp.period}</span>
                    </div>
                    <div className="exp-company">{exp.company}</div>
                    <p className="exp-description">{exp.description}</p>
                    <div className="exp-tech">
                      {exp.tech.map((t, i) => (
                        <span key={i} className="exp-tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="edit-section">
                {editForm.experience.map((exp, expIndex) => (
                  <div key={expIndex} className="edit-item">
                    <div className="edit-item-header">
                      <span className="edit-item-title">Experience {expIndex + 1}</span>
                      <button className="remove-btn" onClick={() => removeExperience(expIndex)}>Remove</button>
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        value={exp.title} 
                        onChange={(e) => handleExperienceChange(expIndex, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Period</label>
                      <input 
                        type="text" 
                        value={exp.period} 
                        onChange={(e) => handleExperienceChange(expIndex, 'period', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        value={exp.description} 
                        onChange={(e) => handleExperienceChange(expIndex, 'description', e.target.value)}
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Technologies</label>
                      <div className="tech-tags-container">
                        {exp.tech.map((tech, techIndex) => (
                          <div key={techIndex} className="tech-tag">
                            <input 
                              type="text" 
                              value={tech} 
                              onChange={(e) => handleExperienceTechChange(expIndex, techIndex, e.target.value)}
                              style={{ width: 'auto', border: 'none', background: 'transparent', padding: 0 }}
                            />
                            <span className="tech-tag-remove" onClick={() => removeExperienceTech(expIndex, techIndex)}>×</span>
                          </div>
                        ))}
                        <button className="add-tech-btn" onClick={() => addExperienceTech(expIndex)}>+ Add Tech</button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="add-btn" onClick={addExperience}>+ Add Experience</button>
              </div>
            )}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="card">
            <h2 className="card-title">Education</h2>
            {!isEditing ? (
              <>
                {userData.education.map((edu, index) => (
                  <div key={index} className="edu-item">
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-school">{edu.school}</div>
                    <div className="edu-period">{edu.period}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="edit-section">
                {editForm.education.map((edu, eduIndex) => (
                  <div key={eduIndex} className="edit-item">
                    <div className="edit-item-header">
                      <span className="edit-item-title">Education {eduIndex + 1}</span>
                      <button className="remove-btn" onClick={() => removeEducation(eduIndex)}>Remove</button>
                    </div>
                    <div className="form-group">
                      <label>Degree</label>
                      <input 
                        type="text" 
                        value={edu.degree} 
                        onChange={(e) => handleEducationChange(eduIndex, 'degree', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>School</label>
                      <input 
                        type="text" 
                        value={edu.school} 
                        onChange={(e) => handleEducationChange(eduIndex, 'school', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Period</label>
                      <input 
                        type="text" 
                        value={edu.period} 
                        onChange={(e) => handleEducationChange(eduIndex, 'period', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <button className="add-btn" onClick={addEducation}>+ Add Education</button>
              </div>
            )}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="card">
            <h2 className="card-title">Portfolio</h2>
            {!isEditing ? (
              <div className="portfolio-grid">
                {userData.portfolio.map((project, index) => (
                  <div key={index} className="portfolio-item">
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-desc">{project.description}</p>
                    <div className="portfolio-tech">
                      {project.tech.map((t, i) => (
                        <span key={i} className="portfolio-tech-tag">{t}</span>
                      ))}
                    </div>
                    <div className="portfolio-footer">
                      <div className="portfolio-stats">
                        <span>👁 {project.stats}</span>
                        <span>❤️ {project.views}</span>
                      </div>
                      <a href="#" className="portfolio-link">View Project →</a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="edit-section">
                {editForm.portfolio.map((project, portIndex) => (
                  <div key={portIndex} className="edit-item">
                    <div className="edit-item-header">
                      <span className="edit-item-title">Project {portIndex + 1}</span>
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        value={project.title} 
                        onChange={(e) => handlePortfolioChange(portIndex, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        value={project.description} 
                        onChange={(e) => handlePortfolioChange(portIndex, 'description', e.target.value)}
                        rows="2"
                      />
                    </div>
                    <div className="form-group">
                      <label>Technologies</label>
                      <div className="tech-tags-container">
                        {project.tech.map((tech, techIndex) => (
                          <div key={techIndex} className="tech-tag">
                            <input 
                              type="text" 
                              value={tech} 
                              onChange={(e) => handlePortfolioTechChange(portIndex, techIndex, e.target.value)}
                              style={{ width: 'auto', border: 'none', background: 'transparent', padding: 0 }}
                            />
                            <span className="tech-tag-remove" onClick={() => removePortfolioTech(portIndex, techIndex)}>×</span>
                          </div>
                        ))}
                        <button className="add-tech-btn" onClick={() => addPortfolioTech(portIndex)}>+ Add Tech</button>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Stats (Views)</label>
                        <input 
                          type="text" 
                          value={project.stats} 
                          onChange={(e) => handlePortfolioChange(portIndex, 'stats', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Likes</label>
                        <input 
                          type="text" 
                          value={project.views} 
                          onChange={(e) => handlePortfolioChange(portIndex, 'views', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="card">
            <h2 className="card-title">Social Links</h2>
            {!isEditing ? (
              <div className="social-grid">
                {userData.social.map((item, index) => (
                  <div key={index} className="social-item">
                    <div>
                      <div className="social-platform">{item.platform}</div>
                      <div className="social-handle">{item.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="edit-section">
                {editForm.social.map((item, index) => (
                  <div key={index} className="form-row" style={{ marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label>Platform</label>
                      <input 
                        type="text" 
                        value={item.platform} 
                        onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Handle</label>
                      <input 
                        type="text" 
                        value={item.handle} 
                        onChange={(e) => handleSocialChange(index, 'handle', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">tech<span>folio</span></div>
            <p className="footer-desc">
              Building bridges between engineers and recruiters through live project demonstrations.
            </p>
            <div className="footer-social">
              <span className="social-link">𝕏 Twitter</span>
              <span className="social-link">⌨️ GitHub</span>
              <span className="social-link">💼 LinkedIn</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <span className="footer-link">Features</span>
            <span className="footer-link">For Whom</span>
            <span className="footer-link">Pricing</span>
          </div>
          <div className="footer-col">
            <h4>Students</h4>
            <span className="footer-link">Create Portfolio</span>
            <span className="footer-link">Login</span>
            <span className="footer-link">Browse Projects</span>
          </div>
          <div className="footer-col">
            <h4>Recruiters</h4>
            <span className="footer-link">How It Works</span>
            <span className="footer-link">Search Candidates</span>
            <span className="footer-link">Contact Sales</span>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <span className="footer-link">About</span>
            <span className="footer-link">Contact</span>
            <span className="footer-link">Privacy</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Techfolio. All rights reserved.</span>
          <div className="footer-bottom-links">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Profile;