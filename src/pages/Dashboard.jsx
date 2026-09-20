import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Sparkles,
  FileText,
  Target,
  Mic,
  Code2,
  ArrowRight,
  LogOut,
  UserCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const skills = user.skills
    ? user.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <header className="dashboard-header">

        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <Sparkles size={19} />
          </div>

          <div>
            <strong>CareerPilot AI</strong>
            <span>Career Dashboard</span>
          </div>
        </div>

        <div className="dashboard-header-actions">

          <Link
            to="/profile"
            className="dashboard-profile-button"
          >
            <UserCircle size={17} />
            Profile
          </Link>

          <button
            type="button"
            className="dashboard-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </header>


      {/* MAIN */}
      <main className="dashboard-main">

        {/* WELCOME */}
        <section className="dashboard-welcome">

          <div>
            <p className="dashboard-eyebrow">
              YOUR CAREER SPACE
            </p>

            <h1>
              Welcome, {user.name} 👋
            </h1>

            <p className="dashboard-welcome-text">
              Your personalized CareerPilot dashboard.
              Prepare smarter and build your career with confidence.
            </p>
          </div>

          <Link
            to="/profile"
            className="dashboard-view-profile"
          >
            <User size={16} />
            View Profile
          </Link>

        </section>


        {/* PROFILE SUMMARY */}
        <section className="dashboard-profile-card">

          <div className="dashboard-profile-heading">

            <div className="dashboard-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <h2>{user.name}</h2>
              <p>{user.targetRole || "Career Explorer"}</p>
            </div>

          </div>


          <div className="dashboard-user-details">

            <div className="dashboard-detail">

              <Mail size={17} />

              <div>
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>

            </div>


            <div className="dashboard-detail">

              <GraduationCap size={17} />

              <div>
                <span>College / University</span>
                <strong>
                  {user.college || "Not added"}
                </strong>
              </div>

            </div>


            <div className="dashboard-detail">

              <Briefcase size={17} />

              <div>
                <span>Target Role</span>
                <strong>
                  {user.targetRole || "Not added"}
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* SKILLS */}
        <section className="dashboard-section">

          <div className="dashboard-section-title">

            <div>
              <p>YOUR PROFILE</p>
              <h2>Your Skills</h2>
            </div>

            <Link to="/profile">
              Edit Profile
              <ArrowRight size={15} />
            </Link>

          </div>


          <div className="dashboard-skills">

            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  className="dashboard-skill"
                  key={`${skill}-${index}`}
                >
                  <Sparkles size={13} />
                  {skill}
                </span>
              ))
            ) : (
              <div className="dashboard-empty">
                <p>
                  No skills added yet.
                </p>

                <Link to="/profile">
                  Add your skills
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}

          </div>

        </section>


        {/* CAREER TOOLS */}
        <section className="dashboard-section">

          <div className="dashboard-section-title">

            <div>
              <p>CAREERPILOT TOOLS</p>
              <h2>Prepare for Your Career</h2>
            </div>

          </div>


          <div className="dashboard-tools-grid">

            <Link
              to="/resume-analyzer"
              className="dashboard-tool-card"
            >
              <div className="dashboard-tool-icon">
                <FileText size={20} />
              </div>

              <div>
                <h3>Resume Analyzer</h3>
                <p>
                  Analyze your resume and discover areas for improvement.
                </p>
              </div>

              <ArrowRight size={17} />
            </Link>


            <Link
              to="/job-matcher"
              className="dashboard-tool-card"
            >
              <div className="dashboard-tool-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>Job Matcher</h3>
                <p>
                  Find roles that match your skills and career goals.
                </p>
              </div>

              <ArrowRight size={17} />
            </Link>


            <Link
              to="/mock-interview"
              className="dashboard-tool-card"
            >
              <div className="dashboard-tool-icon">
                <Mic size={20} />
              </div>

              <div>
                <h3>AI Mock Interview</h3>
                <p>
                  Practice interviews and improve your confidence.
                </p>
              </div>

              <ArrowRight size={17} />
            </Link>


            <Link
              to="/coding-arena"
              className="dashboard-tool-card"
            >
              <div className="dashboard-tool-icon">
                <Code2 size={20} />
              </div>

              <div>
                <h3>Coding Arena</h3>
                <p>
                  Practice coding problems and strengthen your skills.
                </p>
              </div>

              <ArrowRight size={17} />
            </Link>

          </div>

        </section>


        {/* QUICK ACTIONS */}
        <section className="dashboard-section">

          <div className="dashboard-section-title">

            <div>
              <p>QUICK ACTIONS</p>
              <h2>Continue Your Journey</h2>
            </div>

          </div>


          <div className="dashboard-quick-actions">

            <Link to="/resume-builder">
              <FileText size={17} />
              Resume Builder
            </Link>

            <Link to="/technical-quiz">
              <Target size={17} />
              Technical Quiz
            </Link>

            <Link to="/skill-gap">
              <Sparkles size={17} />
              Skill Gap
            </Link>

            <Link to="/learning-roadmap">
              <ArrowRight size={17} />
              Learning Roadmap
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}