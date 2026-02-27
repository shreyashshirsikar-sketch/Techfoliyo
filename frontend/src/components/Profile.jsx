import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  // User data state
  const [userData, setUserData] = useState({
    name: "Alex Rivera",
    headline: "Senior Full Stack Engineer & Open Source Contributor",
    location: "San Francisco, CA",
    email: "alex.rivera@email.com",
    connections: "1.2k",
    projects: "45",
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
        title: "Lead Developer",
        period: "2021 - PRESENT",
        company: "Vercel",
        description: "Leading the edge runtime optimization team, improving cold start times by 40% across global regions.",
        tech: ["Next.js", "Rust", "TypeScript"]
      }
    ],
    
    education: [
      {
        degree: "M.S. in Computer Science",
        school: "Stanford University",
        period: "2016 - 2018"
      },
      {
        degree: "B.S. in Software Engineering",
        school: "UC Berkeley",
        period: "2012 - 2016"
      }
    ],
    
    social: [
      { platform: "GitHub", handle: "@alexrivera", url: "#", icon: "📦" },
      { platform: "LinkedIn", handle: "in/alexrivera", url: "#", icon: "🔗" },
      { platform: "Twitter", handle: "@alexrivera", url: "#", icon: "🐦" },
      { platform: "Website", handle: "alexrivera.dev", url: "#", icon: "🌐" }
    ],
    
    portfolio: [
      {
        title: "Supra Analytics",
        description: "Real-time analytics engine for high-traffic SaaS platforms with sub-second latency.",
        tech: ["React", "Node.js", "Redis", "AWS"],
        stats: "284",
        views: "1.2k",
        color: "#2563EB"
      },
      {
        title: "OpenDeploy CLI",
        description: "Universal deployment tool for containerized applications across any cloud provider.",
        tech: ["Go", "Docker", "Kubernetes", "Terraform"],
        stats: "156",
        views: "890",
        color: "#0A0A0A"
      },
      {
        title: "DevFlow",
        description: "Developer workflow automation platform with CI/CD pipeline optimization.",
        tech: ["TypeScript", "Node.js", "GitHub Actions"],
        stats: "342",
        views: "2.1k",
        color: "#2563EB"
      },
      {
        title: "CloudCost Optimizer",
        description: "AI-powered cloud cost optimization tool that reduces AWS spend by up to 35%.",
        tech: ["Python", "AWS", "TensorFlow", "React"],
        stats: "198",
        views: "1.5k",
        color: "#0A0A0A"
      }
    ]
  });

  // Edit form state
  const [editForm, setEditForm] = useState({ ...userData });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = () => {
    setUserData({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...userData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Clear any auth tokens/user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Navigate to landing page
    navigate("/");
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#FFFFFF",
      minHeight: "100vh"
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          /* 20% Blue, 40% Black, 50% White Color Scheme */
          :root {
            --blue: #2563EB;
            --blue-light: #EFF6FF;
            --blue-dark: #1D4ED8;
            
            --black: #0A0A0A;
            --black-light: #1A1A1A;
            --black-soft: #2A2A2A;
            
            --white: #FFFFFF;
            --white-off: #F8FAFC;
            
            --gray-50: #F9FAFB;
            --gray-100: #F3F4F6;
            --gray-200: #E5E7EB;
            --gray-300: #D1D5DB;
            --gray-400: #9CA3AF;
            --gray-500: #6B7280;
            --gray-600: #4B5563;
            --gray-700: #374151;
          }

          body {
            background: var(--white);
            color: var(--black);
          }

          /* Navigation */
          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: var(--white);
            border-bottom: 1px solid var(--gray-200);
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          }

          .nav-logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--black);
            cursor: pointer;
            letter-spacing: -0.5px;
          }

          .nav-logo span {
            color: var(--blue);
          }

          .nav-right {
            display: flex;
            gap: 1.5rem;
            align-items: center;
          }

          .nav-icon {
            color: var(--gray-500);
            cursor: pointer;
            font-size: 1.3rem;
            transition: all 0.2s;
          }

          .nav-icon:hover {
            color: var(--blue);
          }

          .avatar-small {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--gray-200), var(--gray-300));
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--gray-700);
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px solid transparent;
          }

          .avatar-small:hover {
            border-color: var(--blue);
            transform: scale(1.05);
          }

          /* Logout Button */
          .btn-logout {
            padding: 0.5rem 1.2rem;
            background: transparent;
            border: 2px solid var(--gray-200);
            border-radius: 40px;
            color: var(--gray-600);
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .btn-logout:hover {
            border-color: #EF4444;
            color: #EF4444;
          }

          .btn-logout::before {
            content: "↪";
            font-size: 1.1rem;
          }

          /* Container */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }

          /* Profile Header */
          .profile-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            background: var(--white);
            padding: 2rem;
            border-radius: 24px;
            border: 1px solid var(--gray-200);
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          }

          .profile-info {
            flex: 1;
          }

          .profile-name {
            font-size: 3rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.5rem;
            letter-spacing: -1px;
            line-height: 1.2;
          }

          .profile-headline {
            font-size: 1.2rem;
            color: var(--gray-600);
            margin-bottom: 1rem;
            font-weight: 400;
          }

          .profile-meta {
            display: flex;
            gap: 2rem;
            color: var(--gray-500);
            font-size: 0.95rem;
          }

          .profile-meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .profile-meta-item::before {
            content: "•";
            color: var(--blue);
            font-weight: bold;
          }

          .profile-meta-item:first-child::before {
            display: none;
          }

          .profile-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .btn-edit {
            padding: 0.75rem 2rem;
            background: var(--white);
            border: 2px solid var(--gray-200);
            border-radius: 40px;
            color: var(--gray-600);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .btn-edit:hover {
            border-color: var(--blue);
            color: var(--blue);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(37,99,235,0.1);
          }

          .btn-edit::before {
            content: "✎";
            font-size: 1.1rem;
          }

          .btn-save {
            padding: 0.75rem 2rem;
            background: var(--blue);
            border: none;
            border-radius: 40px;
            color: var(--white);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
            margin-right: 0.5rem;
          }

          .btn-save:hover {
            background: var(--blue-dark);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(37,99,235,0.2);
          }

          .btn-cancel {
            padding: 0.75rem 2rem;
            background: var(--white);
            border: 2px solid var(--gray-200);
            border-radius: 40px;
            color: var(--gray-600);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-cancel:hover {
            border-color: var(--gray-400);
          }

          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 3rem;
          }

          .stat-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 20px;
            padding: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: all 0.2s;
          }

          .stat-card:hover {
            transform: translateY(-4px);
            border-color: var(--blue);
            box-shadow: 0 15px 30px rgba(37,99,235,0.08);
          }

          .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            background: var(--blue-light);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--blue);
            font-size: 1.5rem;
          }

          .stat-content {
            display: flex;
            flex-direction: column;
          }

          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--black);
            line-height: 1.2;
          }

          .stat-label {
            color: var(--gray-500);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          /* Tabs */
          .tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--gray-200);
            padding-bottom: 0.5rem;
          }

          .tab {
            padding: 0.75rem 1.5rem;
            border-radius: 40px;
            font-weight: 600;
            color: var(--gray-500);
            cursor: pointer;
            transition: all 0.2s;
          }

          .tab:hover {
            color: var(--blue);
            background: var(--blue-light);
          }

          .tab.active {
            background: var(--black);
            color: var(--white);
          }

          /* Content Grid */
          .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          /* Cards */
          .card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 24px;
            padding: 2rem;
            transition: all 0.2s;
          }

          .card:hover {
            border-color: var(--blue);
            box-shadow: 0 15px 30px rgba(37,99,235,0.05);
          }

          .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .card-title::after {
            content: "";
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, var(--gray-200), transparent);
          }

          /* About */
          .about-text {
            color: var(--gray-600);
            line-height: 1.8;
            font-size: 1rem;
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
            font-weight: 500;
            color: var(--black);
          }

          .skill-bar {
            flex: 1;
            height: 8px;
            background: var(--gray-100);
            border-radius: 10px;
            overflow: hidden;
          }

          .skill-fill {
            height: 100%;
            background: var(--blue);
            border-radius: 10px;
            transition: width 0.3s;
          }

          .skill-percent {
            width: 45px;
            color: var(--gray-500);
            font-size: 0.9rem;
          }

          /* Experience */
          .exp-item {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--gray-200);
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
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--black);
          }

          .exp-period {
            background: var(--gray-100);
            padding: 0.3rem 1rem;
            border-radius: 30px;
            color: var(--gray-600);
            font-size: 0.85rem;
            font-weight: 500;
          }

          .exp-company {
            color: var(--blue);
            font-weight: 500;
            margin-bottom: 0.75rem;
          }

          .exp-description {
            color: var(--gray-600);
            line-height: 1.7;
            margin-bottom: 1rem;
            font-size: 0.95rem;
          }

          .exp-tech {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .exp-tech-tag {
            background: var(--gray-100);
            color: var(--gray-600);
            padding: 0.3rem 1rem;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          /* Education */
          .edu-item {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--gray-200);
          }

          .edu-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .edu-degree {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 0.3rem;
          }

          .edu-school {
            color: var(--gray-600);
            margin-bottom: 0.3rem;
          }

          .edu-period {
            color: var(--gray-500);
            font-size: 0.9rem;
          }

          /* Portfolio Grid */
          .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .portfolio-item {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 24px;
            padding: 2rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
          }

          .portfolio-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 30px 40px rgba(37,99,235,0.1);
            border-color: var(--blue);
          }

          .portfolio-item::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--blue);
            opacity: 0;
            transition: opacity 0.3s;
          }

          .portfolio-item:hover::before {
            opacity: 1;
          }

          .portfolio-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
          }

          .portfolio-desc {
            color: var(--gray-600);
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
          }

          .portfolio-tech {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
          }

          .portfolio-tech-tag {
            background: var(--gray-100);
            color: var(--gray-600);
            padding: 0.3rem 1rem;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          .portfolio-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--gray-200);
            padding-top: 1.5rem;
          }

          .portfolio-stats {
            display: flex;
            gap: 1.5rem;
            color: var(--gray-500);
            font-size: 0.95rem;
          }

          .portfolio-link {
            color: var(--blue);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
          }

          .portfolio-link:hover {
            gap: 0.5rem;
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
            background: var(--gray-50);
            border-radius: 16px;
            transition: all 0.2s;
            cursor: pointer;
          }

          .social-item:hover {
            background: var(--blue-light);
            transform: translateY(-2px);
          }

          .social-icon {
            width: 36px;
            height: 36px;
            border-radius: 12px;
            background: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
          }

          .social-info {
            display: flex;
            flex-direction: column;
          }

          .social-platform {
            font-weight: 600;
            color: var(--black);
            font-size: 0.95rem;
          }

          .social-handle {
            color: var(--gray-500);
            font-size: 0.8rem;
          }

          /* Edit Form */
          .edit-form {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 24px;
            padding: 2rem;
            margin-bottom: 2rem;
          }

          .form-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 1.5rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--gray-700);
            margin-bottom: 0.3rem;
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 2px solid var(--gray-200);
            border-radius: 16px;
            font-size: 1rem;
            transition: all 0.2s;
          }

          .form-group input:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: var(--blue);
            box-shadow: 0 0 0 4px var(--blue-light);
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          /* Footer */
          .footer {
            margin-top: 4rem;
            padding: 3rem;
            background: var(--black);
            border-radius: 32px;
            color: var(--white);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .footer-logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--white);
          }

          .footer-logo span {
            color: var(--blue);
          }

          .footer-text {
            color: var(--gray-400);
            font-size: 0.9rem;
          }

          .footer-links {
            display: flex;
            gap: 2rem;
          }

          .footer-links span {
            color: var(--gray-400);
            cursor: pointer;
            transition: color 0.2s;
          }

          .footer-links span:hover {
            color: var(--blue);
          }

          @media (max-width: 900px) {
            .content-grid,
            .portfolio-grid,
            .form-row {
              grid-template-columns: 1fr;
            }
            
            .profile-header {
              flex-direction: column;
              gap: 1rem;
            }
            
            .profile-actions {
              width: 100%;
              justify-content: space-between;
            }
            
            .footer {
              flex-direction: column;
              gap: 1rem;
              text-align: center;
            }
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>
          tech<span>folio</span>
        </div>
        <div className="nav-right">
          <span className="nav-icon">✉</span>
          <span className="nav-icon">🔔</span>
          <div className="avatar-small">👤</div>
          {/* Logout Button added in navigation */}
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <h1 className="profile-name">{userData.name}</h1>
            <div className="profile-headline">{userData.headline}</div>
            <div className="profile-meta">
              <span className="profile-meta-item">{userData.location}</span>
              <span className="profile-meta-item">{userData.email}</span>
            </div>
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
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <span className="stat-value">{userData.connections}</span>
              <span className="stat-label">CONNECTIONS</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <span className="stat-value">{userData.projects}</span>
              <span className="stat-label">PROJECTS</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <span className="stat-value">{userData.followers}</span>
              <span className="stat-label">FOLLOWERS</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="edit-form">
            <h2 className="form-title">Edit Profile</h2>
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
            <div className="form-group">
              <label>About</label>
              <textarea name="about" rows="5" value={editForm.about} onChange={handleEditChange} />
            </div>
          </div>
        )}

        {/* Tabs - Added "Portfolio" tab */}
        {!isEditing && (
          <>
            <div className="tabs">
              <div className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</div>
              <div className={`tab ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</div>
              <div className={`tab ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</div>
              <div className={`tab ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</div>
              <div className={`tab ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>Portfolio</div>
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <div className="content-grid">
                <div className="card">
                  <h2 className="card-title">About Me</h2>
                  <p className="about-text">{userData.about}</p>
                </div>
                <div className="card">
                  <h2 className="card-title">Social</h2>
                  <div className="social-grid">
                    {userData.social.map((item, index) => (
                      <div key={index} className="social-item">
                        <div className="social-icon">{item.icon}</div>
                        <div className="social-info">
                          <span className="social-platform">{item.platform}</span>
                          <span className="social-handle">{item.handle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="card">
                <h2 className="card-title">Skills & Expertise</h2>
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
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="card">
                <h2 className="card-title">Work Experience</h2>
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
              </div>
            )}

            {activeTab === 'education' && (
              <div className="card">
                <h2 className="card-title">Education</h2>
                {userData.education.map((edu, index) => (
                  <div key={index} className="edu-item">
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-school">{edu.school}</div>
                    <div className="edu-period">{edu.period}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio Tab - Shows all projects */}
            {activeTab === 'portfolio' && (
              <div className="card">
                <h2 className="card-title">Portfolio</h2>
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
                          <span>❤️ {project.stats}</span>
                          <span>👁️ {project.views}</span>
                        </div>
                        <a href="#" className="portfolio-link">View Project →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">tech<span>folio</span></div>
        <div className="footer-text">© 2024 Techfolio. Built for the modern developer.</div>
        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  );
}

export default Profile;