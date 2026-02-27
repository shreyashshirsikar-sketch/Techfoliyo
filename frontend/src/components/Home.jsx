import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [filter, setFilter] = useState("Feed");

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

  // Different images for different filters
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

  // Get images based on filter
  const getImages = () => {
    switch(filter) {
      case "Trending": return trendingImages;
      case "Machine Learning": return mlImages;
      case "Web Development": return webImages;
      case "Open Source": return openSourceImages;
      default: return feedImages;
    }
  };

  // Different projects for different filters
  const projects = {
    Feed: [
      { title: "AI Portfolio Builder", desc: "Enterprise-grade automation tool for generating dynamic developer portfolios.", tech: ["React", "OpenAI", "Node.js"], author: "Alex Chen", likes: "1.2k", views: "14k" },
      { title: "Modern SaaS Landing", desc: "High-conversion landing page optimized for tech enterprises.", tech: ["Vue 3", "Tailwind"], author: "David Koh", likes: "2.1k", views: "12k" },
      { title: "Cloud Code Editor", desc: "Collaborative browser-based IDE with integrated terminal.", tech: ["Monaco", "Vite"], author: "Tom Aris", likes: "532", views: "3.2k" },
      { title: "Headless Commerce", desc: "Ultra-fast GraphQL backend for large scale retail operations.", tech: ["Golang", "PostgreSQL"], author: "Rick Wang", likes: "1.1k", views: "8.4k" },
      { title: "Developer Network", desc: "Niche community platform for cross-functional tech collaboration.", tech: ["React Native", "GraphQL"], author: "Julia Reed", likes: "3.9k", views: "45k" },
      { title: "Health & Habit Tracker", desc: "Gamified productivity app focusing on holistic wellness and habits.", tech: ["Flutter", "Firebase"], author: "Elena Gomez", likes: "1.5k", views: "9k" },
      { title: "Cloud Metrics Dashboard", desc: "Real-time AWS infrastructure monitoring and visualization tool.", tech: ["Next.js", "Go", "AWS"], author: "Sarah Jenkins", likes: "842", views: "5.1k" },
      { title: "Web3 Asset Wallet", desc: "Multi-chain decentralized wallet for secure digital asset management.", tech: ["Solidity", "Ethers.js"], author: "Marcus Wright", likes: "2.4k", views: "22k" }
    ],
    Trending: [
      { title: "Developer Network", desc: "Niche community platform for cross-functional tech collaboration.", tech: ["React Native", "GraphQL"], author: "Julia Reed", likes: "3.9k", views: "45k" },
      { title: "Web3 Asset Wallet", desc: "Multi-chain decentralized wallet for secure digital asset management.", tech: ["Solidity", "Ethers.js"], author: "Marcus Wright", likes: "2.4k", views: "22k" },
      { title: "Cloud Metrics Dashboard", desc: "Real-time AWS infrastructure monitoring and visualization tool.", tech: ["Next.js", "Go", "AWS"], author: "Sarah Jenkins", likes: "842", views: "5.1k" },
      { title: "AI Portfolio Builder", desc: "Enterprise-grade automation tool for generating dynamic developer portfolios.", tech: ["React", "OpenAI", "Node.js"], author: "Alex Chen", likes: "1.2k", views: "14k" },
      { title: "Headless Commerce", desc: "Ultra-fast GraphQL backend for large scale retail operations.", tech: ["Golang", "PostgreSQL"], author: "Rick Wang", likes: "1.1k", views: "8.4k" },
      { title: "Health & Habit Tracker", desc: "Gamified productivity app focusing on holistic wellness and habits.", tech: ["Flutter", "Firebase"], author: "Elena Gomez", likes: "1.5k", views: "9k" },
      { title: "Modern SaaS Landing", desc: "High-conversion landing page optimized for tech enterprises.", tech: ["Vue 3", "Tailwind"], author: "David Koh", likes: "2.1k", views: "12k" },
      { title: "Cloud Code Editor", desc: "Collaborative browser-based IDE with integrated terminal.", tech: ["Monaco", "Vite"], author: "Tom Aris", likes: "532", views: "3.2k" }
    ],
    "Machine Learning": [
      { title: "AI Portfolio Builder", desc: "Enterprise-grade automation tool for generating dynamic developer portfolios.", tech: ["React", "OpenAI", "Node.js"], author: "Alex Chen", likes: "1.2k", views: "14k" },
      { title: "Neural Style Transfer", desc: "Deep learning app that transforms photos into artistic styles.", tech: ["Python", "TensorFlow", "Flask"], author: "Sam Lee", likes: "3.2k", views: "28k" },
      { title: "ML Model Deployer", desc: "One-click deployment platform for machine learning models.", tech: ["PyTorch", "Docker", "K8s"], author: "Priya Patel", likes: "892", views: "6.1k" },
      { title: "Chatbot Builder", desc: "No-code platform for creating intelligent chatbots.", tech: ["NLP", "React", "FastAPI"], author: "Mike Ross", likes: "1.8k", views: "15k" },
      { title: "Image Recognition API", desc: "High-performance image classification and detection API.", tech: ["Python", "OpenCV", "AWS"], author: "Lisa Wong", likes: "2.3k", views: "19k" },
      { title: "Developer Network", desc: "Niche community platform for cross-functional tech collaboration.", tech: ["React Native", "GraphQL"], author: "Julia Reed", likes: "3.9k", views: "45k" },
      { title: "Cloud Metrics Dashboard", desc: "Real-time AWS infrastructure monitoring and visualization tool.", tech: ["Next.js", "Go", "AWS"], author: "Sarah Jenkins", likes: "842", views: "5.1k" },
      { title: "Web3 Asset Wallet", desc: "Multi-chain decentralized wallet for secure digital asset management.", tech: ["Solidity", "Ethers.js"], author: "Marcus Wright", likes: "2.4k", views: "22k" }
    ],
    "Web Development": [
      { title: "Modern SaaS Landing", desc: "High-conversion landing page optimized for tech enterprises.", tech: ["Vue 3", "Tailwind"], author: "David Koh", likes: "2.1k", views: "12k" },
      { title: "Cloud Code Editor", desc: "Collaborative browser-based IDE with integrated terminal.", tech: ["Monaco", "Vite"], author: "Tom Aris", likes: "532", views: "3.2k" },
      { title: "Headless Commerce", desc: "Ultra-fast GraphQL backend for large scale retail operations.", tech: ["Golang", "PostgreSQL"], author: "Rick Wang", likes: "1.1k", views: "8.4k" },
      { title: "Next.js Dashboard", desc: "Admin dashboard with real-time data visualization.", tech: ["Next.js", "Tailwind", "Chart.js"], author: "James Wilson", likes: "4.1k", views: "32k" },
      { title: "GraphQL Gateway", desc: "Unified GraphQL gateway for microservices architecture.", tech: ["GraphQL", "Node.js", "Apollo"], author: "Emma Davis", likes: "1.4k", views: "11k" },
      { title: "AI Portfolio Builder", desc: "Enterprise-grade automation tool for generating dynamic developer portfolios.", tech: ["React", "OpenAI", "Node.js"], author: "Alex Chen", likes: "1.2k", views: "14k" },
      { title: "Developer Network", desc: "Niche community platform for cross-functional tech collaboration.", tech: ["React Native", "GraphQL"], author: "Julia Reed", likes: "3.9k", views: "45k" },
      { title: "Health & Habit Tracker", desc: "Gamified productivity app focusing on holistic wellness and habits.", tech: ["Flutter", "Firebase"], author: "Elena Gomez", likes: "1.5k", views: "9k" }
    ],
    "Open Source": [
      { title: "Cloud Code Editor", desc: "Collaborative browser-based IDE with integrated terminal.", tech: ["Monaco", "Vite"], author: "Tom Aris", likes: "532", views: "3.2k" },
      { title: "Developer Network", desc: "Niche community platform for cross-functional tech collaboration.", tech: ["React Native", "GraphQL"], author: "Julia Reed", likes: "3.9k", views: "45k" },
      { title: "Web3 Asset Wallet", desc: "Multi-chain decentralized wallet for secure digital asset management.", tech: ["Solidity", "Ethers.js"], author: "Marcus Wright", likes: "2.4k", views: "22k" },
      { title: "React Component Library", desc: "Open source UI component library for React developers.", tech: ["React", "TypeScript", "Storybook"], author: "Chris Evans", likes: "5.2k", views: "48k" },
      { title: "DevOps Toolkit", desc: "Collection of scripts and tools for DevOps automation.", tech: ["Bash", "Python", "Docker"], author: "Taylor Swift", likes: "3.8k", views: "29k" },
      { title: "AI Portfolio Builder", desc: "Enterprise-grade automation tool for generating dynamic developer portfolios.", tech: ["React", "OpenAI", "Node.js"], author: "Alex Chen", likes: "1.2k", views: "14k" },
      { title: "Headless Commerce", desc: "Ultra-fast GraphQL backend for large scale retail operations.", tech: ["Golang", "PostgreSQL"], author: "Rick Wang", likes: "1.1k", views: "8.4k" },
      { title: "Cloud Metrics Dashboard", desc: "Real-time AWS infrastructure monitoring and visualization tool.", tech: ["Next.js", "Go", "AWS"], author: "Sarah Jenkins", likes: "842", views: "5.1k" }
    ]
  };

  const getProjects = () => {
    return projects[filter] || projects.Feed;
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
          padding: 0 2rem;
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
          gap: 1.5rem;
          align-items: center;
        }

        /* Simple black icons */
        .icon-btn {
          background: transparent;
          border: none;
          color: var(--black-40);
          font-size: 1.3rem;
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
        }

        .icon-btn:hover {
          color: var(--blue-20);
        }

        .btn-create {
          background: var(--black-40);
          color: var(--white-50);
          border: none;
          padding: 0.5rem 1.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 0px;
          transition: none;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--neutral-200);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--neutral-600);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .avatar:hover {
          background: var(--blue-20);
          color: var(--white-50);
        }

        /* Search Bar */
        .search-section {
          padding-top: 90px;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 2rem;
          padding-right: 2rem;
        }

        @media (min-width: 768px) {
          .search-section {
            padding-left: 4rem;
            padding-right: 4rem;
          }
        }

        .search-bar {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border: 1px solid var(--neutral-200);
          border-radius: 12px;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
          margin-bottom: 2rem;
        }

        .search-bar:focus {
          border-color: var(--blue-20);
          box-shadow: 0 0 0 4px var(--blue-mist);
        }

        /* Main Content */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 2rem;
          padding-right: 2rem;
        }

        @media (min-width: 768px) {
          .main-content {
            padding-left: 4rem;
            padding-right: 4rem;
          }
        }

        /* Welcome Section */
        .welcome-section {
          margin-bottom: 1.5rem;
        }

        .welcome-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--black-40);
          margin-bottom: 0.25rem;
        }

        .welcome-subtitle {
          color: var(--neutral-600);
          font-size: 1rem;
        }

        /* Filter Pills - White */
        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .pill {
          padding: 0.5rem 1.25rem;
          border-radius: 0px;
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          color: var(--neutral-600);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: none;
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .projects-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Project Card - No hover effects */
        .project-card {
          background: var(--white-50);
          border: 1px solid var(--neutral-200);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: none;
        }

        .project-image {
          height: 160px;
          background-size: cover;
          background-position: center;
        }

        .project-content {
          padding: 1.25rem;
        }

        .project-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.125rem;
          color: var(--black-40);
          margin-bottom: 0.5rem;
        }

        .project-desc {
          font-size: 0.875rem;
          color: var(--neutral-600);
          margin-bottom: 1rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .project-tag {
          background: var(--blue-mist);
          color: var(--blue-20);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
        }

        .project-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--neutral-500);
        }

        .project-author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .author-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--neutral-200);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--neutral-600);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .project-stats {
          display: flex;
          gap: 0.75rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Show More Button - Square */
        .show-more-container {
          text-align: center;
          margin: 3rem 0 4rem;
        }

        .show-more-btn {
          background: transparent;
          border: 1px solid var(--neutral-200);
          color: var(--neutral-600);
          padding: 0.75rem 2rem;
          border-radius: 0px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .show-more-btn:hover {
          border-color: var(--blue-20);
          color: var(--blue-20);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* Footer */
        .footer {
          background: var(--black-40);
          color: var(--white-50);
          padding: 4rem 2rem 2rem;
        }

        @media (min-width: 768px) {
          .footer {
            padding: 4rem 4rem 2rem;
          }
        }

        .footer-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 0 2rem;
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
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid var(--neutral-800);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--neutral-400);
          font-size: 0.8125rem;
          padding: 2rem 2rem 0;
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
          color: var(--neutral-400);
        }

        .footer-bottom-links span:hover {
          color: var(--blue-20);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")}>
            tech<span>foliyo</span>
          </div>
          <div className="nav-right">
            {/* Simple black icons */}
            <button className="icon-btn">✉</button>
            <button className="icon-btn">🔔</button>
            <button className="btn-create">+ Create Project</button>
            {/* Profile icon that navigates to profile page */}
            <div className="avatar" onClick={() => navigate("/profile")}>👤</div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-section">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for projects, developers, or tech stacks..."
        />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, Alex</h1>
          <p className="welcome-subtitle">Discover projects from the community</p>
        </div>

        {/* Filter Pills - White */}
        <div className="filter-section">
          <div className="filter-pills">
            <div className="pill" onClick={() => setFilter("Feed")}>Feed</div>
            <div className="pill" onClick={() => setFilter("Trending")}>Trending</div>
            <div className="pill" onClick={() => setFilter("Machine Learning")}>Machine Learning</div>
            <div className="pill" onClick={() => setFilter("Web Development")}>Web Development</div>
            <div className="pill" onClick={() => setFilter("Open Source")}>Open Source</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {getProjects().slice(0, 8).map((project, i) => (
            <div className="project-card" key={i}>
              <div 
                className="project-image"
                style={{ backgroundImage: `url(${getImages()[i % getImages().length]})` }}
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tech.map((t, idx) => (
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
          ))}
        </div>

        {/* Show More Button */}
        <div className="show-more-container">
          <button className="show-more-btn">Show More Projects ↓</button>
        </div>
      </div>

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