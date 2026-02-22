import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --purple: #5B4FE8;
          --purple-dark: #3730A3;
          --purple-light: #EEF0FF;
          --accent-orange: #FF6B35;
          --accent-yellow: #FFD166;
          --accent-pink: #FFB3C6;
          --accent-blue: #A8DAFF;
          --white: #FFFFFF;
          --off-white: #F7F7FC;
          --dark: #0D0D1A;
          --gray: #6B7280;
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        body { font-family: var(--font-body); background: var(--off-white); overflow-x: hidden; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: rgba(247,247,252,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(91,79,232,0.08);
        }
        .nav-logo {
          font-family: var(--font-display); font-size: 22px; font-weight: 800;
          color: var(--dark); letter-spacing: -0.5px; cursor: pointer;
        }
        .nav-logo span { color: var(--purple); }
        .nav-dot { display: inline-block; width: 8px; height: 8px; background: var(--accent-orange); border-radius: 50%; margin-left: 3px; vertical-align: middle; }
        .nav-links { display: flex; gap: 36px; }
        .nav-links a {
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--gray); text-decoration: none; cursor: pointer;
          transition: color 0.2s; letter-spacing: 0.2px;
        }
        .nav-links a:hover { color: var(--dark); }
        .nav-actions { display: flex; gap: 12px; align-items: center; }
        .btn-ghost {
          padding: 9px 22px; background: transparent;
          border: 1.5px solid rgba(91,79,232,0.3); border-radius: 100px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--purple); cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { background: var(--purple); color: white; border-color: var(--purple); }
        .btn-solid {
          padding: 9px 22px; background: var(--dark);
          border: none; border-radius: 100px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: white; cursor: pointer; transition: all 0.2s;
        }
        .btn-solid:hover { background: var(--purple); transform: translateY(-1px); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* LEFT PANEL */
        .hero-left {
          background: var(--white);
          display: flex; flex-direction: column; justify-content: center;
          padding: 120px 60px 60px 80px;
          position: relative;
        }
        .hero-label {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 28px;
        }
        .hero-label-line {
          width: 36px; height: 2px; background: var(--purple);
        }
        .hero-label-text {
          font-family: var(--font-display); font-size: 13px; font-weight: 600;
          color: var(--purple); text-transform: uppercase; letter-spacing: 2px;
        }
        .hero-title {
          font-family: var(--font-display); font-size: clamp(42px, 5vw, 68px);
          font-weight: 800; line-height: 1.05; color: var(--dark);
          letter-spacing: -2px; margin-bottom: 28px;
        }
        .hero-title em { font-style: normal; color: var(--purple); }
        .hero-subtitle {
          font-size: 16px; line-height: 1.75; color: var(--gray);
          max-width: 420px; margin-bottom: 44px; font-weight: 400;
        }
        .hero-cta-group { display: flex; gap: 16px; align-items: center; }
        .btn-primary {
          padding: 15px 36px; background: var(--dark);
          border: none; border-radius: 100px;
          font-family: var(--font-display); font-size: 15px; font-weight: 700;
          color: white; cursor: pointer; transition: all 0.3s;
          display: flex; align-items: center; gap: 10px;
        }
        .btn-primary:hover { background: var(--purple); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(91,79,232,0.3); }
        .btn-arrow {
          width: 42px; height: 42px; background: transparent;
          border: 1.5px solid rgba(13,13,26,0.2); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; font-size: 18px;
        }
        .btn-arrow:hover { background: var(--dark); color: white; border-color: var(--dark); }
        .scroll-hint {
          margin-top: 64px; display: flex; align-items: center; gap: 14px;
          color: var(--gray); font-size: 13px; font-weight: 500;
        }
        .scroll-circle {
          width: 40px; height: 40px; border: 1.5px solid rgba(13,13,26,0.15);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 16px; animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

        /* RIGHT PANEL */
        .hero-right {
          background: var(--purple);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }

        /* 3D Scene */
        .scene {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .scene-bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: perspective(600px) rotateX(30deg) scale(1.5) translateY(20%);
          transform-origin: bottom;
        }
        .iso-stage {
          position: relative; width: 460px; height: 460px;
          transform: perspective(800px) rotateX(15deg) rotateY(-10deg);
        }

        /* Floating Geometric Shapes */
        .shape {
          position: absolute; border-radius: 8px;
          animation: float linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(2deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        /* Main Platform */
        .platform-base {
          position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%);
          width: 320px; height: 28px;
          background: linear-gradient(135deg, #7C6FF7, #5B4FE8);
          border-radius: 4px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        }
        .platform-base::before {
          content: ''; position: absolute; bottom: -20px; left: 0;
          width: 100%; height: 20px;
          background: linear-gradient(to bottom, #4338CA, #3730A3);
          transform-origin: top;
          clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
          border-radius: 0 0 4px 4px;
        }

        /* Cube 1 - Pink top */
        .cube-pink {
          position: absolute; top: 30px; right: 50px;
          animation: float 5s ease-in-out infinite;
        }
        .cube-pink .face-top {
          width: 90px; height: 52px;
          background: linear-gradient(135deg, #FFD1DC, #FFB3C6);
          transform: skewX(-30deg) skewY(0deg);
          border-radius: 6px;
          box-shadow: 0 -6px 20px rgba(255,179,198,0.4);
        }
        .cube-pink .face-left {
          width: 90px; height: 70px;
          background: linear-gradient(135deg, #E8A0B4, #D4789E);
          transform: skewY(20deg) translateY(-4px);
          border-radius: 0 0 0 6px;
        }
        .cube-pink .face-right {
          width: 50px; height: 70px;
          background: linear-gradient(135deg, #C96E8A, #B5506E);
          transform: skewY(-30deg) translateX(88px) translateY(-74px);
          border-radius: 0 6px 6px 0;
        }

        /* Big Blue Platform Cube */
        .cube-platform {
          position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%);
        }
        .cube-platform .face-top {
          width: 300px; height: 160px;
          background: linear-gradient(135deg, #A5B4FC, #818CF8);
          transform: skewX(-30deg) skewY(5deg);
          border-radius: 8px;
          box-shadow: 0 -8px 40px rgba(129,140,248,0.5);
        }
        .cube-platform .face-left {
          width: 300px; height: 80px;
          background: linear-gradient(135deg, #6366F1, #4F46E5);
          transform: skewY(18deg) translateY(-6px);
          border-radius: 0 0 0 8px;
        }
        .cube-platform .face-right {
          width: 90px; height: 80px;
          background: linear-gradient(135deg, #3730A3, #312E81);
          transform: skewY(-35deg) translateX(294px) translateY(-90px);
          border-radius: 0 8px 8px 0;
        }

        /* Yellow/Gold Cube */
        .cube-gold {
          position: absolute; bottom: 200px; right: 30px;
          animation: float 6.5s ease-in-out infinite 1s;
        }
        .cube-gold .face-top {
          width: 100px; height: 56px;
          background: linear-gradient(135deg, #FFE17D, #FFD166);
          transform: skewX(-30deg);
          border-radius: 6px;
          box-shadow: 0 -6px 24px rgba(255,209,102,0.5);
        }
        .cube-gold .face-left {
          width: 100px; height: 70px;
          background: linear-gradient(135deg, #E6B84A, #D4A017);
          transform: skewY(20deg) translateY(-4px);
          border-radius: 0 0 0 6px;
        }
        .cube-gold .face-right {
          width: 55px; height: 70px;
          background: linear-gradient(135deg, #C49A1A, #A67C00);
          transform: skewY(-30deg) translateX(98px) translateY(-74px);
          border-radius: 0 6px 6px 0;
        }

        /* Small White Cube */
        .cube-white-sm {
          position: absolute; top: 120px; left: 60px;
          animation: float 4s ease-in-out infinite 0.5s;
        }
        .cube-white-sm .face-top {
          width: 55px; height: 32px;
          background: rgba(255,255,255,0.9);
          transform: skewX(-30deg);
          border-radius: 4px;
        }
        .cube-white-sm .face-left {
          width: 55px; height: 40px;
          background: rgba(220,220,235,0.8);
          transform: skewY(20deg) translateY(-3px);
        }
        .cube-white-sm .face-right {
          width: 32px; height: 40px;
          background: rgba(190,190,210,0.8);
          transform: skewY(-30deg) translateX(53px) translateY(-44px);
        }

        /* Small Pink Cube bottom left */
        .cube-pink-sm {
          position: absolute; bottom: 160px; left: 40px;
          animation: float 5.5s ease-in-out infinite 2s;
        }
        .cube-pink-sm .face-top {
          width: 50px; height: 28px;
          background: linear-gradient(135deg, #FFD1DC, #FFB3C6);
          transform: skewX(-30deg);
          border-radius: 4px;
        }
        .cube-pink-sm .face-left {
          width: 50px; height: 36px;
          background: linear-gradient(135deg, #E8A0B4, #D4789E);
          transform: skewY(20deg) translateY(-3px);
        }
        .cube-pink-sm .face-right {
          width: 28px; height: 36px;
          background: #C96E8A;
          transform: skewY(-30deg) translateX(48px) translateY(-40px);
        }

        /* Balls */
        .ball {
          position: absolute; border-radius: 50%;
          animation: float ease-in-out infinite;
        }
        .ball-white {
          width: 32px; height: 32px;
          background: radial-gradient(circle at 35% 35%, white, #D0D0E8);
          box-shadow: inset -4px -4px 8px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.2);
          bottom: 200px; left: 135px;
          animation-duration: 4.5s; animation-delay: 0.3s;
        }
        .ball-orange {
          width: 40px; height: 40px;
          background: radial-gradient(circle at 35% 35%, #FF9A6C, #FF6B35);
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.2), 0 10px 24px rgba(255,107,53,0.4);
          bottom: 210px; left: 180px;
          animation-duration: 5s; animation-delay: 1.2s;
        }
        .ball-white-sm {
          width: 24px; height: 24px;
          background: radial-gradient(circle at 35% 35%, white, #C8C8E0);
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.15), 0 6px 16px rgba(0,0,0,0.15);
          bottom: 80px; right: 60px;
          animation-duration: 6s; animation-delay: 0.8s;
        }

        /* Hole */
        .hole {
          position: absolute; bottom: 196px; left: 168px;
          width: 28px; height: 14px;
          background: radial-gradient(ellipse, #1A1040, #0D0820);
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* ===================== SECTIONS ===================== */
        .section-wrapper { background: white; }
        .section-purple { background: var(--purple); }
        .section-offwhite { background: var(--off-white); }

        .section-inner {
          max-width: 1200px; margin: 0 auto; padding: 100px 48px;
        }

        .section-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
        }
        .eyebrow-line { width: 28px; height: 2px; background: var(--purple); }
        .eyebrow-text {
          font-family: var(--font-display); font-size: 12px; font-weight: 700;
          color: var(--purple); text-transform: uppercase; letter-spacing: 2.5px;
        }
        .eyebrow-line-white { background: rgba(255,255,255,0.6); }
        .eyebrow-text-white { color: rgba(255,255,255,0.7); }

        .section-title {
          font-family: var(--font-display); font-size: clamp(32px, 4vw, 52px);
          font-weight: 800; line-height: 1.1; letter-spacing: -1.5px; color: var(--dark);
          margin-bottom: 16px;
        }
        .section-title-white { color: white; }
        .section-subtitle {
          font-size: 17px; line-height: 1.7; color: var(--gray); max-width: 600px;
        }
        .section-subtitle-white { color: rgba(255,255,255,0.7); }

        /* PROBLEM SECTION */
        .problem-layout {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .problem-text-large {
          font-family: var(--font-display); font-size: 22px; font-weight: 600;
          line-height: 1.6; color: var(--dark); letter-spacing: -0.3px;
        }
        .problem-text-large span { color: var(--purple); }
        .problem-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .problem-stat {
          background: var(--off-white); border-radius: 16px; padding: 28px;
          border: 1px solid rgba(91,79,232,0.08);
        }
        .problem-stat-num {
          font-family: var(--font-display); font-size: 42px; font-weight: 800;
          color: var(--purple); letter-spacing: -2px; line-height: 1;
          margin-bottom: 8px;
        }
        .problem-stat-label { font-size: 13px; color: var(--gray); line-height: 1.5; }

        /* FEATURES */
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 60px; }
        .feature-card {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px; padding: 32px;
          transition: all 0.3s; cursor: default;
          backdrop-filter: blur(10px);
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.18); transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.15);
        }
        .feature-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 20px;
        }
        .feature-title {
          font-family: var(--font-display); font-size: 18px; font-weight: 700;
          color: white; margin-bottom: 10px; letter-spacing: -0.3px;
        }
        .feature-desc { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.65; }

        /* AUDIENCE */
        .audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 60px; }
        .audience-card {
          background: white; border-radius: 24px; padding: 40px 32px;
          box-shadow: 0 4px 24px rgba(91,79,232,0.07);
          border: 1px solid rgba(91,79,232,0.06);
          transition: all 0.3s;
        }
        .audience-card:hover {
          transform: translateY(-8px); box-shadow: 0 20px 48px rgba(91,79,232,0.14);
        }
        .audience-icon { font-size: 44px; margin-bottom: 20px; display: block; }
        .audience-title {
          font-family: var(--font-display); font-size: 22px; font-weight: 700;
          color: var(--dark); margin-bottom: 12px; letter-spacing: -0.5px;
        }
        .audience-desc { font-size: 15px; color: var(--gray); line-height: 1.65; }

        /* PROJECT TYPES */
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
        .tag {
          padding: 12px 24px; background: white; border-radius: 100px;
          font-size: 14px; font-weight: 500; color: var(--dark);
          border: 1.5px solid rgba(91,79,232,0.12);
          transition: all 0.2s; cursor: default;
        }
        .tag:hover { background: var(--purple); color: white; border-color: var(--purple); }

        /* CTA SECTION */
        .cta-section {
          background: var(--dark); padding: 100px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(91,79,232,0.35) 0%, transparent 70%);
        }
        .cta-inner { position: relative; max-width: 640px; margin: 0 auto; }
        .cta-title {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 56px);
          font-weight: 800; color: white; letter-spacing: -2px; line-height: 1.1;
          margin-bottom: 20px;
        }
        .cta-subtitle { font-size: 17px; color: rgba(255,255,255,0.55); margin-bottom: 44px; line-height: 1.6; }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 40px; background: var(--purple);
          border: none; border-radius: 100px;
          font-family: var(--font-display); font-size: 16px; font-weight: 700;
          color: white; cursor: pointer; transition: all 0.3s;
        }
        .cta-btn:hover {
          background: white; color: var(--purple);
          transform: translateY(-3px); box-shadow: 0 16px 40px rgba(255,255,255,0.15);
        }

        /* FOOTER */
        .footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06); }
        .footer-inner { max-width: 1200px; margin: 0 auto; padding: 72px 48px 36px; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
        .footer-logo { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: white; margin-bottom: 16px; }
        .footer-logo span { color: var(--purple); }
        .footer-desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 24px; }
        .footer-socials { display: flex; gap: 10px; }
        .social-btn {
          width: 36px; height: 36px; background: rgba(255,255,255,0.07);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 14px; cursor: pointer; transition: all 0.2s;
        }
        .social-btn:hover { background: var(--purple); transform: translateY(-2px); }
        .footer-col-title {
          font-family: var(--font-display); font-size: 14px; font-weight: 700;
          color: white; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;
        }
        .footer-link {
          display: block; font-size: 14px; color: rgba(255,255,255,0.4);
          text-decoration: none; margin-bottom: 12px; cursor: pointer;
          transition: color 0.2s;
        }
        .footer-link:hover { color: white; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .footer-bottom-text { font-size: 13px; color: rgba(255,255,255,0.3); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-right { display: none; }
          .hero-left { padding: 120px 32px 60px; }
          .features-grid { grid-template-columns: 1fr 1fr; }
          .audience-grid { grid-template-columns: 1fr; }
          .problem-layout { grid-template-columns: 1fr; gap: 40px; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .nav { padding: 16px 24px; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollToSection("home")}>
          Tech<span>Foliyo</span><span className="nav-dot"></span>
        </div>
        <div className="nav-links">
          <a onClick={() => scrollToSection("home")}>Home</a>
          <a onClick={() => scrollToSection("features")}>Features</a>
          <a onClick={() => scrollToSection("problem")}>Problem</a>
          <a onClick={() => scrollToSection("audience")}>For Whom</a>
          <a onClick={() => scrollToSection("contact")}>Contact</a>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => navigate("/login")}>Login</button>
          <button className="btn-solid" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </nav>

    {/* HERO */}
<section id="home" className="hero">

  {/* Left */}
  <div className="hero-left">
    <div className="hero-label">
      <div className="hero-label-line"></div>
      <span className="hero-label-text">
        Portfolio Platform for Engineers
      </span>
    </div>

    <h1 className="hero-title">
      Showcase Your<br />
      Live Projects.<br />
      <em>Get Hired Faster.</em>
    </h1>

    <p className="hero-subtitle">
      Stop sharing just code. Let recruiters see your projects in action.
      TechFoliyo helps engineers build professional portfolios with live,
      working applications.
    </p>

    <div className="hero-cta-group">
      <button
        className="btn-primary"
        onClick={() => navigate("/signup")}
      >
        Get Started Free
        <span>→</span>
      </button>

      <button
        className="btn-arrow"
        onClick={() => scrollToSection("features")}
      >
        ↓
      </button>
    </div>

    <div className="scroll-hint">
      <div className="scroll-circle">↓</div>
      <span>Scroll down</span>
    </div>
  </div>

  {/* Right — Image */}
  <div className="hero-right">

    <img
      src="/cubes.jpg"
      alt="3D cubes"
      style={{
        width: "95%",          // stretched little
        height: "95%",         // stretched little
        objectFit: "cover",    // removes side borders
        borderRadius: "12px",
        display: "block"
      }}
    />

  </div>

</section>
      {/* PROBLEM SECTION */}
      <section id="problem" className="section-wrapper">
        <div className="section-inner">
          <div className="problem-layout">
            <div>
              <div className="section-eyebrow">
                <div className="eyebrow-line"></div>
                <span className="eyebrow-text">The Problem</span>
              </div>
              <h2 className="section-title">The hiring gap<br />we're closing.</h2>
            </div>
            <div>
              <p className="problem-text-large">
                Current platforms showcase <span>source code rather than functional apps</span>, making it hard
                to assess real execution. Recruiters don't have time to download and run every project.
                TechFoliyo provides direct access to live, working demos for effective evaluation.
              </p>
              <div className="problem-stat-grid" style={{marginTop: 32}}>
                {[
                  { num: "73%", label: "Recruiters skip projects without live demos" },
                  { num: "5s", label: "Average time spent on a portfolio before bouncing" },
                  { num: "3×", label: "More interviews with live demo portfolios" },
                  { num: "10K+", label: "Engineers already on the platform" },
                ].map((s, i) => (
                  <div className="problem-stat" key={i}>
                    <div className="problem-stat-num">{s.num}</div>
                    <div className="problem-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section-purple">
        <div className="section-inner">
          <div className="section-eyebrow">
            <div className="eyebrow-line eyebrow-line-white"></div>
            <span className="eyebrow-text eyebrow-text-white">Why TechFoliyo</span>
          </div>
          <h2 className="section-title section-title-white">Built for engineers<br />who mean business.</h2>
          <div className="features-grid">
            {[
              { icon: "🚀", title: "Live Project Demo", desc: "Each project includes a working deployment link so recruiters can test it instantly." },
              { icon: "🔍", title: "Anti-Copy Protection", desc: "Live demos + GitHub activity verification helps reduce fake or copied projects." },
              { icon: "📱", title: "Single Portfolio Link", desc: "One public profile link to share in job applications instead of just a resume." },
              { icon: "💼", title: "Internship Drives", desc: "Startups and companies evaluate students by directly checking live projects." },
              { icon: "❤️", title: "Like & Feedback", desc: "Projects receive reactions and feedback to reflect engagement and appreciation." },
              { icon: "🤝", title: "Connect Feature", desc: "Students and recruiters connect for collaboration, internships, or hiring." }
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience" className="section-offwhite">
        <div className="section-inner">
          <div className="section-eyebrow">
            <div className="eyebrow-line"></div>
            <span className="eyebrow-text">Who It's For</span>
          </div>
          <h2 className="section-title">A platform built<br />for everyone in hiring.</h2>
          <div className="audience-grid">
            {[
              { icon: "👨‍🎓", title: "Engineering Students", desc: "Present your real work professionally and stand out from the crowd with live, verified projects." },
              { icon: "👔", title: "Recruiters & Companies", desc: "Quickly evaluate working projects during internships and placements without running any code." },
              { icon: "🏢", title: "T&P Cells", desc: "Simplify campus hiring with verified student project portfolios and direct recruiter connections." }
            ].map((a, i) => (
              <div className="audience-card" key={i}>
                <span className="audience-icon">{a.icon}</span>
                <div className="audience-title">{a.title}</div>
                <div className="audience-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT TYPES */}
      <section className="section-wrapper">
        <div className="section-inner" style={{paddingTop: 80, paddingBottom: 80}}>
          <div className="section-eyebrow">
            <div className="eyebrow-line"></div>
            <span className="eyebrow-text">Supported Projects</span>
          </div>
          <h2 className="section-title">Whatever you've built,<br />we'll showcase it.</h2>
          <div className="tags-wrap">
            {["Software Engineering Projects", "Full-Stack Web Applications", "AI/ML Deployable Applications", "SaaS/Web-based Systems", "Mobile Apps", "API Development"].map((t, i) => (
              <span className="tag" key={i}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to Showcase Your Work?</h2>
          <p className="cta-subtitle">Join thousands of engineers getting hired through live project demonstrations.</p>
          <button className="cta-btn" onClick={() => navigate("/signup")}>
            Create Your Portfolio Now <span>→</span>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Tech<span>Foliyo</span></div>
              <p className="footer-desc">Building bridges between engineers and recruiters through live project demonstrations.</p>
              <div className="footer-socials">
                {["f", "𝕏", "in", "📷"].map((icon, i) => (
                  <div className="social-btn" key={i}>{icon}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <span className="footer-link" onClick={() => scrollToSection("home")}>Home</span>
              <span className="footer-link" onClick={() => scrollToSection("features")}>Features</span>
              <span className="footer-link" onClick={() => scrollToSection("problem")}>Problem</span>
              <span className="footer-link" onClick={() => scrollToSection("audience")}>For Whom</span>
            </div>
            <div>
              <div className="footer-col-title">Students</div>
              <span className="footer-link" onClick={() => navigate("/signup")}>Create Portfolio</span>
              <span className="footer-link" onClick={() => navigate("/login")}>Login</span>
              <span className="footer-link">Browse Projects</span>
              <span className="footer-link">Success Stories</span>
            </div>
            <div>
              <div className="footer-col-title">Recruiters</div>
              <span className="footer-link">How It Works</span>
              <span className="footer-link">Search Candidates</span>
              <span className="footer-link">Pricing</span>
              <span className="footer-link">Contact Sales</span>
            </div>
            <div>
              <div className="footer-col-title">Support</div>
              <span className="footer-link">Help Center</span>
              <span className="footer-link">FAQs</span>
              <span className="footer-link">Privacy Policy</span>
              <span className="footer-link">Terms of Service</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-bottom-text">© 2026 TechFoliyo. All rights reserved.</span>
            <span className="footer-bottom-text">Made with ❤️ for engineers</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;