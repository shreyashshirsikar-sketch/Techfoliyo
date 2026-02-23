import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          /* Modern SaaS Color Palette */
          --primary-50: #EEF2FF;
          --primary-100: #E0E7FF;
          --primary-200: #C7D2FE;
          --primary-300: #A5B4FC;
          --primary-400: #818CF8;
          --primary-500: #6366F1;
          --primary-600: #4F46E5;
          --primary-700: #4338CA;
          --primary-800: #3730A3;
          --primary-900: #312E81;
          
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
          --neutral-900: #111827;
          
          /* Semantic Colors */
          --success-500: #10B981;
          --warning-500: #F59E0B;
          --error-500: #EF4444;
          
          /* Typography */
          --font-display: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Inter', sans-serif;
          
          /* Shadows */
          --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        }

        body {
          font-family: var(--font-body);
          background: white;
          color: var(--neutral-900);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        /* Modern Navigation */
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
          color: var(--neutral-900);
          cursor: pointer;
          letter-spacing: -0.02em;
        }

        .nav-logo span {
          color: var(--primary-600);
          background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: none;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
        }

        .nav-links a {
          color: var(--neutral-600);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--primary-600);
        }

        .nav-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-ghost {
          background: transparent;
          border: none;
          color: var(--neutral-600);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.5rem 1rem;
          transition: color 0.2s;
        }

        .btn-ghost:hover {
          color: var(--primary-600);
        }

        .btn-primary {
          background: var(--neutral-900);
          color: white;
          border: none;
          padding: 0.5rem 1.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: var(--neutral-800);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          background: linear-gradient(to bottom, var(--neutral-50), white);
        }

        @media (min-width: 768px) {
          .hero {
            padding: 0 4rem;
          }
        }

        .hero-content {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding: 6rem 0;
        }

        @media (min-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-left h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--neutral-900);
          margin-bottom: 1.5rem;
        }

        .hero-left p {
          font-size: 1.125rem;
          color: var(--neutral-600);
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .hero-badge {
          display: inline-block;
          background: var(--primary-50);
          color: var(--primary-700);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          margin-bottom: 1.5rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .btn-primary-large {
          background: var(--neutral-900);
          color: white;
          border: none;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary-large:hover {
          background: var(--neutral-800);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-secondary-large {
          background: transparent;
          border: 1px solid var(--neutral-200);
          color: var(--neutral-700);
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary-large:hover {
          background: var(--neutral-50);
          border-color: var(--neutral-300);
        }

        .trust-line {
          font-size: 0.875rem;
          color: var(--neutral-500);
          border-top: 1px solid var(--neutral-200);
          padding-top: 1.5rem;
        }

        .hero-card {
          background: white;
          padding: 2rem;
          box-shadow: var(--shadow-xl);
        }

        .project-structure {
          background: var(--neutral-50);
        }

        .structure-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--neutral-200);
        }

        .structure-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .item-label {
          font-weight: 600;
          min-width: 100px;
          color: var(--primary-600);
          font-size: 0.875rem;
        }

        .item-value {
          color: var(--neutral-600);
          font-size: 0.875rem;
        }

        /* Section Styles */
        section {
          padding: 5rem 2rem;
        }

        @media (min-width: 768px) {
          section {
            padding: 6rem 4rem;
          }
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .section-header {
          max-width: 600px;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .section-header p {
          color: var(--neutral-600);
          font-size: 1.125rem;
        }

        /* Problem Section */
        .problem-section {
          background: white;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .problem-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .problem-card {
          background: white;
          border: 1px solid var(--neutral-200);
          padding: 2rem;
          transition: all 0.2s;
        }

        .problem-card:hover {
          border-color: var(--primary-200);
          box-shadow: var(--shadow-lg);
        }

        .problem-card .icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .problem-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--neutral-900);
        }

        .problem-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* Solution Section */
        .solution-section {
          background: var(--neutral-50);
        }

        .solution-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-top: 2rem;
        }

        @media (min-width: 1024px) {
          .solution-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .solution-list {
          list-style: none;
        }

        .solution-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 1rem;
          color: var(--neutral-700);
        }

        .solution-list li:before {
          content: "✓";
          color: var(--success-500);
          font-weight: 600;
          font-size: 1.125rem;
        }

        .solution-card {
          background: white;
          border: 1px solid var(--neutral-200);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .solution-card-header {
          background: var(--neutral-50);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--neutral-200);
          font-weight: 600;
          color: var(--neutral-900);
        }

        .solution-card-content {
          padding: 1.5rem;
        }

        /* Features Section */
        .features-section {
          background: white;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .feature-card {
          padding: 2rem;
          background: white;
          border: 1px solid var(--neutral-200);
          transition: all 0.2s;
        }

        .feature-card:hover {
          border-color: var(--primary-200);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .feature-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* How It Works */
        .how-it-works {
          background: var(--neutral-50);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        @media (min-width: 768px) {
          .steps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .step-card {
          text-align: center;
          padding: 2rem;
          background: white;
          border: 1px solid var(--neutral-200);
          position: relative;
        }

        .step-number {
          width: 3rem;
          height: 3rem;
          background: var(--neutral-900);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
          margin: 0 auto 1.5rem;
        }

        .step-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--neutral-900);
        }

        .step-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
        }

        /* Recruiters Section */
        .recruiters-section {
          background: white;
        }

        .recruiters-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .recruiters-content p {
          color: var(--neutral-600);
          font-size: 1.125rem;
          margin-top: 1rem;
        }

        /* Social Proof */
        .social-proof {
          background: var(--primary-600);
          color: white;
          text-align: center;
        }

        .social-proof h3 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .social-proof p {
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .social-proof p:last-child {
          opacity: 1;
          font-weight: 600;
        }

        /* CTA Section */
        .cta-section {
          background: white;
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: var(--neutral-900);
        }

        .cta-content p {
          color: var(--neutral-600);
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        .cta-button-large {
          background: var(--neutral-900);
          color: white;
          border: none;
          padding: 1rem 3rem;
          font-size: 1.125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-button-large:hover {
          background: var(--neutral-800);
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .footer-line {
          font-size: 0.875rem;
          color: var(--neutral-500);
        }

        /* Footer */
        .footer {
          background: var(--neutral-900);
          color: white;
          padding: 4rem 2rem 2rem;
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
          color: white;
        }

        .footer-logo span {
          color: var(--primary-400);
        }

        .footer-desc {
          color: var(--neutral-400);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
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
          color: white;
        }

        .footer-col h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: white;
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
          color: white;
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
          color: white;
        }

        .footer-tagline {
          text-align: center;
          margin-top: 3rem;
          color: var(--neutral-500);
          font-size: 0.8125rem;
        }
      `}</style>

      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <div className="nav-logo" onClick={() => scrollToSection("home")}>
              tech<span>foliyo</span>
            </div>
            <div className="nav-links">
              <a onClick={() => scrollToSection("problem")}>Problem</a>
              <a onClick={() => scrollToSection("solution")}>Solution</a>
              <a onClick={() => scrollToSection("features")}>Features</a>
              <a onClick={() => scrollToSection("how-it-works")}>How it works</a>
            </div>
          </div>
          <div className="nav-right">
            <button className="btn-ghost" onClick={() => navigate("/login")}>Sign in</button>
            <button className="btn-primary" onClick={() => navigate("/signup")}>Create Portfolio</button>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">For engineers, by engineers</span>
            <h1>Your Projects Deserve More Than a Repository.</h1>
            <p>
              Techfoliyo is the professional portfolio platform built exclusively for engineers. 
              Showcase your projects with visuals, demos, and structured case studies.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-large" onClick={() => navigate("/signup")}>
                Create Your Portfolio
              </button>
              <button className="btn-secondary-large" onClick={() => navigate("/explore")}>
                Explore Projects
              </button>
            </div>
            <div className="trust-line">
              Join 10,000+ engineers building their professional presence
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="project-structure">
                <div className="structure-item">
                  <span className="item-label">Problem</span>
                  <span className="item-value">High latency in microservices communication</span>
                </div>
                <div className="structure-item">
                  <span className="item-label">Architecture</span>
                  <span className="item-value">Clean architecture with CQRS pattern</span>
                </div>
                <div className="structure-item">
                  <span className="item-label">Tech Stack</span>
                  <span className="item-value">Node.js, Redis, Docker, Kubernetes</span>
                </div>
                <div className="structure-item">
                  <span className="item-label">Demo</span>
                  <span className="item-value">Live preview available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="problem-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Engineers Build Amazing Things. But They Struggle to Present Them.</h2>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="icon">📁</div>
              <h3>Code repositories are hard to read</h3>
              <p>Raw code without context doesn't show your thinking or problem-solving approach.</p>
            </div>
            <div className="problem-card">
              <div className="icon">📄</div>
              <h3>Resumes don't show real skills</h3>
              <p>Listing technologies doesn't prove you can actually build with them.</p>
            </div>
            <div className="problem-card">
              <div className="icon">⏰</div>
              <h3>Personal websites take too long</h3>
              <p>Engineers should spend time coding, not designing portfolio websites.</p>
            </div>
          </div>

          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.25rem', 
            fontWeight: 500,
            color: 'var(--neutral-900)',
            marginTop: '3rem'
          }}>
            Engineers need a platform that turns projects into professional portfolios.
          </p>
        </div>
      </section>

      <section id="solution" className="solution-section">
        <div className="section-container">
          <div className="section-header">
            <h2>A Portfolio Platform Designed for Engineers</h2>
            <p>
              Techfoliyo combines code credibility, professional identity, and visual storytelling into one powerful portfolio system.
            </p>
          </div>

          <div className="solution-grid">
            <div>
              <ul className="solution-list">
                <li>Create project case studies with images, videos, and live demos</li>
                <li>Organize your work into a clean public portfolio</li>
                <li>Share a single link that represents your engineering journey</li>
              </ul>
            </div>
            <div className="solution-card">
              <div className="solution-card-header">
                API Gateway Service - Case Study
              </div>
              <div className="solution-card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>Problem:</span>{' '}
                  <span style={{ color: 'var(--neutral-600)' }}>High latency in microservices</span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>Solution:</span>{' '}
                  <span style={{ color: 'var(--neutral-600)' }}>Implemented Redis caching layer</span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>Demo:</span>{' '}
                  <span style={{ color: 'var(--neutral-600)' }}>Live preview →</span>
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>Tech Stack:</span>{' '}
                  <span style={{ color: 'var(--neutral-600)' }}>Node.js, Redis, Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>
            <h2>Everything You Need to Showcase Your Work</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>Project Case Studies</h3>
              <p>Turn your projects into structured showcases with screenshots, videos, descriptions, and tech stacks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>Professional Engineer Profiles</h3>
              <p>Highlight your skills, experience, and education in a clean, modern layout.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>GitHub Integration</h3>
              <p>Link repositories and sync project details automatically.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Visual Portfolio Themes</h3>
              <p>Choose from beautifully designed portfolio styles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Public Portfolio Link</h3>
              <p>Get a shareable professional portfolio URL.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>
            <h2>Build Your Portfolio in Three Simple Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create your engineer profile</h3>
              <p>Set up your professional identity in minutes.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Add and showcase your projects</h3>
              <p>Document your work with structured case studies.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Share your portfolio with the world</h3>
              <p>One link that represents your engineering journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recruiters-section">
        <div className="section-container">
          <div className="recruiters-content">
            <h2>Discover Engineers Through Real Projects</h2>
            <p>
              Browse portfolios, filter by skills, and evaluate engineers through their actual work — not just resumes.
            </p>
            <p style={{ color: 'var(--primary-600)', fontWeight: 500, marginTop: '1.5rem' }}>
              Techfoliyo helps recruiters find talent faster and smarter.
            </p>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="section-container">
          <h3>Built for the Next Generation of Engineers</h3>
          <p>
            Join a growing community of 10,000+ engineers showcasing innovative projects across AI, web development, robotics, and more.
          </p>
          <p style={{ marginTop: '2rem' }}>
            Your work deserves to be seen.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Building Your Engineering Portfolio Today</h2>
          <p>Create a professional portfolio in minutes and showcase what you build.</p>
          <button className="cta-button-large" onClick={() => navigate("/signup")}>
            Create Your Free Portfolio
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">tech<span>foliyo</span></div>
            <p className="footer-desc">
              The professional portfolio platform for engineers. Showcase your projects, share your journey.
            </p>
            <div className="footer-social">
              <span className="social-link">Twitter</span>
              <span className="social-link">GitHub</span>
              <span className="social-link">LinkedIn</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <span className="footer-link" onClick={() => scrollToSection("how-it-works")}>How it works</span>
            <span className="footer-link" onClick={() => scrollToSection("features")}>Features</span>
            <span className="footer-link">Pricing</span>
            <span className="footer-link">FAQ</span>
          </div>
          <div className="footer-col">
            <h4>Developers</h4>
            <span className="footer-link">Create Portfolio</span>
            <span className="footer-link">Browse Projects</span>
            <span className="footer-link">Community</span>
            <span className="footer-link">Documentation</span>
          </div>
          <div className="footer-col">
            <h4>Recruiters</h4>
            <span className="footer-link">Search Talent</span>
            <span className="footer-link">Enterprise</span>
            <span className="footer-link">Contact Sales</span>
            <span className="footer-link">Success Stories</span>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <span className="footer-link">About</span>
            <span className="footer-link">Blog</span>
            <span className="footer-link">Careers</span>
            <span className="footer-link">Contact</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Techfoliyo. All rights reserved.</span>
          <div className="footer-bottom-links">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
        <div className="footer-tagline">
          Techfoliyo — The professional portfolio platform for engineers.
        </div>
      </footer>
    </>
  );
}

export default LandingPage;