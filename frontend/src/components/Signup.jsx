function Signup() {
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
      {/* Signup Card */}
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
          }}>Create Account</h2>
          <p style={{
            color: "#6b7280",
            textAlign: "center",
            margin: 0
          }}>Join TechFoliyo today</p>
        </div>

        {/* Form */}
        <div style={{
          padding: "0 40px 32px 40px"
        }}>
          <form style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            {/* Full Name Field */}
            <div>
              <label style={{
                display: "block",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "20px"
                }}>👤</span>
                <input
                  type="text"
                  placeholder="John Doe"
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

            {/* Confirm Password Field */}
            <div>
              <label style={{
                display: "block",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "20px"
                }}>✓</span>
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

            {/* Terms Checkbox */}
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              marginTop: "8px"
            }}>
              <input 
                type="checkbox" 
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer"
                }}
              />
              <span style={{ color: "#4b5563", fontSize: "14px" }}>
                I agree to the{' '}
                <a 
                  href="#" 
                  style={{
                    color: "#a855f7",
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
                  Terms
                </a>{' '}
                and{' '}
                <a 
                  href="#" 
                  style={{
                    color: "#a855f7",
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
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Sign Up Button */}
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
                transition: "all 0.3s",
                marginTop: "8px"
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
              Create Account
            </button>

            {/* Login Link - CHANGED FROM "/" TO "/login" */}
            <p style={{
              textAlign: "center",
              color: "#6b7280",
              margin: "8px 0 0 0"
            }}>
              Already have an account?{' '}
              <a 
                href="/login" 
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
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;