import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt", { email, password, rememberMe });
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

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, #F5F9FF, white);
          font-family: var(--font-body);
        }

        .login-card {
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 440px;
          overflow: hidden;
          border: 1px solid var(--border-light);
        }

        .login-header {
          padding: 48px 48px 24px 48px;
        }

        .login-header h2 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .login-header p {
          color: var(--text-secondary);
          text-align: center;
          margin: 0;
          font-size: 16px;
        }

        .login-form {
          padding: 0 48px 40px 48px;
        }

        .form-group {
          margin-bottom: 24px;
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

        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .checkbox-input {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: var(--accent-blue);
        }

        .forgot-link {
          color: var(--accent-blue);
          font-size: 14px;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .forgot-link:hover {
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

        .signup-text {
          text-align: center;
          color: var(--text-secondary);
          margin: 20px 0 24px 0;
          font-size: 15px;
        }

        .signup-link {
          color: var(--accent-blue);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .signup-link:hover {
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
          background: white;
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
          .login-header {
            padding: 40px 24px 20px 24px;
          }
          
          .login-form {
            padding: 0 24px 32px 24px;
          }
          
          .login-header h2 {
            font-size: 28px;
          }
          
          .social-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue to tech<span style={{ color: 'var(--accent-blue)' }}>foliyo</span></p>
          </div>

          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email address</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-primary">
                Sign in
              </button>
            </form>

            <p className="signup-text">
              Don't have an account?{' '}
              <a href="/signup" className="signup-link">
                Create free account
              </a>
            </p>

            <div className="divider">
              <div className="divider-line">
                <div></div>
              </div>
              <div className="divider-text">
                <span>Or continue with</span>
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

export default Login;