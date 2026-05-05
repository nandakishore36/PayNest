import React, { useState } from "react";
import { Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`d-flex flex-column text-white ${
        expanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
      style={{
        height: "100vh",
        width: expanded ? "250px" : "80px",
        position: "fixed",
        left: 0,
        top: 0,
        transition: "width 0.3s ease",
        backgroundColor: "#0d6efd", // Bootstrap primary blue
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-light">
        {expanded && <h5 className="m-0 fw-bold">Payroll System</h5>}
        <Button
          variant="outline-light"
          size="sm"
          className={expanded ? "ms-auto" : "mx-auto"}
          onClick={toggleSidebar}
        >
          <i
            className={`bi ${
              expanded ? "bi-chevron-left" : "bi-chevron-right"
            }`}
          ></i>
        </Button>
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column mt-3 w-100">
        {/* <Nav.Link
          as={Link}
          to="/"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-house-door fs-5 me-3"></i>
          {expanded && <span>Home</span>}
        </Nav.Link> */}

        <Nav.Link
          as={Link}
          to="/employee"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          {expanded && <span>Dashboard</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/take-leave"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-calendar-check fs-5 me-3"></i>
          {expanded && <span>Request Leave</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/payslip-tax-report"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-file-earmark-text fs-5 me-3"></i>
          {expanded && <span>Payslip & Tax Report</span>}
        </Nav.Link>

      </Nav>

      {/* Logout Button */}
      <div className="mt-auto p-3 border-top border-light">
        <Button
          variant="light"
          onClick={handleLogout}
          className="w-100 d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          {expanded && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default NavigationBar;
