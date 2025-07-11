// src/Pages/StudentFormModal.js
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import './StudentFormModal.css'; // custom styling

export default function StudentFormModal({ show, onHide, formData, isEdit, isView }) {
  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>{isView ? '👁️ View Student Details' : 'Student'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="student-popup">
          <Row>
            <Col md={5} className="text-center">
              <img
                src={`https://uat-tgche.aptonline.in:8080/react/Uploads/${formData.photo}`}
                alt="Student"
                className="student-photo"
              />
            </Col>
            <Col md={7}>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Mobile:</strong> {formData.mobile}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>DOB:</strong> {formData.dob?.split('T')[0]}</p>
              <p><strong>Category:</strong> {formData.category}</p>
            </Col>
          </Row>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ❌ Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
