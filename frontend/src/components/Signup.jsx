import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate username from full name
      const username = formData.fullName
        .toLowerCase()
        .replace(/\s+/g, '') // Remove spaces
        .replace(/[^a-z0-9]/g, ''); // Remove special characters
      
      // Signup request
      const response = await axios.post("http://localhost:4000/auth/signup", {
        username: username,
        email: formData.email,
        password: formData.password
      });
      
      console.log("Signup successful:", response.data);
      
      // Auto-login after signup
      const loginResponse = await axios.post("http://localhost:4000/auth/login", {
        email: formData.email,
        password: formData.password
      });
      
      // Use the login function from context to store user data and token
      login(loginResponse.data.user, loginResponse.data.token);
      
      // No need to manually navigate - ProtectedRoute will handle it
      
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth signup
    window.location.href = "http://localhost:4000/auth/google";
  };

  const handleGithubSignup = () => {
    // Implement GitHub OAuth signup
    window.location.href = "http://localhost:4000/auth/github";
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .page {
          display: flex;
          height: 100vh;
        }

        /* LEFT SIDE - Blue gradient colors */
        .left {
          width: 50%;
          background: linear-gradient(135deg, #2F6FE4, #5B8FF9);
          color: white;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .logo {
          font-size: 20px;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hero {
          margin-top: 40px;
        }

        .hero h1 {
          font-size: 54px;
          line-height: 1.05;
          font-weight: 800;
          margin-bottom: 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hero p {
          font-size: 18px;
          line-height: 1.6;
          opacity: .95;
          max-width: 460px;
          font-family: 'Inter', sans-serif;
        }

        /* Illustration */
        .illustration {
          margin-top: 55px;
          width: 460px;
          padding: 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, .3);
        }

        .profile {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 20px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        /* User icon set to black */
        .avatar .user-icon {
          font-size: 28px;
          color: #000000;
          font-weight: normal;
          line-height: 1;
        }

        .bar {
          height: 8px;
          background: white;
          opacity: .7;
          border-radius: 5px;
          margin: 6px 0;
        }

        .rowCards {
          display: flex;
          gap: 20px;
          margin-top: 18px;
        }

        .smallCard {
          flex: 1;
          height: 85px;
          border-radius: 16px;
          background: rgba(255, 255, 255, .25);
        }

        .footer {
          font-size: 13px;
          opacity: .8;
        }

        /* RIGHT SIDE */
        .right {
          width: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* CREATE ACCOUNT CARD */
        .card {
          width: 460px;
          background: white;
        }

        /* Error message styling */
        .error-message {
          background-color: #FEE2E2;
          border: 1px solid #EF4444;
          color: #B91C1C;
          padding: 12px 16px;
          border-radius: 0px;
          margin-bottom: 20px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
        }

        /* BADGE - Same blue as left side */
        .badge {
          display: inline-block;
          padding: 0;
          background: transparent;
          color: #2F6FE4;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }

        /* TITLE */
        .card h2 {
          font-size: 32px;
          font-weight: 700;
          color: #0A0A0A;
          margin-bottom: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.02em;
        }

        /* SUBTITLE */
        .subtitle {
          color: #6B7280;
          font-size: 14px;
          margin-bottom: 32px;
          font-family: 'Inter', sans-serif;
        }

        /* LABEL */
        label {
          font-size: 14px;
          font-weight: 500;
          color: #0A0A0A;
          margin-bottom: 6px;
          display: block;
          font-family: 'Inter', sans-serif;
        }

        /* INPUT */
        .inputBox {
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 0px;
          border: 1px solid #E5E7EB;
          background: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        input:focus {
          border-color: #2F6FE4;
          box-shadow: 0 0 0 4px rgba(47, 111, 228, 0.1);
        }

        input.error {
          border-color: #EF4444;
        }

        input::placeholder {
          color: #9CA3AF;
          font-size: 14px;
        }

        /* PASSWORD ROW */
        .flexRow {
          display: flex;
          gap: 12px;
          margin-top: 0;
        }

        .flexRow > div {
          flex: 1;
        }

        /* CREATE ACCOUNT BUTTON - SQUARE */
        .button {
          margin-top: 24px;
          width: 100%;
          padding: 14px 20px;
          border-radius: 0px;
          border: none;
          background: #0A0A0A;
          color: white;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .button:hover:not(:disabled) {
          background: #1A1A1A;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* DIVIDER */
        .divider {
          position: relative;
          text-align: center;
          margin: 24px 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #E5E7EB;
          z-index: 1;
        }

        .divider span {
          background: white;
          padding: 0 16px;
          color: #6B7280;
          font-size: 12px;
          font-weight: 500;
          position: relative;
          z-index: 2;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* SOCIAL BUTTONS */
        .socialRow {
          display: flex;
          gap: 12px;
          margin: 20px 0 28px 0;
        }

        .social {
          flex: 1;
          padding: 16px;
          border-radius: 0px;
          border: 1px solid #E5E7EB;
          background: #F9FAFB;
          color: #374151;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .social:hover:not(:disabled) {
          background: white;
          border: 1px solid #D1D5DB;
          transform: translateY(-2px);
        }

        .social:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .social-icon {
          font-size: 16px;
        }

        /* LOGIN - Same blue as left side */
        .login {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #6B7280;
          font-family: 'Inter', sans-serif;
        }

        .login span {
          color: #2F6FE4;
          cursor: pointer;
          font-weight: 600;
          margin-left: 4px;
          transition: color 0.2s ease;
        }

        .login span:hover {
          color: #5B8FF9;
          text-decoration: underline;
        }

        /* Loading spinner */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
      `}</style>

      <div className="page">
        {/* LEFT - Updated with requested changes */}
        <div className="left">
          <div>
            <div className="logo">Techfoliyo</div>
            <div className="hero">
              <h1>Showcase Your<br/>Projects with Techfoliyo</h1>
              <p>Stop sharing just code. Make your work in action.</p>
              <div className="illustration">
                <div className="profile">
                  {/* AVATAR CIRCLE - with black user icon */}
                  <div className="avatar">
                    <span className="user-icon">👤</span>
                  </div>
                  <div>
                    <div className="bar" style={{width:"140px"}}></div>
                    <div className="bar" style={{width:"100px"}}></div>
                  </div>
                </div>
                <div className="rowCards">
                  <div className="smallCard"></div>
                  <div className="smallCard"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">© 2026 Techfoliyo Inc. All rights reserved.</div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="card">
            {/* Badge - Same blue as left side */}
            <div className="badge">WELCOME TO TECHFOLIYO</div>
            <h2>Create Account</h2>
            <div className="subtitle">Join thousands of engineers showcasing their best work.</div>

            {/* Error message display */}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <div className="inputBox">
                <input
                  name="fullName"
                  placeholder="Alex Rivera"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  className={error && !formData.fullName ? "error" : ""}
                />
              </div>

              <label>Email Address</label>
              <div className="inputBox">
                <input
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className={error && !formData.email ? "error" : ""}
                />
              </div>

              <div className="flexRow">
                <div>
                  <label>Password</label>
                  <div className="inputBox">
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      className={error && !formData.password ? "error" : ""}
                    />
                  </div>
                </div>

                <div>
                  <label>Confirm</label>
                  <div className="inputBox">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      className={error && !formData.confirmPassword ? "error" : ""}
                    />
                  </div>
                </div>
              </div>

              {/* Create Account Button */}
              <button className="button" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* Social Buttons */}
            <div className="socialRow">
              <button 
                className="social" 
                type="button" 
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <span className="social-icon">G</span>
                <span>Google</span>
              </button>
              <button 
                className="social" 
                type="button" 
                onClick={handleGithubSignup}
                disabled={loading}
              >
                <span className="social-icon">⌨</span>
                <span>GitHub</span>
              </button>
            </div>

            <div className="login">
              Already have an account?
              {/* Log in link - Same blue as left side */}
              <span onClick={() => !loading && navigate("/login")}>
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;