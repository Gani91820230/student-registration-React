// src/Pages/EditStudent.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RegisterPage.css';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', email: '', mobile: '' });

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('students')) || [];
    if (all[id]) setStudent(all[id]);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem('students')) || [];
    all[id] = student;
    localStorage.setItem('students', JSON.stringify(all));
    alert('Student Updated!');
    navigate('/list');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={student.name} onChange={handleChange} required />
          <input name="email" value={student.email} onChange={handleChange} required />
          <input name="mobile" value={student.mobile} onChange={handleChange} required />
          <button className="register-btn" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
