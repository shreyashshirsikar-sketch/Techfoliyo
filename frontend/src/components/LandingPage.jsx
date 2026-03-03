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
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--blue-mist) 0%, transparent 50%);
          opacity: 0.5;
          z-index: 0;
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
          position: relative;
          z-index: 1;
        }

        @media (min-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-left h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--black-40);
          margin-bottom: 1.5rem;
        }

        .hero-left h1 .line1 {
          display: block;
        }

        .hero-left h1 .line2 {
          display: block;
          color: var(--blue-20);
          position: relative;
          display: inline-block;
        }

        .hero-left h1 .line2::after {
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
          background: transparent;
          color: var(--black-40);
          border: 1.5px solid var(--black-40);
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: var(--radius-md);
        }

        .btn-secondary-large:hover {
          background: var(--black-40);
          color: var(--white-50);
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
          content: '🔗';
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
          box-shadow: var(--shadow-2xl);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--neutral-200);
        }

        .profile-avatar {
          width: 48px;
          height: 48px;
          background: var(--blue-20);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-50);
          font-weight: 600;
          font-size: 1.25rem;
        }

        .profile-info h4 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .profile-info p {
          font-size: 0.875rem;
          color: var(--neutral-500);
        }

        .profile-link {
          display: inline-block;
          background: var(--neutral-100);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: var(--neutral-600);
          margin-bottom: 1.5rem;
          font-family: monospace;
        }

        .profile-link span {
          color: var(--blue-20);
          font-weight: 500;
        }

        .project-preview {
          background: var(--neutral-50);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .preview-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          border-bottom: 1px solid var(--neutral-200);
          transition: background 0.2s;
        }

        .preview-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0.75rem;
          border-bottom: none;
        }

        .preview-item:hover {
          background: var(--white-50);
          border-radius: var(--radius-md);
        }

        .preview-label {
          font-weight: 600;
          min-width: 100px;
          color: var(--blue-20);
          font-size: 0.875rem;
        }

        .preview-value {
          color: var(--neutral-600);
          font-size: 0.875rem;
        }

        .verify-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--green-50);
          color: var(--green-600);
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-full);
          margin-left: 0.5rem;
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

        .section-header.center {
          text-align: center;
          margin: 0 auto 3rem;
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
          gap: 2rem;
          margin-top: 3rem;
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

        .problem-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .problem-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black-40);
        }

        .problem-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .quote-block {
          background: var(--neutral-50);
          padding: 2rem;
          border-radius: var(--radius-lg);
          margin-top: 3rem;
          border-left: 4px solid var(--blue-20);
        }

        .quote-block p {
          font-size: 1.125rem;
          color: var(--neutral-700);
          font-style: italic;
          margin-bottom: 1rem;
        }

        .quote-block .quote-author {
          color: var(--neutral-500);
          font-size: 0.9375rem;
          font-weight: 500;
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
        }

        @media (min-width: 1024px) {
          .solution-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .solution-left h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--black-40);
        }

        .solution-list {
          list-style: none;
        }

        .solution-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          color: var(--neutral-600);
        }

        .solution-list li::before {
          content: '✓';
          color: var(--blue-20);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .solution-right {
          background: var(--white-50);
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
        }

        .solution-right h4 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--black-40);
        }

        .profile-example {
          font-family: monospace;
          background: var(--neutral-50);
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .profile-example .url {
          color: var(--blue-20);
          font-weight: 500;
        }

        /* Features Section */
        .features-section {
          background: var(--white-50);
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
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

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
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

        /* Comparison Table */
        .comparison-section {
          background: var(--neutral-50);
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--white-50);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin-top: 3rem;
        }

        .comparison-table th {
          background: var(--black-40);
          color: var(--white-50);
          font-weight: 600;
          padding: 1rem;
          text-align: left;
        }

        .comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--neutral-200);
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .comparison-table tr:hover {
          background: var(--neutral-50);
        }

        .check-mark {
          color: var(--blue-20);
          font-weight: 700;
        }

        .platform-name {
          font-weight: 600;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, var(--blue-20) 0%, var(--blue-dark) 100%);
          color: var(--white-50);
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
          color: var(--white-50);
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        .cta-button-large {
          background: var(--white-50);
          color: var(--blue-20);
          border: none;
          padding: 1rem 3rem;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: var(--radius-md);
        }

        .cta-button-large:hover {
          background: var(--white-off);
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .cta-small {
          margin-top: 1rem;
          font-size: 0.875rem;
          opacity: 0.8;
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
          gap: 1rem;
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

          .comparison-table {
            font-size: 0.875rem;
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

        .hero, .problem-section, .solution-section, .features-section, .comparison-section, .cta-section {
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
              <a onClick={() => scrollToSection("solution")}>Solution</a>
              <a onClick={() => scrollToSection("features")}>Features</a>
              <a onClick={() => scrollToSection("comparison")}>Compare</a>
            </div>
          </div>
          <div className="nav-right">
            <button className="btn-ghost" onClick={() => navigate("/login")}>Sign in</button>
            <button className="btn-primary" onClick={() => navigate("/signup")}>Create Your Profile</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">⚡ Replace your resume PDF</span>
            <h1>
              <span className="line1">Your resume is a PDF.</span>
              <span className="line2">Your skills are not.</span>
            </h1>
            <p>
              Techfoliyo turns your resume into a live profile where projects prove your abilities — not just bullet points. Share one link instead of sending resumes everywhere.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-large" onClick={() => navigate("/signup")}>
                Create Your Techfoliyo
              </button>
              <button className="btn-secondary-large" onClick={() => navigate("/example")}>
                View Example Profile
              </button>
            </div>
            <div className="trust-line">
              Share one link instead of sending resumes everywhere
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="profile-header">
                <div className="profile-avatar">AS</div>
                <div className="profile-info">
                  <h4>Alex S. · Full Stack Engineer</h4>
                  <p>techfoliyo.com/alex</p>
                </div>
              </div>
              <div className="profile-link">
                <span>🔗 techfoliyo.com/alex</span> — one link to rule them all
              </div>
              <div className="project-preview">
                <div className="preview-item">
                  <span className="preview-label">Resume</span>
                  <span className="preview-value">Education, experience, skills</span>
                </div>
                <div className="preview-item">
                  <span className="preview-label">Projects</span>
                  <span className="preview-value">E-commerce platform · Live demo →</span>
                </div>
                <div className="preview-item">
                  <span className="preview-label">Proof</span>
                  <span className="preview-value">✓ 47 commits · 3 live deployments</span>
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
            <h2>The problem with engineering resumes</h2>
            <p>Recruiters scan a resume in seconds. But engineering is not measurable in bullet points.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">📄</div>
              <h3>Resumes describe. They don't demonstrate.</h3>
              <p>Students write "Built a web app" or "Know React" — but companies never know what they actually built.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">⏱️</div>
              <h3>Recruiters scan in 7 seconds</h3>
              <p>Static PDFs don't show capability. They just list claims without any way to verify them.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❓</div>
              <h3>Fake projects are indistinguishable</h3>
              <p>Without live verification, copied projects look identical to real work on paper.</p>
            </div>
          </div>

          <div className="quote-block">
            <p>"I've reviewed thousands of resumes. The ones with live projects always win. But most students never get to show them."</p>
            <div className="quote-author">— Senior Engineering Manager, FAANG</div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <div className="section-container">
          <div className="solution-grid">
            <div className="solution-left">
              <h3>A resume that shows, not tells</h3>
              <p style={{ color: 'var(--neutral-600)', marginBottom: '2rem' }}>
                Techfoliyo is a professional profile designed for engineers. Instead of attaching files, you share one link.
              </p>
              <ul className="solution-list">
                <li>Resume information — structured cleanly</li>
                <li>Project portfolio with explanations</li>
                <li>Proof of work — live demos, commits, architecture</li>
                <li>Everything in one place, always updated</li>
              </ul>
            </div>
            <div className="solution-right">
              <h4>Your Techfoliyo becomes your:</h4>
              <div className="profile-example">
                <div>📄 <strong>Resume</strong> — Education, experience, skills</div>
                <div style={{ marginTop: '0.5rem' }}>🎨 <strong>Portfolio</strong> — Projects that prove ability</div>
                <div style={{ marginTop: '0.5rem' }}>📊 <strong>Documentation</strong> — Architecture, process, decisions</div>
                <div style={{ marginTop: '0.5rem' }}>✅ <strong>Proof of work</strong> — Live demos, commits, deployments</div>
                <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'var(--blue-mist)', borderRadius: 'var(--radius-md)' }}>
                  <span className="url">🔗 techfoliyo.com/yourname</span> — one link for everything
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header center">
            <h2>Everything in one place</h2>
            <p>From resume to proof of work — all shareable with a single link.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Resume Section</h3>
              <p>All traditional resume details structured cleanly. No formatting headaches. Always up to date.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>Project Portfolio</h3>
              <p>Projects with explanation, not just titles. Show architecture, process, and technical decisions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>One Link Everywhere</h3>
              <p>Use in job applications, LinkedIn, emails, hackathons. One profile that represents all your work.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verifiable Work</h3>
              <p>Live demos + GitHub activity verification helps distinguish real projects from copied ones.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Feedback & Engagement</h3>
              <p>Projects receive reactions and feedback to reflect engagement and appreciation from the community.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Connect with Recruiters</h3>
              <p>Students and recruiters connect directly for collaboration, internships, or hiring opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="comparison-section">
        <div className="section-container">
          <div className="section-header center">
            <h2>Different from other platforms</h2>
            <p>Techfoliyo isn't another social network — it's your professional identity.</p>
          </div>

          <table className="comparison-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Purpose</th>
                <th>Shows proof of work?</th>
                <th>One link?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="platform-name">Resume PDF</td>
                <td>Static summary</td>
                <td>❌</td>
                <td>❌ (attachments)</td>
              </tr>
              <tr>
                <td className="platform-name">LinkedIn</td>
                <td>Career history</td>
                <td>❌</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="platform-name">GitHub</td>
                <td>Code repositories</td>
                <td>⚠️ (code only)</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="platform-name">Portfolio website</td>
                <td>Personal showcase</td>
                <td>⚠️ (varies)</td>
                <td>✓</td>
              </tr>
              <tr style={{ background: 'var(--blue-mist)' }}>
                <td className="platform-name" style={{ fontWeight: 700, color: 'var(--blue-20)' }}>Techfoliyo</td>
                <td>Hiring-ready engineer profile</td>
                <td className="check-mark">✓✓</td>
                <td className="check-mark">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* For Students & Recruiters */}
      <section className="features-section" style={{ background: 'var(--white-50)' }}>
        <div className="section-container">
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div className="feature-icon">👨‍🎓</div>
              <h3>For Students</h3>
              <p>Stop rewriting resumes for every application. Update once → everywhere updated. Your profile grows as you build.</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div className="feature-icon">👔</div>
              <h3>For Recruiters</h3>
              <p>Stop guessing candidate ability. Evaluate engineers through actual work instead of claims. Understand skill depth in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Replace your resume</h2>
          <p>Create a profile you never have to redesign again. One link that proves what you can build.</p>
          <button className="cta-button-large" onClick={() => navigate("/signup")}>
            Create Your Techfoliyo
          </button>
          <div className="cta-small">Free for engineers · No credit card required</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">tech<span>foliyo</span></div>
            <p className="footer-desc">
              Built for people who build things. Replace your resume PDF with a living profile that proves your skills.
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
            <span className="footer-link" onClick={() => scrollToSection("comparison")}>Comparison</span>
            <span className="footer-link">Pricing</span>
          </div>
          <div className="footer-col">
            <h4>Students</h4>
            <span className="footer-link" onClick={() => navigate("/signup")}>Create Profile</span>
            <span className="footer-link" onClick={() => navigate("/login")}>Login</span>
            <span className="footer-link">Browse Engineers</span>
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
          Built for people who build things.
        </div>
      </footer>
    </>
  );
}

export default LandingPage;