import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import jsPDF from "jspdf";
import axios from "axios";

const Payslip = () => {
  const email = localStorage.getItem("email");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/employees");
        const emp = res.data.find((emp) => emp.email === email);

        if (!emp) {
          setError(
            "Employee not found. Please check your email or contact HR."
          );
        } else {
          setEmployee(emp);
        }
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError("Failed to load employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchEmployee();
    else setError("Email not found. Please login again.");
  }, [email]);

  const getTaxRate = (annualSalary) => {
    if (annualSalary <= 700000) return 3.25;
    else if (annualSalary <= 1000000)
      return 5; // Fixed the typo from 100000 to 1000000
    else if (annualSalary <= 2000000) return 10;
    else return 15;
  };

  const calculateSalary = () => {
    const { salary, WorkingDays } = employee || {};
    const totalWorkingDays = 30;
    const dailySalary = salary / totalWorkingDays;
    const salaryForPresentDays = dailySalary * WorkingDays;

    const annualSalary = salary * 12;
    const taxRate = getTaxRate(annualSalary);
    const taxAmount = (salaryForPresentDays * taxRate) / 100;
    const netSalary = salaryForPresentDays - taxAmount;

    return {
      monthlySalary: salary,
      annualSalary,
      salaryForPresentDays,
      taxRate,
      taxAmount,
      netSalary,
    };
  };

  const handleDownloadPayslip = () => {
    const salary = calculateSalary();
    const doc = new jsPDF();
    const companyLogo = "Company Name Ltd."; // Replace with actual logo if available

    // Styling the PDF
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 30, "F");

    // Header
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text(companyLogo, 105, 15, null, null, "center");

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Payslip & Tax Report", 105, 40, null, null, "center");

    // Employee Info Section
    doc.setFillColor(245, 245, 245);
    doc.rect(10, 45, 190, 40, "F");

    doc.setFontSize(12);
    doc.text(`Name: ${employee.name}`, 20, 55);
    doc.text(
      `Designation: ${employee.designation || "Software Engineer"}`,
      20,
      65
    );
    doc.text(`Email: ${employee.email}`, 20, 75);

    // Salary Info Section
    doc.setFillColor(250, 250, 250);
    doc.rect(10, 90, 190, 80, "F");

    doc.text(
      `Monthly Salary: ₹${salary.monthlySalary.toLocaleString()}`,
      20,
      100
    );
    doc.text(
      `Annual Salary: ₹${salary.annualSalary.toLocaleString()}`,
      120,
      100
    );
    doc.text(`Days Present: ${employee.WorkingDays} / 30`, 20, 110);
    doc.text(
      `Salary for Present Days: ₹${salary.salaryForPresentDays
        .toFixed(2)
        .toLocaleString()}`,
      120,
      110
    );
    doc.text(`Tax Rate: ${salary.taxRate}%`, 20, 120);
    doc.text(
      `Tax Amount: ₹${salary.taxAmount.toFixed(2).toLocaleString()}`,
      120,
      120
    );

    // Net Salary Highlight
    doc.setFillColor(230, 240, 255);
    doc.rect(10, 140, 190, 20, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text(
      `Net Salary: ₹${salary.netSalary.toFixed(2).toLocaleString()}`,
      105,
      155,
      null,
      null,
      "center"
    );

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "This is a computer-generated document and does not require a signature.",
      105,
      280,
      null,
      null,
      "center"
    );
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      105,
      285,
      null,
      null,
      "center"
    );

    doc.save(`payslip-${employee.name}-${new Date().toLocaleDateString()}.pdf`);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading payslip data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  const salary = calculateSalary();

  return (
    <Container className="py-5">
      <Card className="shadow border-0 mb-5">
        <Card.Header className="bg-primary text-white py-3">
          <h2 className="mb-0 text-center">Payslip & Tax Report</h2>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Employee Information</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-light rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <span className="h3 mb-0">{employee.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h5 className="mb-1">{employee.name}</h5>
                      <p className="text-muted mb-0">
                        {employee.designation || "Software Engineer"}
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>Email:</strong> {employee.email}
                  </p>
                  <p className="mb-0">
                    <strong>Attendance:</strong>{" "}
                    <span className="badge bg-success">
                      {employee.WorkingDays} / 30 days
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Salary Overview</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={6}>
                      <strong>Monthly Salary:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      ₹{salary.monthlySalary.toLocaleString()}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={6}>
                      <strong>Annual Salary:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      ₹{salary.annualSalary.toLocaleString()}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={6}>
                      <strong>Salary (Present Days):</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      ₹{salary.salaryForPresentDays.toFixed(2).toLocaleString()}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={6}>
                      <strong>Tax Rate:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      {salary.taxRate}%
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={6}>
                      <strong>Tax Amount:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      ₹{salary.taxAmount.toFixed(2).toLocaleString()}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mb-4 bg-light">
            <Card.Body className="text-center">
              <h4 className="text-success mb-0">
                Net Salary: ₹{salary.netSalary.toFixed(2).toLocaleString()}
              </h4>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2 col-md-6 mx-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownloadPayslip}
              className="py-3"
            >
              <i className="bi bi-download me-2"></i> Download Payslip PDF
            </Button>
          </div>
        </Card.Body>
        <Card.Footer className="text-center text-muted py-3">
          <small>
            This is a computer-generated document and requires no signature.
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Payslip;
