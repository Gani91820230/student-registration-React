// src/Pages/RegisterPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      if (name === 'name' && /[^A-Za-z\s]/.test(value)) return;
      if (name === 'mobile' && /[^0-9]/.test(value)) return;

      setFormData({ ...formData, [name]: value });
    }
  };

  const showToast = (msg, position = 'top-right') => {
    toast.error(msg, {
      position,
      autoClose: 5000,
      theme: 'colored'
    });
  };

  const validateForm = () => {
  const nameRegex = /^[A-Za-z\s]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.name || !nameRegex.test(formData.name)) {
    showToast('Name is required and must contain only letters', 'top-left');
    return false;
  }

  if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
    showToast('Mobile must be 10 digits & start with 6-9', 'top-right');
    return false;
  }

  if (!formData.dob) {
    showToast('Date of Birth is required', 'top-left');
    return false;
  }

  if (!formData.email || !emailRegex.test(formData.email)) {
    showToast('Valid email is required', 'top-right');
    return false;
  }

  if (!formData.gender) {
    showToast('Please select Gender', 'top-left');
    return false;
  }

  if (!formData.category) {
    showToast('Please select Category', 'top-right');
    return false;
  }

  if (!formData.photo || (typeof formData.photo === 'string' && !isEdit)) {
    showToast('Photo is required', 'top-left');
    return false;
  }

  return true;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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

      setTimeout(() => navigate('/studentlist'), 3000);
    } catch (err) {
      showToast('❌ Operation failed', 'top-center');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer newestOnTop />
      <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>{isEdit ? '✏️ Edit Student' : '📝 Student Registration'}</h2>

        <div className="form-grid">
          {/* Row 1 */}
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} maxLength="10" />
          </div>

          {/* Row 2 */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          {/* Row 3 */}
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
            </select>
          </div>
        </div>

        {/* Photo upload */}
        <div className="image-upload-row">
          <label>Upload Photo</label>
          <br></br>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" className="preview-img" />}
        </div>

        <button type="submit">{isEdit ? 'Update' : 'Register'}</button>
      </form>
    </div>
  );
}



