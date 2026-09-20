import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    targetRole: "",
    password: "",
    confirmPassword: "",
    skills: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.college ||
      !formData.targetRole ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = signup({
      name: formData.name.trim(),
      email: formData.email.trim(),
      college: formData.college.trim(),
      targetRole: formData.targetRole.trim(),
      password: formData.password,
      skills: formData.skills.trim(),
    });

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    navigate("/dashboard", { replace: true });

    setLoading(false);
  }

  return (
    <div className="auth-page signup-page">

      <div className="auth-background-glow"></div>

      <div className="auth-container signup-container">

        {/* BRAND */}
        <div className="auth-brand">
          <div className="auth-logo">
            <Sparkles size={20} />
          </div>

          <span>CareerPilot AI</span>
        </div>

        {/* CARD */}
        <div className="auth-card signup-card">

          <div className="auth-card-header">

            <div className="auth-icon">
              <UserPlus size={22} />
            </div>

            <h1>Create Your Account</h1>

            <p>
              Start building your personalized career journey.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="signup-grid">

              {/* NAME */}
              <div className="auth-field">

                <label>
                  <User size={15} />
                  Full Name
                </label>

                <div className="auth-input-wrapper">

                  <User size={17} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="auth-field">

                <label>
                  <Mail size={15} />
                  Email Address
                </label>

                <div className="auth-input-wrapper">

                  <Mail size={17} />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* COLLEGE */}
              <div className="auth-field">

                <label>
                  <GraduationCap size={15} />
                  College / University
                </label>

                <div className="auth-input-wrapper">

                  <GraduationCap size={17} />

                  <input
                    type="text"
                    name="college"
                    placeholder="Enter your college"
                    value={formData.college}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* TARGET ROLE */}
              <div className="auth-field">

                <label>
                  <Briefcase size={15} />
                  Target Job Role
                </label>

                <div className="auth-input-wrapper">

                  <Briefcase size={17} />

                  <input
                    type="text"
                    name="targetRole"
                    placeholder="e.g. Software Developer"
                    value={formData.targetRole}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="auth-field">

                <label>
                  <Lock size={15} />
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <Lock size={17} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="auth-field">

                <label>
                  <Lock size={15} />
                  Confirm Password
                </label>

                <div className="auth-input-wrapper">

                  <Lock size={17} />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

            </div>

            {/* SKILLS */}
            <div className="auth-field signup-skills">

              <label>
                <Sparkles size={15} />
                Skills
              </label>

              <div className="auth-input-wrapper">

                <Sparkles size={17} />

                <input
                  type="text"
                  name="skills"
                  placeholder="e.g. Python, React, SQL, Machine Learning"
                  value={formData.skills}
                  onChange={handleChange}
                />

              </div>

              <small>
                Separate multiple skills with commas.
              </small>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <UserPlus size={17} />
                  Create Account
                </>
              )}
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Already have an account?

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

        <p className="auth-footer-text">
          Build your skills. Prepare smarter. Get career ready.
        </p>

      </div>
    </div>
  );
}