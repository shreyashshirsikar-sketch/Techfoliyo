import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../api/projects";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [filter, setFilter] = useState("Feed");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch real projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Scroll effect
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

  // Images for different filters
  const feedImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ];

  const trendingImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  ];

  const mlImages = [
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ];

  const webImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ];

  const openSourceImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ];

  const getImages = () => {
    switch(filter) {
      case "Trending": return trendingImages;
      case "Machine Learning": return mlImages;
      case "Web Development": return webImages;
      case "Open Source": return openSourceImages;
      default: return feedImages;
    }
  };

  const getFilteredProjects = () => {
    if (!projects || projects.length === 0) {
      return [];
    }

    let filtered = [...projects];
    
    if (filter !== "Feed") {
      filtered = projects.filter(project => 
        project.category === filter || 
        (project.tags && project.tags.includes(filter))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.summary?.toLowerCase().includes(query) ||
        project.user?.username?.toLowerCase().includes(query) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return filtered.map(project => ({
      title: project.title || "Untitled Project",
      desc: project.description || project.summary || "No description available",
      tech: project.techStack ? 
        (Array.isArray(project.techStack) ? project.techStack : project.techStack.split(',').map(t => t.trim())) 
        : ["React", "Node.js"],
      author: project.user?.username || project.author || "Unknown",
      likes: project.likes ? 
        (project.likes > 999 ? (project.likes/1000).toFixed(1) + 'k' : project.likes.toString()) 
        : "0",
      views: project.views ? 
        (project.views > 999 ? (project.views/1000).toFixed(1) + 'k' : project.views.toString()) 
        : "0"
    }));
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'var(--font-body)',
        color: 'var(--neutral-600)'
      }}>
        Loading projects...
      </div>
    );
  }

  const displayedProjects = getFilteredProjects();

  return (
    <>
      <style>{`
        /* Copy ALL the styles from your original Home.jsx here */
        /* I'm not repeating them for brevity, but keep all your existing styles */
        
        .pill.active {
          background: var(--blue-20);
          border-color: var(--blue-20);
          color: var(--white-50);
        }
      `}</style>

      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")}>
            tech<span>foliyo</span>
          </div>
          <div className="nav-right">
            <button className="icon-btn">✉</button>
            <button className="icon-btn">🔔</button>
            <button className="btn-create">+ Create Project</button>
            <div className="avatar" onClick={() => navigate("/profile")}>👤</div>
          </div>
        </div>
      </nav>

      <div className="search-section">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for projects, developers, or tech stacks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="main-content">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, Alex</h1>
          <p className="welcome-subtitle">Discover projects from the community</p>
        </div>

        <div className="filter-section">
          <div className="filter-pills">
            {["Feed", "Trending", "Machine Learning", "Web Development", "Open Source"].map((pill) => (
              <div 
                key={pill}
                className={`pill ${filter === pill ? 'active' : ''}`}
                onClick={() => setFilter(pill)}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {displayedProjects.length > 0 ? (
            displayedProjects.slice(0, 8).map((project, i) => (
              <div className="project-card" key={i}>
                <div 
                  className="project-image"
                  style={{ backgroundImage: `url(${getImages()[i % getImages().length]})` }}
                />
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tech.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="project-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-meta">
                    <div className="project-author">
                      <div className="author-avatar">{project.author.charAt(0)}</div>
                      <span>{project.author}</span>
                    </div>
                    <div className="project-stats">
                      <span className="stat">❤ {project.likes}</span>
                      <span className="stat">👁 {project.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--neutral-500)'
            }}>
              {searchQuery ? `No projects found matching "${searchQuery}"` : "No projects found for this filter."}
            </div>
          )}
        </div>

        {displayedProjects.length > 8 && (
          <div className="show-more-container">
            <button className="show-more-btn">Show More Projects ↓</button>
          </div>
        )}
      </div>

      <footer className="footer">
        {/* Keep your existing footer code */}
        <div className="footer-grid">
          <div>
            <div className="footer-logo">tech<span>foliyo</span></div>
            <p className="footer-desc">
              Building bridges between engineers and recruiters through live project demonstrations.
            </p>
            <div className="footer-social">
              <span className="social-link">Twitter</span>
              <span className="social-link">GitHub</span>
              <span className="social-link">LinkedIn</span>
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
          <span>© 2026 Techfoliyo. All rights reserved.</span>
          <div className="footer-bottom-links">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;