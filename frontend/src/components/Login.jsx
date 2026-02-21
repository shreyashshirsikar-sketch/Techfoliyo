function Login() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #a855f7, #ec4899)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Login Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        width: "100%",
        maxWidth: "400px",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: "white",
          padding: "40px 40px 24px 40px"
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#1f2937",
            textAlign: "center",
            margin: "0 0 8px 0"
          }}>Welcome Back</h2>
          <p style={{
            color: "#6b7280",
            textAlign: "center",
            margin: 0
          }}>Sign in to your account</p>
        </div>

        {/* Form */}
        <div style={{
          padding: "0 40px 32px 40px"
        }}>
          <form style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            {/* Email Field */}
            <div>
              <label style={{
                display: "block",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "20px"
                }}>📧</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px 12px 12px 40px",
                    fontSize: "16px",
                    color: "#374151",
                    outline: "none",
                    transition: "border-color 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#a855f7"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: "block",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "20px"
                }}>🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px 12px 12px 40px",
                    fontSize: "16px",
                    color: "#374151",
                    outline: "none",
                    transition: "border-color 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#a855f7"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              }}>
                <input 
                  type="checkbox" 
                  style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer"
                  }}
                />
                <span style={{ color: "#4b5563" }}>Remember me</span>
              </label>
              <a 
                href="#" 
                style={{
                  color: "#a855f7",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#9333ea";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#a855f7";
                  e.target.style.textDecoration = "none";
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              style={{
                width: "100%",
                background: "linear-gradient(to right, #a855f7, #ec4899)",
                color: "white",
                fontWeight: "bold",
                padding: "14px 16px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(to right, #9333ea, #db2777)";
                e.target.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(to right, #a855f7, #ec4899)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p style={{
              textAlign: "center",
              color: "#6b7280",
              margin: "8px 0 0 0"
            }}>
              Don't have an account?{' '}
              <a 
                href="/signup" 
                style={{
                  color: "#a855f7",
                  fontWeight: "600",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#9333ea";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#a855f7";
                  e.target.style.textDecoration = "none";
                }}
              >
                Sign up for free
              </a>
            </p>

            {/* Social Login - Only Google & GitHub */}
            <div style={{ position: "relative", margin: "24px 0 8px 0" }}>
              <div style={{
                position: "absolute",
                inset: "0",
                display: "flex",
                alignItems: "center"
              }}>
                <div style={{
                  width: "100%",
                  borderTop: "1px solid #e5e7eb"
                }}></div>
              </div>
              <div style={{
                position: "relative",
                display: "flex",
                justifyContent: "center"
              }}>
                <span style={{
                  backgroundColor: "white",
                  padding: "0 16px",
                  color: "#6b7280",
                  fontSize: "14px"
                }}>Or continue with</span>
              </div>
            </div>

            {/* Social Buttons - Google & GitHub only */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px"
            }}>
              <button style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "none",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                fontSize: "16px",
                color: "#4b5563",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#a855f7";
                e.target.style.color = "#a855f7";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.color = "#4b5563";
              }}
              >
                <span style={{fontSize: "20px"}}>G</span>
                <span>Google</span>
              </button>
              <button style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "none",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                fontSize: "16px",
                color: "#4b5563",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#a855f7";
                e.target.style.color = "#a855f7";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.color = "#4b5563";
              }}
              >
                <span style={{fontSize: "20px"}}>⌨️</span>
                <span>GitHub</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;