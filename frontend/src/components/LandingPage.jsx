import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

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
          /* 20% Blue, 40% Black, 50% White Color Scheme */
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
          letter-spacing: -0.02em;
        }

        .nav-logo span {
          color: var(--blue-20);
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
          padding: 0.5rem 0;
        }

        .nav-links a:hover {
          color: var(--blue-20);
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
          transition: all 0.2s;
          border-radius: var(--radius-md);
        }

        .btn-ghost:hover {
          color: var(--blue-20);
          background: var(--neutral-100);
        }

        .btn-primary {
          background: var(--black-40);
          color: var(--white-50);
          border: none;
          padding: 0.5rem 1.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: var(--radius-md);
        }

        .btn-primary:hover {
          background: var(--black-light);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          background: linear-gradient(135deg, var(--neutral-50) 0%, var(--white-50) 100%);
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
          color: var(--black-40);
          margin-bottom: 1.5rem;
        }

        .hero-left h1 span {
          color: var(--blue-20);
          position: relative;
          display: inline-block;
        }

        .hero-left h1 span::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 8px;
          background: var(--blue-mist);
          z-index: -1;
          border-radius: var(--radius-full);
        }

        .hero-left p {
          font-size: 1.125rem;
          color: var(--neutral-600);
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .hero-badge {
          display: inline-block;
          background: var(--blue-mist);
          color: var(--blue-20);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          margin-bottom: 1.5rem;
          border-radius: var(--radius-full);
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .btn-primary-large {
          background: var(--black-40);
          color: var(--white-50);
          border: none;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: var(--radius-md);
        }

        .btn-primary-large:hover {
          background: var(--black-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-secondary-large {
          background: var(--blue-20);
          color: var(--white-50);
          border: none;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: var(--radius-md);
        }

        .btn-secondary-large:hover {
          background: var(--blue-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .trust-line {
          font-size: 0.875rem;
          color: var(--neutral-500);
          border-top: 1px solid var(--neutral-200);
          padding-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trust-line::before {
          content: '✨';
          font-size: 1rem;
        }

        .hero-card {
          background: var(--white-50);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          transition: transform 0.3s ease;
        }

        .hero-card:hover {
          transform: translateY(-4px);
        }

        .project-structure {
          background: var(--neutral-50);
          border-radius: var(--radius-md);
        }

        .structure-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          border-bottom: 1px solid var(--neutral-200);
          transition: background 0.2s;
        }

        .structure-item:last-child {
          margin-bottom: 0;
          padding-bottom: 1rem;
          border-bottom: none;
        }

        .structure-item:hover {
          background: var(--white-50);
          border-radius: var(--radius-md);
        }

        .item-label {
          font-weight: 600;
          min-width: 100px;
          color: var(--blue-20);
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
          color: var(--black-40);
          position: relative;
          display: inline-block;
        }

        .section-header h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 4px;
          background: var(--blue-20);
          border-radius: var(--radius-full);
        }

        .section-header.center h2::after {
          left: 50%;
          transform: translateX(-50%);
        }

        .section-header p {
          color: var(--neutral-600);
          font-size: 1.125rem;
        }

        /* Problem Section */
        .problem-section {
          background: var(--white-50);
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
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          padding: 2rem;
          transition: all 0.3s ease;
          border-radius: var(--radius-lg);
        }

        .problem-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }

        .problem-card .problem-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--blue-20);
          opacity: 0.3;
          line-height: 1;
        }

        .problem-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--black-40);
        }

        .problem-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* Features Section */
        .features-section {
          background: var(--white-50);
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
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
          border-radius: var(--radius-lg);
        }

        .feature-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }

        .feature-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--blue-20);
          opacity: 0.3;
          line-height: 1;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black-40);
        }

        .feature-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* Audience Section */
        .audience-section {
          background: var(--white-50);
        }

        .audience-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        @media (min-width: 768px) {
          .audience-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .audience-card {
          text-align: center;
          padding: 2.5rem 2rem;
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
          border-radius: var(--radius-lg);
        }

        .audience-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }

        .audience-number {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
          color: var(--blue-20);
          opacity: 0.3;
          line-height: 1;
        }

        .audience-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--black-40);
        }

        .audience-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* Project Types Section */
        .project-types-section {
          background: linear-gradient(135deg, var(--blue-20) 0%, var(--blue-dark) 100%);
          color: var(--white-50);
          text-align: center;
          padding: 5rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .project-types-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
        }

        .project-types-section .section-container {
          position: relative;
          z-index: 1;
        }

        .project-types-section h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;
        }

        .project-types-section h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: var(--radius-full);
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .tag {
          padding: 0.75rem 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          font-size: 1rem;
          font-weight: 500;
          color: var(--white-50);
          backdrop-filter: blur(10px);
          cursor: default;
        }

        /* CTA Section */
        .cta-section {
          background: var(--white-50);
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
          color: var(--black-40);
        }

        .cta-content p {
          color: var(--neutral-600);
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        .cta-button-large {
          background: var(--blue-20);
          color: var(--white-50);
          border: none;
          padding: 1rem 3rem;
          font-size: 1.125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: var(--radius-md);
        }

        .cta-button-large:hover {
          background: var(--blue-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        /* Footer */
        .footer {
          background: var(--black-40);
          color: var(--white-50);
          padding: 4rem 2rem 2rem;
          position: relative;
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
        }

        .footer-social {
          display: flex;
          gap: 1.5rem;
        }

        .social-link {
          color: var(--neutral-400);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-full);
        }

        .social-link:hover {
          color: var(--white-50);
          background: var(--blue-20);
          transform: translateY(-2px);
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
          transition: all 0.2s;
          padding: 0.25rem 0;
        }

        .footer-link:hover {
          color: var(--blue-20);
          transform: translateX(4px);
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
          padding: 0.25rem 0;
        }

        .footer-bottom-links span:hover {
          color: var(--blue-20);
        }

        .footer-tagline {
          text-align: center;
          margin-top: 3rem;
          color: var(--neutral-500);
          font-size: 0.8125rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          
          .btn-primary-large, .btn-secondary-large {
            width: 100%;
          }

          .section-header h2::after {
            left: 0;
            transform: none;
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

        /* Loading Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero, .problem-section, .features-section, .audience-section, .project-types-section, .cta-section {
          animation: fadeInUp 0.6s ease-out;
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
              <a onClick={() => scrollToSection("features")}>Features</a>
              <a onClick={() => scrollToSection("audience")}>For Whom</a>
            </div>
          </div>
          <div className="nav-right">
            <button className="btn-ghost" onClick={() => navigate("/login")}>Sign in</button>
            <button className="btn-primary" onClick={() => navigate("/signup")}>Create Portfolio</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">⚡ For engineers, by engineers</span>
            <h1>
              Showcase your live projects<br />
              <span>Working demos. Real proof.</span>
            </h1>
            <p>
              Stop sharing just repositories. Let recruiters see your projects in action.
              TechFoliyo helps engineers build professional portfolios with live,
              working applications.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-large" onClick={() => navigate("/signup")}>
                Create Your Portfolio
              </button>
              <button className="btn-secondary-large" onClick={() => navigate("/home")}>
                Explore Projects
              </button>
            </div>
            <div className="trust-line">
              Join 10,000+ engineers showcasing their work through live project demonstrations
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="project-structure">
                <div className="structure-item">
                  <span className="item-label">Live Demo</span>
                  <span className="item-value">ecommerce-demo.techfoliyo.com</span>
                </div>
                <div className="structure-item">
                  <span className="item-label">GitHub</span>
                  <span className="item-value">github.com/user/project (48 commits)</span>
                </div>
                <div className="structure-item">
                  <span className="item-label">Tech Stack</span>
                  <span className="item-value">React, Node.js, MongoDB</span>
                </div>
                <div className="structure-item">
                  <span className="item-label">Status</span>
                  <span className="item-value" style={{ color: 'var(--blue-20)' }}>✓ Verified Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="problem-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Current portfolios show code, not capability.</h2>
            <p>Recruiters don't have time to download and run every project. They need instant evaluation.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-number">01</div>
              <h3>GitHub shows code without context</h3>
              <p>Recruiters don't have time to download, setup, and run your projects. They need instant evaluation.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">02</div>
              <h3>Resumes list skills without proof</h3>
              <p>Anyone can claim knowledge. Live projects prove you can actually build.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">03</div>
              <h3>Fake projects are common</h3>
              <p>Without live verification, copied projects look the same as real work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header center" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>
            <h2>Built for engineers who mean business</h2>
            <p>Every feature designed to showcase real engineering work.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Live Project Demo</h3>
              <p>Each project includes a working deployment link so recruiters can test it instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Project Authenticity Check</h3>
              <p>Live demos + GitHub activity verification helps reduce fake or copied projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Single Portfolio Link</h3>
              <p>One public profile link to share in job applications instead of just a resume.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Internship Drives</h3>
              <p>Startups and companies evaluate students by directly checking live projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">05</div>
              <h3>Like & Feedback</h3>
              <p>Projects receive reactions and feedback to reflect engagement and appreciation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">06</div>
              <h3>Connect Feature</h3>
              <p>Students and recruiters connect for collaboration, internships, or hiring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section id="audience" className="audience-section">
        <div className="section-container">
          <div className="section-header center" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>
            <h2>Who is this platform for?</h2>
          </div>

          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-number">01</div>
              <h3>Engineering Students</h3>
              <p>Present your real work professionally and stand out from the crowd with live, verified projects.</p>
            </div>
            <div className="audience-card">
              <div className="audience-number">02</div>
              <h3>Recruiters & Companies</h3>
              <p>Quickly evaluate working projects during internships and placements without running any code.</p>
            </div>
            <div className="audience-card">
              <div className="audience-number">03</div>
              <h3>Training & Placement Cells</h3>
              <p>Simplify campus hiring with verified student project portfolios and direct recruiter connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="project-types-section">
        <div className="section-container">
          <h2>Supported Project Types</h2>
          <div className="tags-container">
            {[
              "Software Engineering Projects",
              "Full-Stack Web Applications",
              "AI/ML Deployable Applications",
              "SaaS/Web-based Systems"
            ].map((item, i) => (
              <span key={i} className="tag">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to showcase your real work?</h2>
          <p>Join thousands of engineers building professional portfolios through live project demonstrations.</p>
          <button className="cta-button-large" onClick={() => navigate("/signup")}>
            Create Your Free Portfolio
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">tech<span>foliyo</span></div>
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
            <span className="footer-link" onClick={() => scrollToSection("features")}>Features</span>
            <span className="footer-link" onClick={() => scrollToSection("audience")}>For Whom</span>
            <span className="footer-link">Pricing</span>
          </div>
          <div className="footer-col">
            <h4>Students</h4>
            <span className="footer-link" onClick={() => navigate("/signup")}>Create Portfolio</span>
            <span className="footer-link" onClick={() => navigate("/login")}>Login</span>
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
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
        <div className="footer-tagline">
          Made with ❤️ for the engineering community
        </div>
      </footer>
    </>
  );
}

export default LandingPage;