import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const TakeLeave = () => {
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/leaves/add', {
                employee,
                date,
                reason
                // status is handled as "Pending" by default in backend
            });
            setSubmitted(true);
            setEmployee('');
            setDate('');
            setReason('');
        } catch (error) {
            console.error('Error submitting leave:', error);
        }
    };

    return (
        <Container style={{ maxWidth: '600px', marginTop: '40px' }}>
            <h3>Apply for Leave</h3>
            {submitted && <Alert variant="success">Leave request submitted successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Leave Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Leave Request
                </Button>
            </Form>
        </Container>
    );
};

export default TakeLeave;
