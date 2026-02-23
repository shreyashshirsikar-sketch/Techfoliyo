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
          /* Premium 20-40-50 Color Scheme */
          --blue-20: #2563EB;
          --blue-dark: #1D4ED8;
          --blue-light: #3B82F6;
          --blue-soft: #60A5FA;
          --blue-mist: #EFF6FF;
          
          --black-40: #0A0A0A;
          --black-light: #1A1A1A;
          --black-soft: #2A2A2A;
          --black-mist: #F5F5F5;
          
          --white-50: #FFFFFF;
          --white-off: #FAFAFA;
          --white-soft: #F3F4F6;
          --white-cream: #F9FAFB;
          
          /* Neutral Colors - Refined */
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
          
          /* Premium Shadows */
          --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
          --shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          --shadow-md: 0 4px 8px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.02);
          --shadow-lg: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
          --shadow-xl: 0 20px 32px -12px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 32px 48px -16px rgba(0, 0, 0, 0.12);
          --shadow-blue: 0 12px 24px -8px rgba(37, 99, 235, 0.15);
          
          /* Transitions */
          --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        body {
          font-family: var(--font-body);
          background: var(--white-50);
          color: var(--black-40);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Premium Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 1rem 2rem;
          transition: all var(--transition-base);
        }

        @media (min-width: 768px) {
          .nav {
            padding: 1.5rem 4rem;
          }
        }

        .nav-scrolled {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          padding: 0.875rem 2rem;
          box-shadow: var(--shadow-md);
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
          position: relative;
        }

        .nav-logo::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--blue-20);
          transition: width var(--transition-base);
        }

        .nav-logo:hover::after {
          width: 100%;
        }

        .nav-logo span {
          color: var(--blue-20);
        }

        .nav-links {
          display: none;
          gap: 3rem;
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
          transition: all var(--transition-fast);
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--blue-20);
          transition: width var(--transition-base);
        }

        .nav-links a:hover {
          color: var(--blue-20);
        }

        .nav-links a:hover::after {
          width: 80%;
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
          transition: all var(--transition-fast);
          border-radius: 8px;
        }

        .btn-ghost:hover {
          color: var(--blue-20);
          background: var(--blue-mist);
        }

        .btn-primary {
          background: var(--black-40);
          color: var(--white-50);
          border: none;
          padding: 0.5rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:hover {
          background: var(--black-light);
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg);
        }

        /* Premium Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          background: var(--white-50);
          position: relative;
          overflow: hidden;
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
          gap: 4rem;
          align-items: center;
          padding: 8rem 0;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
        }

        .hero-left {
          animation: fadeInUp 0.8s var(--transition-bounce);
        }

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

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--blue-mist), var(--white-50));
          color: var(--blue-20);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.5rem 1.25rem;
          margin-bottom: 2rem;
          border-radius: 100px;
          border: 1px solid rgba(37, 99, 235, 0.15);
          box-shadow: var(--shadow-sm);
          letter-spacing: 0.3px;
        }

        .hero-left h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--black-40);
          margin-bottom: 1.5rem;
        }

        .hero-left h1 span {
          color: var(--blue-20);
          display: block;
          position: relative;
          display: inline-block;
        }

        .hero-left p {
          font-size: 1.125rem;
          color: var(--neutral-600);
          margin-bottom: 2.5rem;
          max-width: 500px;
          line-height: 1.7;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .btn-primary-large {
          background: var(--black-40);
          color: var(--white-50);
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-base);
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
        }

        .btn-primary-large::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.8s, height 0.8s;
        }

        .btn-primary-large:hover::before {
          width: 400px;
          height: 400px;
        }

        .btn-primary-large:hover {
          background: var(--black-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .btn-secondary-large {
          background: transparent;
          border: 1.5px solid var(--neutral-300);
          color: var(--neutral-700);
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-base);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }

        .btn-secondary-large::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--blue-20);
          opacity: 0;
          transition: opacity var(--transition-base);
          z-index: -1;
        }

        .btn-secondary-large:hover {
          border-color: var(--blue-20);
          color: var(--white-50);
          transform: translateY(-2px);
          box-shadow: var(--shadow-blue);
        }

        .btn-secondary-large:hover::before {
          opacity: 1;
        }

        .trust-line {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
          color: var(--neutral-500);
        }

        .trust-line::before {
          content: '';
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--blue-20), transparent);
        }

        .hero-right {
          animation: fadeIn 1s var(--transition-slow);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hero-card {
          background: var(--white-50);
          padding: 2.5rem;
          box-shadow: var(--shadow-2xl);
          border: 1px solid var(--neutral-100);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: transform var(--transition-base);
        }

        .hero-card:hover {
          transform: translateY(-4px);
        }

        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, var(--blue-20), var(--blue-light), var(--blue-soft));
        }

        .project-structure {
          background: var(--neutral-50);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .structure-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--neutral-200);
          transition: all var(--transition-fast);
        }

        .structure-item:hover {
          transform: translateX(4px);
        }

        .structure-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .item-label {
          font-weight: 600;
          min-width: 100px;
          color: var(--blue-20);
          font-size: 0.875rem;
          letter-spacing: 0.3px;
        }

        .item-value {
          color: var(--neutral-600);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        /* Premium Section Styles */
        section {
          padding: 6rem 2rem;
        }

        @media (min-width: 768px) {
          section {
            padding: 8rem 4rem;
          }
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .section-header {
          max-width: 600px;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
          color: var(--black-40);
          line-height: 1.2;
        }

        .section-header p {
          color: var(--neutral-600);
          font-size: 1.125rem;
          line-height: 1.7;
        }

        /* Premium Problem Section */
        .problem-section {
          background: var(--white-50);
          position: relative;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .problem-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .problem-card {
          background: var(--white-50);
          border: 1px solid var(--neutral-100);
          padding: 2.5rem;
          transition: all var(--transition-base);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .problem-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue-mist), transparent);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .problem-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-xl);
          transform: translateY(-6px);
        }

        .problem-card:hover::before {
          opacity: 0.5;
        }

        .problem-card .problem-icon {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--white-50);
          background: var(--blue-20);
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          letter-spacing: -0.5px;
          position: relative;
          z-index: 2;
        }

        .problem-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black-40);
          position: relative;
          z-index: 2;
        }

        .problem-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.7;
          position: relative;
          z-index: 2;
        }

        /* Premium Features Section */
        .features-section {
          background: var(--white-off);
          position: relative;
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
          padding: 2.5rem;
          background: var(--white-50);
          border: 1px solid var(--neutral-100);
          transition: all var(--transition-base);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .feature-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--blue-20), var(--blue-light));
          transform: scaleX(0);
          transition: transform var(--transition-base);
        }

        .feature-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-xl);
          transform: translateY(-6px);
        }

        .feature-card:hover::after {
          transform: scaleX(1);
        }

        .feature-icon {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--white-50);
          background: var(--blue-20);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-base);
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.05) rotate(2deg);
          box-shadow: var(--shadow-blue);
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
          line-height: 1.7;
        }

        /* Premium Audience Section */
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
          padding: 3rem 2rem;
          background: var(--white-50);
          border: 1px solid var(--neutral-100);
          border-radius: 24px;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .audience-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: radial-gradient(circle at 50% 0%, var(--blue-mist), transparent 70%);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .audience-card:hover {
          border-color: var(--blue-20);
          box-shadow: var(--shadow-xl);
          transform: translateY(-6px);
        }

        .audience-card:hover::before {
          opacity: 1;
        }

        .audience-icon {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
          color: var(--white-50);
          background: var(--black-40);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: var(--shadow-lg);
          transition: all var(--transition-base);
          position: relative;
          z-index: 2;
        }

        .audience-card:hover .audience-icon {
          background: var(--blue-20);
          transform: scale(1.05);
        }

        .audience-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black-40);
          position: relative;
          z-index: 2;
        }

        .audience-card p {
          color: var(--neutral-600);
          font-size: 0.9375rem;
          line-height: 1.7;
          position: relative;
          z-index: 2;
        }

        /* Premium Project Types Section */
        .project-types-section {
          background: linear-gradient(135deg, var(--blue-20), var(--blue-dark));
          color: var(--white-50);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .project-types-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTBhMjAgMjAgMCAwIDEgMCA0MCAyMCAyMCAwIDAgMSAwLTQweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==') repeat;
          opacity: 0.1;
          animation: slide 60s linear infinite;
        }

        @keyframes slide {
          from { transform: translateX(0) translateY(0); }
          to { transform: translateX(60px) translateY(60px); }
        }

        .project-types-section h2 {
          color: var(--white-50);
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          position: relative;
          z-index: 2;
        }

        .tag {
          padding: 0.75rem 2rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 100px;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--white-50);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all var(--transition-base);
          cursor: default;
          box-shadow: var(--shadow-md);
        }

        .tag:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: var(--shadow-lg);
        }

        /* Premium CTA Section */
        .cta-section {
          background: var(--white-50);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--blue-mist) 0%, transparent 70%);
          opacity: 0.5;
          animation: rotate 60s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .cta-content h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: var(--black-40);
        }

        .cta-content p {
          color: var(--neutral-600);
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          line-height: 1.7;
        }

        .cta-button-large {
          background: var(--blue-20);
          color: var(--white-50);
          border: none;
          padding: 1.25rem 3.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-base);
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
        }

        .cta-button-large::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 1s, height 1s;
        }

        .cta-button-large:hover::before {
          width: 500px;
          height: 500px;
        }

        .cta-button-large:hover {
          background: var(--blue-dark);
          transform: translateY(-3px);
          box-shadow: var(--shadow-2xl);
        }

        /* Premium Footer */
        .footer {
          background: var(--black-40);
          color: var(--white-50);
          padding: 5rem 2rem 2rem;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--blue-20), transparent);
        }

        @media (min-width: 768px) {
          .footer {
            padding: 5rem 4rem 2rem;
          }
        }

        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
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
          letter-spacing: -0.02em;
        }

        .footer-logo span {
          color: var(--blue-20);
        }

        .footer-desc {
          color: var(--neutral-400);
          font-size: 0.875rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 300px;
        }

        .footer-social {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          color: var(--neutral-400);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .social-link:hover {
          color: var(--white-50);
          background: var(--blue-20);
          border-color: var(--blue-20);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .footer-col h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--white-50);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-link {
          display: block;
          color: var(--neutral-400);
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 0.875rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--blue-20);
          transform: translateX(4px);
        }

        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--neutral-500);
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
          transition: color var(--transition-fast);
          color: var(--neutral-500);
        }

        .footer-bottom-links span:hover {
          color: var(--blue-20);
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
          
          .trust-line::before {
            display: none;
          }
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
            <span className="hero-badge">For engineers, by engineers</span>
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
              <button className="btn-secondary-large" onClick={() => navigate("/explore")}>
                Explore Projects
              </button>
            </div>
            <div className="trust-line">
              Join 10,000+ engineers showcasing their work
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
              <div className="problem-icon">01</div>
              <h3>GitHub shows code without context</h3>
              <p>Recruiters don't have time to download, setup, and run your projects. They need instant evaluation.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">02</div>
              <h3>Resumes list skills without proof</h3>
              <p>Anyone can claim knowledge. Live projects prove you can actually build.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">03</div>
              <h3>Fake projects are common</h3>
              <p>Without live verification, copied projects look the same as real work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem' }}>
            <h2>Built for engineers who mean business</h2>
            <p>Every feature designed to showcase real engineering work.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>Live Project Demo</h3>
              <p>Each project includes a working deployment link so recruiters can test it instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>Project Authenticity Check</h3>
              <p>Live demos + GitHub activity verification helps reduce fake or copied projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>Single Portfolio Link</h3>
              <p>One public profile link to share in job applications instead of just a resume.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">04</div>
              <h3>Internship Drives</h3>
              <p>Startups and companies evaluate students by directly checking live projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">05</div>
              <h3>Like & Feedback</h3>
              <p>Projects receive reactions and feedback to reflect engagement and appreciation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">06</div>
              <h3>Connect Feature</h3>
              <p>Students and recruiters connect for collaboration, internships, or hiring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section id="audience" className="audience-section">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem' }}>
            <h2>Who is this platform for?</h2>
          </div>

          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-icon">01</div>
              <h3>Engineering Students</h3>
              <p>Present your real work professionally and stand out from the crowd with live, verified projects.</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">02</div>
              <h3>Recruiters & Companies</h3>
              <p>Quickly evaluate working projects during internships and placements without running any code.</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">03</div>
              <h3>Training & Placement Cells</h3>
              <p>Simplify campus hiring with verified student project portfolios and direct recruiter connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="project-types-section">
        <div className="section-container">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700 }}>Supported Project Types</h2>
          <div className="tags-container">
            {[
              "Software Engineering Projects",
              "Full-Stack Web Applications",
              "AI/ML Deployable Applications",
              "SaaS/Web-based Systems",
              "Mobile Applications",
              "API Development"
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
              <span className="social-link">Twitter</span>
              <span className="social-link">GitHub</span>
              <span className="social-link">LinkedIn</span>
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
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;