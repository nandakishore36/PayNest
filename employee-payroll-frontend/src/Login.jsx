import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  // States for form data
  const [isAdmin, setIsAdmin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Toggle between admin and employee forms
  const toggleForm = (admin) => {
    setIsAdmin(admin);
    setError("");
    setEmail("");
    setPassword("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isAdmin) {
      // Admin login logic
      if (email === "admin@example.com" && password === "password123") {
        navigate("/admin");
        window.alert("Successfully logged in as Admin!");
      } else {
        setError("Invalid admin credentials. Please try again.");
      }
    } else {
      // Employee login logic
      if (password === "password1234") {
        // Save email in localStorage for the employee
        localStorage.setItem("email", email);
        navigate("/employee");
        window.alert("Successfully logged in as Employee!");
      } else {
        setError("Invalid employee password. Please try again.");
      }
    }
  };

  return (
    <div
      className="container-fluid bg-light py-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "20px" }}
          >
            {/* Header */}
            <div
              className="card-header text-white text-center py-3"
              style={{
                background: "linear-gradient(to right, #4e73df, #224abe)",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <h3 className="mb-0">Employee Payroll System</h3>
            </div>

            {/* Toggle Button Section */}
            <div className="px-4 pt-4">
              <div
                className="btn-group position-relative w-100 mb-4"
                role="group"
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
                  border: "5px solid #ffffff",
                  height: "50px",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  className={`btn text-secondary border-0 z-index-1 ${
                    isAdmin ? "active" : ""
                  }`}
                  onClick={() => toggleForm(true)}
                  style={{ backgroundColor: "transparent" }}
                >
                  Admin
                </button>
                <button
                  type="button"
                  className={`btn text-secondary border-0 z-index-1 ${
                    !isAdmin ? "active" : ""
                  }`}
                  onClick={() => toggleForm(false)}
                  style={{ backgroundColor: "transparent" }}
                >
                  Employee
                </button>
                <div
                  className="position-absolute bg-white"
                  style={{
                    width: "50%",
                    height: "50px",
                    borderRadius: "20px",
                    top: "-5px",
                    left: isAdmin ? "0" : "50%",
                    transition: "0.5s",
                    transitionTimingFunction:
                      "cubic-bezier(.89,-0.23,.11,1.38)",
                    boxShadow: "8px 8px 8px #cbced1, -8px -8px 8px #cbced1",
                  }}
                ></div>
              </div>
            </div>

            <div className="card-body px-4 pb-4">
              {/* Title */}
              <div className="text-center mb-3">
                <h5 className="text-primary">
                  {isAdmin ? "Admin Login" : "Employee Login"}
                </h5>
                <p className="text-muted small mb-3">
                  Please enter your credentials to login
                </p>
              </div>

              {/* Error Messages */}
              {error && (
                <div
                  className="alert alert-danger py-2 mb-3 d-flex align-items-center"
                  role="alert"
                >
                  <div>{error}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label small text-muted fw-bold"
                  >
                    📧 EMAIL ADDRESS
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-light d-flex align-items-center justify-content-center"
                      style={{ width: "48px", height: "38px" }}
                    >
                      📧
                    </span>

                    <input
                      type="email"
                      className="form-control border-start-0"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        isAdmin ? "admin@example.com" : "Enter your email"
                      }
                      style={{ height: "38px" }}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label small text-muted fw-bold"
                  >
                    🔑 PASSWORD
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-light d-flex align-items-center justify-content-center"
                      style={{ width: "48px", height: "38px" }}
                    >
                      🔑
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill py-2 shadow-sm"
                  >
                    {isAdmin ? "Login as Admin" : "Login as Employee"}
                  </button>
                </div>
              </form>
            </div>
            <div
              className="card-footer bg-light p-2 text-center"
              style={{ borderRadius: "0 0 20px 20px" }}
            >
              <div className="small text-muted">
                Secure Login | © 2025 Employee Payroll System
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
