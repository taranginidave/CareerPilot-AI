import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Code2,
  Save,
  LogOut,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";
import "./profile.css";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    targetRole: "",
    skills: "",
  });

  const [message, setMessage] = useState("");

  // Load current user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        college: user.college || "",
        targetRole: user.targetRole || "",
        skills: user.skills || "",
      });
    }
  }, [user]);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove success message when user starts editing again
    if (message) {
      setMessage("");
    }
  }

  // Save profile
  function handleSave(event) {
    event.preventDefault();

    const result = updateUser({
      name: formData.name.trim(),
      college: formData.college.trim(),
      targetRole: formData.targetRole.trim(),
      skills: formData.skills.trim(),
    });

    if (result.success) {
      setMessage("Profile updated successfully.");
    } else {
      setMessage(result.message);
    }
  }

  // Logout
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  // If user is not logged in
  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Please login first</h2>

          <button
            className="profile-btn primary-btn"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* ================= HEADER ================= */}

      <header className="profile-header">

        <div className="profile-header-left">
          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div>
            <h1>My Profile</h1>
            <p>
              Manage your CareerPilot account information
            </p>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </header>


      {/* ================= MAIN ================= */}

      <main className="profile-main">

        <div className="profile-card">

          {/* Profile heading */}

          <div className="profile-title">

            <div className="profile-avatar">
              <User size={34} />
            </div>

            <div>
              <h2>{user.name || "Your Profile"}</h2>
              <p>{user.email}</p>
            </div>

          </div>


          {/* ================= FORM ================= */}

          <form onSubmit={handleSave}>

            <div className="profile-form-grid">

              {/* Name */}

              <div className="form-group">

                <label htmlFor="name">
                  <User size={17} />
                  Full Name
                </label>

                <div className="input-wrapper">

                  <User size={18} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                </div>

              </div>


              {/* Email */}

              <div className="form-group">

                <label htmlFor="email">
                  <Mail size={17} />
                  Email Address
                </label>

                <div className="input-wrapper disabled-input">

                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />

                </div>

                <small>
                  Email cannot be changed.
                </small>

              </div>


              {/* College */}

              <div className="form-group">

                <label htmlFor="college">
                  <GraduationCap size={17} />
                  College
                </label>

                <div className="input-wrapper">

                  <GraduationCap size={18} />

                  <input
                    id="college"
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college"
                  />

                </div>

              </div>


              {/* Target Role */}

              <div className="form-group">

                <label htmlFor="targetRole">
                  <Briefcase size={17} />
                  Target Role
                </label>

                <div className="input-wrapper">

                  <Briefcase size={18} />

                  <input
                    id="targetRole"
                    type="text"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleChange}
                    placeholder="e.g. Software Developer"
                  />

                </div>

              </div>

            </div>


            {/* ================= SKILLS ================= */}

            <div className="form-group skills-group">

              <label htmlFor="skills">
                <Code2 size={17} />
                Skills
              </label>

              <div className="input-wrapper textarea-wrapper">

                <Code2 size={18} />

                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. Python, Java, React, SQL, Machine Learning"
                  rows="4"
                />

              </div>

              <small>
                Add your skills separated by commas.
              </small>

            </div>


            {/* ================= SUCCESS MESSAGE ================= */}

            {message && (
              <div className="profile-message">
                <CheckCircle size={18} />
                {message}
              </div>
            )}


            {/* ================= SAVE BUTTON ================= */}

            <div className="profile-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                <Save size={18} />
                Save Changes
              </button>

            </div>

          </form>

        </div>


        {/* ================= ACCOUNT INFORMATION ================= */}

        <div className="account-card">

          <h3>Account Information</h3>

          <div className="account-info">

            <div>
              <span>Account ID</span>
              <strong>{user.id}</strong>
            </div>

            <div>
              <span>Account Created</span>
              <strong>
                {user.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "Not available"}
              </strong>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
