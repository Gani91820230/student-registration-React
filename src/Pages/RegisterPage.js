// src/Pages/RegisterPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.state?.isEdit || false;
  const editStudent = location.state?.student || null;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    mobile: '',
    email: '',
    dob: '',
    category: '',
    photo: null
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isEdit && editStudent) {
      setFormData({
        id: editStudent.id,
        name: editStudent.name,
        gender: editStudent.gender,
        mobile: editStudent.mobile,
        email: editStudent.email,
        dob: editStudent.dob?.split('T')[0],
        category: editStudent.category,
        photo: editStudent.photo
      });
      setPreview(`https://uat-tgche.aptonline.in:8080/react/Uploads/${editStudent.photo}`);
    }
  }, [isEdit, editStudent]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value) data.append(key, value);
  });

  try {
    if (formData.id) {
      await axios.post('https://uat-tgche.aptonline.in:8080/react/api/students/update', data);
      alert('✅ Student updated successfully!');
    } else {
      await axios.post('https://uat-tgche.aptonline.in:8080/react/api/students', data);
      alert('✅ Student registered successfully!');
    }

    navigate('/studentlist'); // ✅ Redirect to list page
  } catch (err) {
    alert('❌ Operation failed');
    console.error(err);
  }
};

  return (
    <div className="register-container">
     <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
  <h2>{isEdit ? '✏️ Edit Student' : '📝 Student Registration'}</h2>

  <div className="form-grid">
    <div className="form-group">
      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label>Gender</label>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>

    <div className="form-group">
      <label>Mobile</label>
      <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label>Date of Birth</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option>General</option>
        <option>OBC</option>
        <option>SC</option>
        <option>ST</option>
      </select>
    </div>
  </div>

  {/* File Upload with Preview beside it */}
  <div className="image-upload-row">
    <input type="file" name="photo" accept="image/*" onChange={handleChange} />
    {preview && <img src={preview} alt="Preview" className="preview-img" />}
  </div>

  <button type="submit">{isEdit ? 'Update' : 'Register'}</button>
</form>

    </div>
  );
}
