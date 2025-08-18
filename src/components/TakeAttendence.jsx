import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Nav,
  Button,
  Table,
  Badge,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TakeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState("/take-attendance"); // Set active link to current page

  // Mock leave requests for the sidebar badge
  const [leaveRequests] = useState([
    { id: 1, employee: "John Doe", date: "2025-04-15", status: "Pending" },
    { id: 2, employee: "Jane Smith", date: "2025-04-18", status: "Pending" },
  ]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNavigation = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const markPresent = async (email, index) => {
    try {
      await axios.put(
        "http://localhost:5000/api/employees/increment-working-days",
        { email }
      );
      const updatedEmployees = [...employees];
      updatedEmployees[index].WorkingDays += 1; // Increment WorkingDays for this employee in state
      updatedEmployees[index].attendanceStatus = "Attendance Marked"; // Set status to "Attendance Marked"
      setEmployees(updatedEmployees); // Update the state to reflect the change
      window.alert("Attendance Marked");
    } catch (err) {
      console.error("Error marking present:", err);
    }
  };

  const markAbsent = async (email, index) => {
    try {
      const updatedEmployees = [...employees];
      updatedEmployees[index].attendanceStatus = "Attendance Marked"; // Set status to "Attendance Marked" for absent
      setEmployees(updatedEmployees); // Update the state to reflect the change
      window.alert("Attendance Marked Absent");
    } catch (err) {
      console.error("Error marking absent:", err);
    }
  };

  const pendingLeaveCount = leaveRequests.filter(
    (req) => req.status === "Pending"
  ).length;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-white ${
          showSidebar ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
        style={{
          width: showSidebar ? "250px" : "70px",
          minHeight: "100vh",
          transition: "width 0.3s",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          {showSidebar && (
            <div className="fw-bold fs-5 text-dark">📊 XYZ ADMIN</div>
          )}
          <Button
            variant="link"
            className="text-dark p-0"
            onClick={toggleSidebar}
            style={{
              marginLeft: showSidebar ? "0" : "auto",
              marginRight: showSidebar ? "0" : "auto",
            }}
          >
            {showSidebar ? "◀" : "▶"}
          </Button>
        </div>

        <Nav className="flex-column mt-3">
          <Nav.Link
            onClick={() => handleNavigation("/admin")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/admin" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">🏠</span>
            {showSidebar && <span>Home</span>}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/view-employee")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/view-employee" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">👥</span>
            {showSidebar && <span>View Employees</span>}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/add-employee")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/add-employee" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">➕</span>
            {showSidebar && <span>Add Employee</span>}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/approve-leave")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/approve-leave" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">📅</span>
            {showSidebar && (
              <div className="d-flex align-items-center">
                <span>Leaves</span>
                {/* {pendingLeaveCount > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                    {pendingLeaveCount}
                  </Badge>
                )} */}
              </div>
            )}
            {!showSidebar && pendingLeaveCount > 0 && (
              <Badge
                bg="danger"
                pill
                style={{ position: "absolute", top: "5px", right: "5px" }}
              >
                {pendingLeaveCount}
              </Badge>
            )}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/take-attendance")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/take-attendance" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">✓</span>
            {showSidebar && <span>Attendance</span>}
          </Nav.Link>
        </Nav>

        <div className="mt-auto p-3">
          <Button
            variant="outline-primary"
            onClick={handleLogout}
            className={showSidebar ? "w-100" : "w-100 p-1"}
          >
            {showSidebar ? "Logout" : "🚪"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="content-wrapper bg-light"
        style={{
          marginLeft: showSidebar ? "250px" : "70px",
          width: `calc(100% - ${showSidebar ? "250px" : "70px"})`,
          transition: "margin-left 0.3s, width 0.3s",
          minHeight: "100vh",
        }}
      >
        {/* Mobile Toggle Button (visible only on small screens) */}
        <div className="d-lg-none p-2 bg-primary text-white">
          <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
            ☰ Menu
          </Button>
        </div>

        <Container fluid className="py-4 px-4">
          <Row className="mb-4">
            <Col>
              <div className="bg-white rounded-3 shadow-sm p-4 border-start border-5 border-success">
                <h2 className="fw-bold text-success mb-1">Daily Attendance</h2>
                <p className="text-muted">Mark attendance for all employees</p>
              </div>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              {employees.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3 text-muted fs-1">👥</div>
                  <h4>No employees found</h4>
                  <p className="text-muted">
                    There are no employees to mark attendance for.
                  </p>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/add-employee")}
                  >
                    Add New Employee
                  </Button>
                </div>
              ) : (
                <Table hover responsive className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="fw-semibold">#</th>
                      <th className="fw-semibold">Name</th>
                      <th className="fw-semibold">Email</th>
                      <th className="fw-semibold">Mark Attendance</th>
                      <th className="fw-semibold">Working Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, index) => (
                      <tr key={emp._id} className="border-bottom">
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2 text-primary fw-bold">
                              {emp.name.charAt(0)}
                            </div>
                            {emp.name}
                          </div>
                        </td>
                        <td>{emp.email}</td>
                        <td>
                          {emp.attendanceStatus === "Attendance Marked" ? (
                            <Badge bg="success" pill>
                              Attendance Marked
                            </Badge>
                          ) : (
                            <div className="d-flex gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => markPresent(emp.email, index)}
                                disabled={
                                  emp.attendanceStatus === "Attendance Marked"
                                }
                              >
                                <i className="me-1">✓</i> Present
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => markAbsent(emp.email, index)}
                                disabled={
                                  emp.attendanceStatus === "Attendance Marked"
                                }
                              >
                                <i className="me-1">✗</i> Absent
                              </Button>
                            </div>
                          )}
                        </td>
                        <td>
                          <Badge bg="info" pill>
                            {emp.WorkingDays || 0} days
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

          <footer className="mt-5 text-center text-muted">
            <p>
              &copy; {new Date().getFullYear()} XYZ Company - All Rights
              Reserved
            </p>
          </footer>
        </Container>
      </div>

      <style jsx>{`
        .sidebar-nav-item {
          color: #333;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }

        .sidebar-nav-item:hover {
          background-color: #f0f8ff;
          color: #0d6efd;
          border-left: 4px solid #0d6efd;
        }

        .active-nav-link {
          background-color: #f0f8ff;
          color: #0d6efd !important;
          border-left: 4px solid #0d6efd;
          font-weight: 500;
        }

        @media (max-width: 991.98px) {
          .sidebar {
            display: none;
          }
          .content-wrapper {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TakeAttendance;
