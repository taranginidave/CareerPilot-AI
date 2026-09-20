import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    const destination =
      location.state?.from || "/dashboard";

    navigate(destination, { replace: true });

    setLoading(false);
  }

  return (
    <div className="auth-page">

      <div className="auth-background-glow"></div>

      <div className="auth-container">

        <div className="auth-brand">
          <div className="auth-logo">
            <Sparkles size={20} />
          </div>

          <span>CareerPilot AI</span>
        </div>

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="auth-icon">
              <LogIn size={22} />
            </div>

            <h1>Welcome Back</h1>

            <p>
              Login to continue your career journey.
            </p>

          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="auth-field">

              <label>
                <Mail size={15} />
                Email Address
              </label>

              <div className="auth-input-wrapper">

                <Mail size={17} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />

              </div>

            </div>

            <div className="auth-field">

              <div className="auth-label-row">

                <label>
                  <Lock size={15} />
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    alert(
                      "Password recovery will be connected with the backend later."
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <div className="auth-input-wrapper">

                <Lock size={17} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
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

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn size={17} />
                  Login
                </>
              )}
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Don't have an account?

            <Link to="/signup">
              Create Account
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