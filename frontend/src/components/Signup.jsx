import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt", formData);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          --bg-primary: #FFFFFF;
          --bg-secondary: #FAFAFA;
          --bg-tertiary: #F5F5F5;
          --text-primary: #1A1A1A;
          --text-secondary: #666666;
          --text-muted: #999999;
          --accent-blue: #2962FF;
          --accent-hover: #1E4BD8;
          --accent-green: #00C853;
          --border-light: #E5E5E5;
          --border-subtle: #F0F0F0;
          --shadow-sm: 0 2px 4px rgba(0,0,0,0.02);
          --shadow-md: 0 4px 12px rgba(0,0,0,0.03);
          --shadow-lg: 0 8px 24px rgba(0,0,0,0.04);
          --font-display: 'Space Grotesk', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, #F5F9FF, white);
          font-family: var(--font-body);
        }

        .signup-card {
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 480px;
          overflow: hidden;
          border: 1px solid var(--border-light);
        }

        .signup-header {
          padding: 48px 48px 24px 48px;
        }

        .signup-header h2 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .signup-header p {
          color: var(--text-secondary);
          text-align: center;
          margin: 0;
          font-size: 16px;
        }

        .signup-form {
          padding: 0 48px 40px 48px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 18px;
        }

        .form-input {
          width: 100%;
          border: 1.5px solid var(--border-light);
          border-radius: 8px;
          padding: 14px 14px 14px 44px;
          font-size: 15px;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
          font-family: var(--font-body);
          background: var(--bg-secondary);
        }

        .form-input:focus {
          border-color: var(--accent-blue);
          background: white;
          box-shadow: 0 0 0 4px rgba(41, 98, 255, 0.1);
        }

        .form-input::placeholder {
          color: var(--text-muted);
          font-size: 14px;
        }

        .password-hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          margin: 16px 0 20px 0;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: var(--accent-blue);
          margin-top: 2px;
        }

        .terms-text {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.5;
        }

        .terms-link {
          color: var(--accent-blue);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .terms-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }

        .btn-primary {
          width: 100%;
          background: var(--accent-blue);
          color: white;
          font-weight: 500;
          padding: 14px 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
          box-shadow: var(--shadow-sm);
        }

        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .login-text {
          text-align: center;
          color: var(--text-secondary);
          margin: 20px 0 24px 0;
          font-size: 15px;
        }

        .login-link {
          color: var(--accent-blue);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .login-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }

        .divider {
          position: relative;
          margin: 24px 0 28px 0;
        }

        .divider-line {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
        }

        .divider-line div {
          width: 100%;
          border-top: 1px solid var(--border-light);
        }

        .divider-text {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .divider-text span {
          background: white;
          padding: 0 16px;
          color: var(--text-muted);
          font-size: 14px;
        }

        .social-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-social {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: white;
          border: 1.5px solid var(--border-light);
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          font-size: 15px;
          color: var(--text-secondary);
          transition: all 0.2s;
          font-weight: 500;
        }

        .btn-social:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
          background: var(--bg-secondary);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .btn-social:active {
          transform: translateY(0);
        }

        .social-icon {
          font-size: 18px;
        }

        .back-to-home {
          text-align: center;
          margin-top: 24px;
        }

        .back-link {
          color: var(--text-muted);
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--accent-blue);
        }

        @media (max-width: 480px) {
          .signup-header {
            padding: 40px 24px 20px 24px;
          }
          
          .signup-form {
            padding: 0 24px 32px 24px;
          }
          
          .signup-header h2 {
            font-size: 28px;
          }
          
          .social-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create account</h2>
            <p>Join tech<span style={{ color: 'var(--accent-blue)' }}>foliyo</span> today</p>
          </div>

          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="form-group">
                <label className="form-label">Full name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email address</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="password-hint">
                  <span>📋</span>
                  <span>At least 8 characters with a number and letter</span>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label className="form-label">Confirm password</label>
                <div className="input-wrapper">
                  <span className="input-icon">✓</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="terms-checkbox">
                <input 
                  type="checkbox"
                  name="agreeToTerms"
                  className="checkbox-input"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="terms-text">
                  I agree to the{' '}
                  <a href="#" className="terms-link">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="terms-link">Privacy Policy</a>
                </span>
              </label>

              {/* Sign Up Button */}
              <button type="submit" className="btn-primary">
                Create account
              </button>
            </form>

            <p className="login-text">
              Already have an account?{' '}
              <a href="/login" className="login-link">
                Sign in
              </a>
            </p>

            <div className="divider">
              <div className="divider-line">
                <div></div>
              </div>
              <div className="divider-text">
                <span>Or sign up with</span>
              </div>
            </div>

            <div className="social-buttons">
              <button className="btn-social">
                <span className="social-icon">G</span>
                <span>Google</span>
              </button>
              <button className="btn-social">
                <span className="social-icon">⌨️</span>
                <span>GitHub</span>
              </button>
            </div>

            <div className="back-to-home">
              <a href="/" className="back-link">
                ← Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;