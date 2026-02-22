import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);
  const cursorRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Parallax effect for sections
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const speed = 0.1;
          const yPos = -(window.scrollY * speed * (index % 2 === 0 ? 1 : -1));
          section.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --blue: #2563EB;
          --blue-dark: #1E40AF;
          --blue-light: #60A5FA;
          --white: #FFFFFF;
          --white-off: #F8FAFC;
          --black: #0A0A0A;
          --black-light: #1A1A1A;
          --gray: #64748B;
          --gray-light: #E2E8F0;
          
          /* 10-30-60 Rule */
          --color-primary: var(--blue);
          --color-secondary: var(--white);
          --color-accent: var(--black);
          
          /* Sharp corners */
          --radius-none: 0px;
          --border-thin: 1px;
          --border-thick: 2px;
          
          /* Typography */
          --font-display: 'Archivo', sans-serif;
          --font-body: 'Inter', sans-serif;
          
          /* Spacing */
          --space-xs: 8px;
          --space-sm: 16px;
          --space-md: 24px;
          --space-lg: 48px;
          --space-xl: 64px;
          --space-2xl: 96px;
        }

        body {
          font-family: var(--font-body);
          background: var(--white-off);
          color: var(--black);
          line-height: 1.6;
          overflow-x: hidden;
          cursor: none;
        }

        /* Custom Cursor */
        .custom-cursor {
          width: 8px;
          height: 8px;
          background: var(--blue);
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }

        .cursor-trail {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid var(--blue);
          pointer-events: none;
          z-index: 9998;
          transition: all 0.15s ease;
          opacity: 0.3;
        }

        /* Typography */
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        /* Sharp edges utility */
        .sharp {
          border-radius: 0 !important;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: var(--space-md);
          left: var(--space-md);
          right: var(--space-md);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: var(--border-thin) solid var(--gray-light);
          padding: var(--space-sm) var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav.scrolled {
          background: var(--white);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: var(--black);
          cursor: pointer;
          position: relative;
        }

        .nav-logo::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 30%;
          height: 3px;
          background: var(--blue);
          transition: width 0.3s ease;
        }

        .nav-logo:hover::after {
          width: 100%;
        }

        .nav-logo span {
          color: var(--blue);
        }

        .nav-links {
          display: flex;
          gap: var(--space-lg);
        }

        .nav-links a {
          color: var(--black);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          position: relative;
          padding: var(--space-xs) 0;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--blue);
          transition: width 0.2s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          gap: var(--space-sm);
        }

        .btn-outline {
          padding: var(--space-xs) var(--space-lg);
          background: transparent;
          border: var(--border-thick) solid var(--blue);
          color: var(--blue);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline:hover {
          background: var(--blue);
          color: var(--white);
        }

        .btn-primary {
          padding: var(--space-xs) var(--space-lg);
          background: var(--black);
          border: var(--border-thick) solid var(--black);
          color: var(--white);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--blue);
          transition: left 0.3s ease;
          z-index: -1;
        }

        .btn-primary:hover {
          border-color: var(--blue);
          color: var(--white);
        }

        .btn-primary:hover::before {
          left: 0;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          background: var(--white);
        }

        .hero-left {
          padding: var(--space-2xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          border-right: var(--border-thin) solid var(--gray-light);
        }

        .hero-left::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--blue), transparent);
          opacity: 0.5;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .hero-label-line {
          width: 40px;
          height: 3px;
          background: var(--blue);
        }

        .hero-label-text {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--gray);
        }

        .hero-title {
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 900;
          line-height: 1;
          margin-bottom: var(--space-lg);
          letter-spacing: -0.03em;
        }

        .hero-title-line {
          display: block;
          overflow: hidden;
        }

        .hero-title-line span {
          display: block;
          animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(100%);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title-line:nth-child(1) span { animation-delay: 0.1s; }
        .hero-title-line:nth-child(2) span { animation-delay: 0.2s; }
        .hero-title-line:nth-child(3) span { animation-delay: 0.3s; }

        .hero-title .blue {
          color: var(--blue);
          position: relative;
          display: inline-block;
        }

        .hero-title .blue::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          height: 20%;
          background: var(--blue);
          opacity: 0.2;
          z-index: -1;
        }

        .hero-subtitle {
          font-size: 16px;
          color: var(--gray);
          max-width: 500px;
          margin-bottom: var(--space-xl);
          line-height: 1.8;
          animation: fadeIn 1s ease 0.6s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .hero-stats {
          display: flex;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
          animation: fadeIn 1s ease 0.8s forwards;
          opacity: 0;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 900;
          color: var(--blue);
          line-height: 1;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gray);
          margin-top: var(--space-xs);
        }

        .hero-cta-group {
          display: flex;
          gap: var(--space-md);
          animation: fadeIn 1s ease 1s forwards;
          opacity: 0;
        }

        .btn-large {
          padding: var(--space-md) var(--space-xl);
          font-size: 15px;
        }

        /* Hero Right - Grid System */
        .hero-right {
          background: var(--white-off);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .grid-system {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--gray-light);
          padding: 2px;
        }

        .grid-item {
          background: var(--white);
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .grid-item:hover {
          transform: scale(0.98);
          background: var(--blue);
        }

        .grid-item:nth-child(1) { animation: gridFloat 6s ease-in-out infinite; }
        .grid-item:nth-child(2) { animation: gridFloat 7s ease-in-out infinite 0.5s; }
        .grid-item:nth-child(3) { animation: gridFloat 8s ease-in-out infinite 1s; }
        .grid-item:nth-child(4) { animation: gridFloat 5s ease-in-out infinite 1.5s; }
        .grid-item:nth-child(5) { animation: gridFloat 6.5s ease-in-out infinite 0.2s; }
        .grid-item:nth-child(6) { animation: gridFloat 7.5s ease-in-out infinite 0.7s; }
        .grid-item:nth-child(7) { animation: gridFloat 5.5s ease-in-out infinite 1.2s; }
        .grid-item:nth-child(8) { animation: gridFloat 6s ease-in-out infinite 0.3s; }
        .grid-item:nth-child(9) { animation: gridFloat 7s ease-in-out infinite 0.8s; }

        @keyframes gridFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        .grid-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 900;
          color: var(--black);
          transition: all 0.3s ease;
        }

        .grid-item:hover .grid-content {
          color: var(--white);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(37, 99, 235, 0.1));
          pointer-events: none;
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: var(--space-lg);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
          z-index: 10;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: var(--gray-light);
          position: relative;
          overflow: hidden;
        }

        .scroll-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--blue);
          animation: scrollLine 2s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        .scroll-text {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--gray);
          writing-mode: vertical-rl;
        }

        /* Philosophy Section */
        .philosophy {
          padding: var(--space-2xl) var(--space-xl);
          background: var(--black);
          color: var(--white);
          position: relative;
        }

        .philosophy-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-xl);
        }

        .philosophy-block {
          position: relative;
          padding: var(--space-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .philosophy-block:hover {
          border-color: var(--blue);
          transform: translateY(-4px);
        }

        .philosophy-block::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: 0;
          height: 0;
          background: linear-gradient(45deg, var(--blue) 50%, transparent 50%);
          transition: all 0.3s ease;
          opacity: 0;
        }

        .philosophy-block:hover::before {
          width: 20px;
          height: 20px;
          opacity: 1;
        }

        .philosophy-icon {
          font-size: 42px;
          margin-bottom: var(--space-md);
          color: var(--blue);
        }

        .philosophy-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: var(--space-md);
          letter-spacing: -0.5px;
        }

        .philosophy-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: var(--space-lg);
        }

        .philosophy-link {
          color: var(--blue);
          text-decoration: none;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          transition: gap 0.3s ease;
        }

        .philosophy-link:hover {
          gap: var(--space-md);
        }

        /* Features Section */
        .features {
          padding: var(--space-2xl) var(--space-xl);
          background: var(--white);
        }

        .features-header {
          max-width: 1200px;
          margin: 0 auto var(--space-2xl);
          text-align: center;
        }

        .features-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--blue);
          margin-bottom: var(--space-sm);
          position: relative;
          padding: 0 var(--space-lg);
        }

        .features-eyebrow::before,
        .features-eyebrow::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 30px;
          height: 2px;
          background: var(--blue);
        }

        .features-eyebrow::before {
          left: 0;
        }

        .features-eyebrow::after {
          right: 0;
        }

        .features-title {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          color: var(--black);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.2;
        }

        .features-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--gray-light);
          padding: 2px;
        }

        .feature-card {
          background: var(--white);
          padding: var(--space-xl);
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          background: var(--blue);
          transform: translateY(-4px);
        }

        .feature-card:hover .feature-number,
        .feature-card:hover .feature-title,
        .feature-card:hover .feature-desc {
          color: var(--white);
        }

        .feature-number {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 900;
          color: var(--blue);
          margin-bottom: var(--space-md);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .feature-title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: var(--space-sm);
          letter-spacing: -0.3px;
          transition: color 0.3s ease;
        }

        .feature-desc {
          color: var(--gray);
          font-size: 14px;
          line-height: 1.7;
          transition: color 0.3s ease;
        }

        /* Showcase Section */
        .showcase {
          padding: var(--space-2xl) var(--space-xl);
          background: var(--white-off);
        }

        .showcase-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: var(--gray-light);
          padding: 2px;
        }

        .showcase-card {
          background: var(--white);
          padding: var(--space-xl);
          position: relative;
          transition: all 0.3s ease;
        }

        .showcase-card:hover {
          background: var(--black);
        }

        .showcase-card:hover .showcase-category,
        .showcase-card:hover .showcase-title,
        .showcase-card:hover .showcase-desc {
          color: var(--white);
        }

        .showcase-category {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--blue);
          margin-bottom: var(--space-md);
          transition: color 0.3s ease;
        }

        .showcase-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: var(--space-sm);
          letter-spacing: -0.5px;
          transition: color 0.3s ease;
        }

        .showcase-desc {
          color: var(--gray);
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: var(--space-lg);
          transition: color 0.3s ease;
        }

        .showcase-tech {
          display: flex;
          gap: var(--space-xs);
          flex-wrap: wrap;
        }

        .tech-tag {
          padding: var(--space-xs) var(--space-sm);
          background: var(--white-off);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gray);
          border: 1px solid var(--gray-light);
          transition: all 0.3s ease;
        }

        .showcase-card:hover .tech-tag {
          background: rgba(255, 255, 255, 0.1);
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Stats Strip */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: var(--gray-light);
          padding: 2px;
          max-width: 1200px;
          margin: var(--space-2xl) auto 0;
        }

        .stat-block {
          background: var(--white);
          padding: var(--space-xl);
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-block:hover {
          background: var(--blue);
          transform: translateY(-4px);
        }

        .stat-block:hover .stat-number-large,
        .stat-block:hover .stat-label-small {
          color: var(--white);
        }

        .stat-number-large {
          font-family: var(--font-display);
          font-size: 56px;
          font-weight: 900;
          color: var(--blue);
          line-height: 1;
          margin-bottom: var(--space-xs);
          transition: color 0.3s ease;
        }

        .stat-label-small {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gray);
          transition: color 0.3s ease;
        }

        /* Core Idea */
        .core-idea {
          padding: var(--space-2xl) var(--space-xl);
          background: var(--black);
          color: var(--white);
        }

        .core-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px;
        }

        .core-block {
          background: var(--black);
          padding: var(--space-xl);
          position: relative;
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .core-block:hover {
          border-color: var(--blue);
          transform: translateY(-4px);
        }

        .core-block::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: 0;
          height: 0;
          background: linear-gradient(45deg, var(--blue) 50%, transparent 50%);
          transition: all 0.3s ease;
          opacity: 0;
        }

        .core-block:hover::before {
          width: 30px;
          height: 30px;
          opacity: 1;
        }

        .core-icon {
          font-size: 48px;
          margin-bottom: var(--space-lg);
          color: var(--blue);
        }

        .core-quote {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: var(--space-md);
          letter-spacing: -0.3px;
        }

        .core-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 1.7;
        }

        /* CTA Section */
        .cta-section {
          padding: var(--space-2xl) var(--space-xl);
          background: var(--white);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .cta-title {
          font-size: clamp(42px, 5vw, 72px);
          font-weight: 900;
          color: var(--black);
          margin-bottom: var(--space-md);
          letter-spacing: -0.02em;
        }

        .cta-subtitle {
          font-size: 18px;
          color: var(--gray);
          margin-bottom: var(--space-xl);
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
        }

        .cta-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .cta-decoration span {
          position: absolute;
          width: 200px;
          height: 200px;
          background: var(--blue);
          opacity: 0.03;
        }

        .cta-decoration span:nth-child(1) {
          top: -100px;
          left: -100px;
          transform: rotate(45deg);
        }

        .cta-decoration span:nth-child(2) {
          bottom: -100px;
          right: -100px;
          transform: rotate(45deg);
        }

        /* Footer */
        .footer {
          background: var(--black);
          color: var(--white);
          padding: var(--space-2xl) var(--space-xl) var(--space-xl);
        }

        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr repeat(4, 1fr);
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
        }

        .footer-logo {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: var(--space-md);
        }

        .footer-logo span {
          color: var(--blue);
        }

        .footer-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          line-height: 1.8;
          margin-bottom: var(--space-lg);
        }

        .footer-social {
          display: flex;
          gap: var(--space-xs);
        }

        .social-link {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .social-link:hover {
          background: var(--blue);
          border-color: var(--blue);
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: var(--space-lg);
          color: var(--white);
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: var(--space-sm);
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .footer-links a:hover {
          color: var(--blue);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: var(--space-xl);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Parallax sections */
        .parallax-section {
          transition: transform 0.1s ease-out;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero {
            grid-template-columns: 1fr;
          }
          
          .hero-right {
            min-height: 400px;
          }
          
          .features-grid,
          .showcase-grid,
          .core-container,
          .footer-grid,
          .stats-strip,
          .philosophy-grid {
            grid-template-columns: 1fr;
          }
          
          .nav-links {
            display: none;
          }
          
          :root {
            --space-2xl: 48px;
          }
        }
      `}</style>

      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div 
        className="cursor-trail"
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`
        }}
      ></div>

      {/* Navigation */}
      <nav className={`nav ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => scrollToSection("home")}>
          Tech<span>Foliyo</span>
        </div>
        <div className="nav-links">
          <a onClick={() => scrollToSection("philosophy")}>Philosophy</a>
          <a onClick={() => scrollToSection("features")}>Features</a>
          <a onClick={() => scrollToSection("showcase")}>Showcase</a>
          <a onClick={() => scrollToSection("core")}>Core</a>
        </div>
        <div className="nav-actions">
          <button className="btn-outline" onClick={() => navigate("/login")}>Sign In</button>
          <button className="btn-primary" onClick={() => navigate("/signup")}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-left">
          <div className="hero-label">
            <div className="hero-label-line"></div>
            <span className="hero-label-text">Engineering Portfolio Platform</span>
          </div>
          
          <h1 className="hero-title">
            <span className="hero-title-line"><span>Show How You</span></span>
            <span className="hero-title-line"><span className="blue">Think,</span></span>
            <span className="hero-title-line"><span>Not Just What You Build</span></span>
          </h1>
          
          <p className="hero-subtitle">
            Transform your projects into structured case studies that demonstrate 
            engineering maturity, problem-solving approach, and technical depth.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Engineers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">94%</span>
              <span className="stat-label">Hire Rate</span>
            </div>
          </div>
          
          <div className="hero-cta-group">
            <button className="btn-primary btn-large" onClick={() => navigate("/signup")}>
              Start Building
            </button>
            <button className="btn-outline btn-large" onClick={() => scrollToSection("showcase")}>
              View Showcase
            </button>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="grid-system">
            {[...Array(9)].map((_, i) => (
              <div className="grid-item" key={i}>
                <div className="grid-content">
                  {i === 4 ? '🧠' : ''}
                </div>
                <div className="grid-overlay"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="philosophy parallax-section" ref={el => sectionsRef.current[0] = el}>
        <div className="philosophy-grid">
          <div className="philosophy-block">
            <div className="philosophy-icon">🧠</div>
            <h2 className="philosophy-title">Shows decision-making, not just output</h2>
            <p className="philosophy-text">
              Every project documents the journey: problems solved, constraints faced, 
              architectural decisions, trade-offs considered, and lessons learned.
            </p>
            <a href="#" className="philosophy-link">
              Learn More <span>→</span>
            </a>
          </div>

          <div className="philosophy-block">
            <div className="philosophy-icon">📖</div>
            <h2 className="philosophy-title">Converts projects into technical stories</h2>
            <p className="philosophy-text">
              Transform repositories into readable case studies that communicate 
              engineering thinking, not just implementation details.
            </p>
            <a href="#" className="philosophy-link">
              Learn More <span>→</span>
            </a>
          </div>

          <div className="philosophy-block">
            <div className="philosophy-icon">📊</div>
            <h2 className="philosophy-title">Evaluates engineering maturity</h2>
            <p className="philosophy-text">
              Help recruiters assess how you approach complexity, make decisions,
              and handle real-world engineering challenges.
            </p>
            <a href="#" className="philosophy-link">
              Learn More <span>→</span>
            </a>
          </div>

          <div className="philosophy-block">
            <div className="philosophy-icon">🔗</div>
            <h2 className="philosophy-title">Permanent engineering identity</h2>
            <p className="philosophy-text">
              Create a shareable professional identity that grows with your career,
              perfect for interviews, internships, and collaboration.
            </p>
            <a href="#" className="philosophy-link">
              Learn More <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-header">
          <span className="features-eyebrow">What Makes Us Different</span>
          <h2 className="features-title">The Intelligence Behind the Code</h2>
        </div>

        <div className="features-grid">
          {[
            {
              number: "01",
              title: "Problem Documentation",
              desc: "Clearly articulate the problem you're solving and why it matters."
            },
            {
              number: "02",
              title: "Constraint Analysis",
              desc: "Show how you work within technical, business, and time constraints."
            },
            {
              number: "03",
              title: "Architectural Decisions",
              desc: "Explain your system design choices and their implications."
            },
            {
              number: "04",
              title: "Trade-off Evaluation",
              desc: "Demonstrate how you balance competing priorities and make decisions."
            },
            {
              number: "05",
              title: "Complexity Management",
              desc: "Show how you handle and simplify complex engineering challenges."
            },
            {
              number: "06",
              title: "Lessons Learned",
              desc: "Share insights and growth from each project experience."
            }
          ].map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-number">{feature.number}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="stats-strip">
          <div className="stat-block">
            <div className="stat-number-large">73%</div>
            <div className="stat-label-small">Recruiters skip projects without context</div>
          </div>
          <div className="stat-block">
            <div className="stat-number-large">3x</div>
            <div className="stat-label-small">More interviews with case studies</div>
          </div>
          <div className="stat-block">
            <div className="stat-number-large">94%</div>
            <div className="stat-label-small">Better job matches reported</div>
          </div>
          <div className="stat-block">
            <div className="stat-number-large">500+</div>
            <div className="stat-label-small">Companies actively hiring</div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="showcase">
        <div className="features-header">
          <span className="features-eyebrow">Featured Work</span>
          <h2 className="features-title">How Engineers Think</h2>
        </div>

        <div className="showcase-grid">
          {[
            {
              category: "Backend Engineering",
              title: "Distributed Payment System",
              desc: "Designed a fault-tolerant payment system handling 10K+ transactions per second with exactly-once semantics.",
              tech: ["Go", "Kafka", "PostgreSQL", "Redis"]
            },
            {
              category: "Machine Learning",
              title: "Real-time Recommendation Engine",
              desc: "Built a low-latency recommendation system serving personalized content to 5M+ users.",
              tech: ["Python", "TensorFlow", "Ray", "Cassandra"]
            },
            {
              category: "Cloud Architecture",
              title: "Multi-region Kubernetes Platform",
              desc: "Architected a multi-region Kubernetes platform with 99.99% availability and disaster recovery.",
              tech: ["K8s", "AWS", "Terraform", "Istio"]
            },
            {
              category: "Full Stack",
              title: "Collaborative Design Platform",
              desc: "Created a real-time collaborative platform with CRDTs for conflict-free editing.",
              tech: ["React", "Node.js", "WebRTC", "MongoDB"]
            }
          ].map((item, index) => (
            <div className="showcase-card" key={index}>
              <div className="showcase-category">{item.category}</div>
              <h3 className="showcase-title">{item.title}</h3>
              <p className="showcase-desc">{item.desc}</p>
              <div className="showcase-tech">
                {item.tech.map((t, i) => (
                  <span className="tech-tag" key={i}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Idea Section */}
      <section id="core" className="core-idea">
        <div className="features-header">
          <span className="features-eyebrow" style={{ color: 'var(--white)' }}>The Core Idea</span>
          <h2 className="features-title" style={{ color: 'var(--white)' }}>Three Perspectives, One Truth</h2>
        </div>

        <div className="core-container">
          <div className="core-block">
            <div className="core-icon">📝</div>
            <div className="core-quote">"GitHub shows what you wrote."</div>
            <div className="core-text">Code repositories document the output, not the thought process behind it.</div>
          </div>

          <div className="core-block">
            <div className="core-icon">📄</div>
            <div className="core-quote">"A resume shows what you claim."</div>
            <div className="core-text">Traditional resumes list skills and titles without proving understanding.</div>
          </div>

          <div className="core-block">
            <div className="core-icon">🧠</div>
            <div className="core-quote">"TechFoliyo shows how you think."</div>
            <div className="core-text">Structured case studies reveal engineering maturity and problem-solving ability.</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-decoration">
          <span></span>
          <span></span>
        </div>
        <div className="cta-container">
          <h2 className="cta-title">Ready to Show How You Think?</h2>
          <p className="cta-subtitle">
            Join thousands of engineers who are getting hired through structured case studies
            and live project demonstrations. GitHub shows the code. TechFoliyo shows the intelligence.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate("/signup")}>
              Create Your Portfolio
            </button>
            <button className="btn-outline btn-large" onClick={() => scrollToSection("features")}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Tech<span>Foliyo</span></div>
            <p className="footer-text">
              GitHub shows what you wrote. A resume shows what you claim.
              TechFoliyo shows how you think.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">X</a>
              <a href="#" className="social-link">IN</a>
              <a href="#" className="social-link">GH</a>
              <a href="#" className="social-link">LI</a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection("features")}>Features</a></li>
              <li><a onClick={() => scrollToSection("showcase")}>Showcase</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>© 2026 TechFoliyo. All rights reserved.</span>
          <span>Built for engineers who think deeply</span>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;