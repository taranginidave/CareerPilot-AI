import {
  ArrowRight,
  Brain,
  FileText,
  Mic,
  Target,
  Code2,
  BarChart3,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Route,
  User,
} from "lucide-react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const features = [
    {
      icon: FileText,
      title: "AI Resume Analyzer",
      description:
        "Analyze your resume with AI, get an ATS score, identify missing keywords and improve your resume.",
      link: "/resume-analyzer",
    },
    {
      icon: Mic,
      title: "AI Mock Interview",
      description:
        "Practice realistic AI-powered interviews based on your resume, job role and experience.",
      link: "/mock-interview",
    },
    {
      icon: Target,
      title: "Job Matcher",
      description:
        "Compare your resume with job descriptions and discover your skill match and missing skills.",
      link: "/job-matcher",
    },
    {
      icon: Code2,
      title: "Coding Arena",
      description:
        "Improve your programming skills with DSA, SQL, debugging and coding challenges.",
      link: "/coding-arena",
    },
    {
      icon: BarChart3,
      title: "Skill Gap Analyzer",
      description:
        "Find the skills you need for your target role and understand where you need improvement.",
      link: "/skill-gap",
    },
    {
      icon: Brain,
      title: "AI Learning Roadmap",
      description:
        "Get a personalized learning roadmap designed around your career goals.",
      link: "/learning-roadmap",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Build Your Profile",
      text: "Add your resume, skills, education and career goals.",
    },
    {
      number: "02",
      title: "Analyze Your Skills",
      text: "Let AI identify your strengths, gaps and career opportunities.",
    },
    {
      number: "03",
      title: "Practice & Improve",
      text: "Take mock interviews, solve coding problems and follow your roadmap.",
    },
    {
      number: "04",
      title: "Become Interview Ready",
      text: "Track your progress and confidently apply for your dream jobs.",
    },
  ];

  const tools = [
    {
      name: "Resume Analyzer",
      path: "/resume-analyzer",
      icon: FileText,
    },
    {
      name: "AI Mock Interview",
      path: "/mock-interview",
      icon: Mic,
    },
    {
      name: "Job Matcher",
      path: "/job-matcher",
      icon: Target,
    },
    {
      name: "Coding Arena",
      path: "/coding-arena",
      icon: Code2,
    },
  ];

  const closeMenu = () => {
    setMobileOpen(false);
    setToolsOpen(false);
  };

  return (
    <div className="home-page">

      {/* =====================================================
          CUSTOM NAVBAR
      ===================================================== */}

      <header className="navbar home-navbar">

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <div className="logo-icon">
            <Brain size={19} />
          </div>

          <span>
            Career<span>Pilot</span>
            <small> AI</small>
          </span>
        </Link>

        <nav
          className={`nav-links ${
            mobileOpen ? "mobile-active" : ""
          }`}
        >

          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={closeMenu}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </NavLink>

          {/* Tools */}
          <div className="nav-dropdown">

            <button
              type="button"
              className="nav-dropdown-btn"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              Tools

              <ChevronDown
                size={15}
                className={
                  toolsOpen ? "rotate-icon" : ""
                }
              />
            </button>

            {toolsOpen && (
              <div className="dropdown-menu">

                {tools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={closeMenu}
                    >
                      <Icon size={17} />

                      <span>
                        {tool.name}
                      </span>
                    </Link>
                  );
                })}

              </div>
            )}

          </div>

          <NavLink
            to="/learning-roadmap"
            onClick={closeMenu}
          >
            <Route size={15} />
            Roadmap
          </NavLink>

          <NavLink
            to="/profile"
            onClick={closeMenu}
          >
            <User size={15} />
            Profile
          </NavLink>

        </nav>

        <div className="nav-buttons">

          <button
            type="button"
            className="nav-ai-status"
          >
            <span className="status-dot"></span>
            AI Ready
          </button>

          <button
            type="button"
            className="btn btn-primary nav-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Open Dashboard
            <ArrowRight size={15} />
          </button>

        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-bg-circle circle-one"></div>
        <div className="hero-bg-circle circle-two"></div>

        <div className="hero-grid"></div>

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="badge-dot"></span>

              <Sparkles size={15} />

              AI-Powered Career Platform
            </div>

            <h1>
              Navigate Your Career.
              <br />

              <span>Ace Every Interview.</span>
            </h1>

            <p className="hero-description">
              CareerPilot AI helps you build a stronger resume,
              practice realistic interviews, identify skill gaps
              and become career-ready with the power of artificial
              intelligence.
            </p>

            <div className="hero-buttons">

              <Link
                to="/dashboard"
                className="primary-btn"
              >
                Start Your Journey
                <ArrowRight size={19} />
              </Link>

              <a
                href="#features"
                className="secondary-btn"
              >
                <PlayCircle size={19} />
                Explore Features
              </a>

            </div>

            <div className="hero-trust">

              <div className="trust-users">

                <span>AI</span>
                <span>CV</span>
                <span>IN</span>
                <span>+</span>

              </div>

              <div>
                <strong>
                  Everything you need
                </strong>

                <small>
                  to become interview ready
                </small>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="dashboard-card">

              <div className="dashboard-top">

                <div>

                  <span className="small-label">
                    YOUR CAREER PROFILE
                  </span>

                  <h3>
                    Career Overview
                  </h3>

                </div>

                <div className="profile-dot">
                  <Sparkles size={17} />
                </div>

              </div>


              <div className="score-section">

                <div className="score-circle">

                  <div>
                    <strong>87</strong>
                    <span>/100</span>
                  </div>

                </div>

                <div className="score-info">

                  <span className="score-label">
                    Career Readiness
                  </span>

                  <h4>
                    Great Progress!
                  </h4>

                  <p>
                    Your profile is looking strong.
                  </p>

                </div>

              </div>


              <div className="progress-list">

                <div className="progress-item">

                  <div className="progress-title">
                    <span>Resume Strength</span>
                    <strong>92%</strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      style={{
                        width: "92%",
                      }}
                    ></div>
                  </div>

                </div>


                <div className="progress-item">

                  <div className="progress-title">
                    <span>Technical Skills</span>
                    <strong>84%</strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      style={{
                        width: "84%",
                      }}
                    ></div>
                  </div>

                </div>


                <div className="progress-item">

                  <div className="progress-title">
                    <span>
                      Interview Readiness
                    </span>

                    <strong>78%</strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      style={{
                        width: "78%",
                      }}
                    ></div>
                  </div>

                </div>

              </div>


              <div className="dashboard-bottom">

                <CheckCircle2 size={17} />

                <span>
                  You're making excellent progress
                </span>

              </div>

            </div>


            {/* Interview Floating Card */}

            <div className="floating-card interview-card">

              <div className="floating-icon">
                <Mic size={18} />
              </div>

              <div>
                <strong>
                  AI Interview
                </strong>

                <span>
                  Ready to practice
                </span>
              </div>

              <CheckCircle2 size={18} />

            </div>


            {/* Job Match Floating Card */}

            <div className="floating-card match-card">

              <div className="match-icon">
                <Target size={18} />
              </div>

              <div>
                <strong>
                  Job Match
                </strong>

                <span>
                  94% match
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-container">

          <div className="section-heading">

            <div className="section-badge">

              <Sparkles size={14} />

              POWERFUL FEATURES

            </div>

            <h2>
              Everything you need to
              <span> grow your career</span>
            </h2>

            <p>
              One intelligent platform to help
              you prepare, practice and progress
              throughout your career journey.
            </p>

          </div>


          <div className="features-grid">

            {features.map((feature) => {

              const Icon = feature.icon;

              return (
                <Link
                  to={feature.link}
                  className="feature-card"
                  key={feature.title}
                >

                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                  <span className="feature-link">
                    Explore
                    <ArrowRight size={16} />
                  </span>

                </Link>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-container">

          <div className="section-heading">

            <div className="section-badge">

              <Brain size={14} />

              HOW IT WORKS

            </div>

            <h2>
              Your career journey,
              <span> simplified.</span>
            </h2>

            <p>
              Follow a simple process and let
              CareerPilot AI guide you toward
              your career goals.
            </p>

          </div>


          <div className="steps-grid">

            {steps.map((step) => (

              <div
                className="step-card"
                key={step.number}
              >

                <span className="step-number">
                  {step.number}
                </span>

                <div className="step-line"></div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="cta-section"
        id="about"
      >

        <div className="cta-container">

          <div className="cta-icon">
            <Sparkles size={25} />
          </div>

          <h2>
            Ready to take control
            of your career?
          </h2>

          <p>
            Start building better resumes,
            practicing smarter and preparing
            for the career you want.
          </p>

          <Link
            to="/dashboard"
            className="cta-button"
          >
            Open CareerPilot
            <ArrowRight size={19} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <Link
              to="/"
              className="logo"
            >

              <div className="logo-icon">
                <Brain size={18} />
              </div>

              <span>
                Career<span>Pilot</span>
                <small> AI</small>
              </span>

            </Link>

            <p>
              Your AI-powered companion for
              career growth, interview
              preparation and professional
              success.
            </p>

          </div>


          <div className="footer-links">

            <div>

              <h4>
                Platform
              </h4>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/resume-analyzer">
                Resume Analyzer
              </Link>

              <Link to="/mock-interview">
                Mock Interview
              </Link>

              <Link to="/job-matcher">
                Job Matcher
              </Link>

            </div>


            <div>

              <h4>
                Practice
              </h4>

              <Link to="/coding-arena">
                Coding Arena
              </Link>

              <Link to="/technical-quiz">
                Technical Quiz
              </Link>

              <Link to="/skill-gap">
                Skill Gap
              </Link>

              <Link to="/learning-roadmap">
                Roadmap
              </Link>

            </div>


            <div>

              <h4>
                Resources
              </h4>

              <Link to="/resume-builder">
                Resume Builder
              </Link>

              <Link to="/cover-letter">
                Cover Letter
              </Link>

              <Link to="/profile">
                Profile
              </Link>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 CareerPilot AI.
            All rights reserved.
          </span>

          <span>
            Navigate Your Career. Ace Every Interview.
          </span>

        </div>

      </footer>

    </div>
  );
}