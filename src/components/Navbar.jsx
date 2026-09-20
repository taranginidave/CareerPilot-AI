import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FileText,
  Mic,
  Target,
  Code2,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Route,
  User,
  Brain,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

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

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  return (
    <header className="navbar">

      {/* LOGO */}
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

      {/* NAVIGATION */}
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

        {user && (
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>
        )}

        {/* TOOLS */}
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
                    <span>{tool.name}</span>
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
          <Route size={16} />
          Roadmap
        </NavLink>

        {/* PROFILE - ONLY WHEN LOGGED IN */}
        {user && (
          <NavLink
            to="/profile"
            onClick={closeMenu}
          >
            <User size={16} />
            Profile
          </NavLink>
        )}

      </nav>

      {/* RIGHT SIDE BUTTONS */}
      <div className="nav-buttons">

        {!user ? (
          <>
            {/* LOGIN */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              <LogIn size={15} />
              Login
            </button>

            {/* REGISTER */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                closeMenu();
                navigate("/signup");
              }}
            >
              <UserPlus size={15} />
              Get Started
            </button>
          </>
        ) : (
          <>
            {/* DASHBOARD */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                closeMenu();
                navigate("/dashboard");
              }}
            >
              <LayoutDashboard size={15} />
              Dashboard
            </button>

            {/* LOGOUT */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleLogout}
            >
              <LogOut size={15} />
              Logout
            </button>
          </>
        )}

      </div>

      {/* MOBILE MENU */}
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => {
          setMobileOpen(!mobileOpen);
          setToolsOpen(false);
        }}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? (
          <X size={23} />
        ) : (
          <Menu size={23} />
        )}
      </button>

    </header>
  );
}