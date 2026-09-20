import { Link } from "react-router-dom";
import {
  Brain,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Brand */}
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
            AI-powered tools to help you
            prepare, practice and progress
            in your career.
          </p>

          <div className="footer-socials">

            <a
              href="#"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="#"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>

          </div>

        </div>

        {/* Platform */}
        <div className="footer-column">

          <h4>Platform</h4>

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

        {/* Practice */}
        <div className="footer-column">

          <h4>Practice</h4>

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

        {/* Resources */}
        <div className="footer-column">

          <h4>Resources</h4>

          <Link to="/resume-builder">
            Resume Builder
          </Link>

          <Link to="/cover-letter">
            Cover Letter
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <a href="#">
            Help Center
            <ArrowUpRight size={13} />
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} CareerPilot AI.
          All rights reserved.
        </p>

        <span>
          Navigate Your Career. Ace Every Interview.
        </span>

      </div>

    </footer>
  );
}