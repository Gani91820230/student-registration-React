// src/Pages/StudentList.js
// src/Pages/StudentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';
import StudentFormModal from './StudentFormModal';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialState());
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const API_BASE = 'https://uat-tgche.aptonline.in:8080/react/api/students';

  function initialState() {
    return {
      id: '',
      name: '',
      gender: '',
      mobile: '',
      email: '',
      dob: '',
      category: '',
      photo: ''
    };
  }
 const navigate = useNavigate();
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Accept: 'application/json' }
      });

      console.log('✅ API Response:', res.data);
      setStudents(res.data);
    } catch (err) {
      console.error('❌ Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    navigate('/register'); // 👈 navigate to RegisterPage
  };

  const handleView = (student) => {
    setFormData(student);
    setIsEdit(false);
    setIsView(true);
    setShowModal(true);
  };

  const handleEdit = (student) => {
  navigate('/register', { state: { student, isEdit: true } });
};

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete?")) {
    try {
      const data = new FormData();
      data.append("id", id);

      await axios.post("https://uat-tgche.aptonline.in:8080/react/api/students/delete", data);
      alert("✅ Deleted");
      fetchStudents();
    } catch (err) {
      alert("❌ Delete failed");
      console.error(err);
    }
  }
};

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (isEdit) {
        await axios.put(`${API_BASE}/${formData.id}`, data);
      } else {
        await axios.post(API_BASE, data);
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      alert('❌ Operation failed');
      console.error(err);
    }
  };

  return (
    <div className='student-list-container '>
    <div className="container mt-4">
      <h2 className="mb-3">📋 Student List</h2>
       <Button className="mb-3 btn btn-success" onClick={handleAdd}>➕ Add Student</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
           
            <th>Name</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Category</th>
            <th>Actions</th>
             <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? students.map(student => (
            <tr key={student.id}>
              
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.mobile}</td>
              <td>{student.email}</td>
              <td>{student.dob?.split('T')[0]}</td>
              <td>{student.category}</td>
              <td>
                {student.photo ? (
                  <img
                    src={`https://uat-tgche.aptonline.in:8080/react/Uploads/${student.photo}`}
                    alt="pic"
                    width="60"
                    height="60"
                  />
                ) : 'N/A'}
              </td>
              <td>
                <Button size="sm" variant="info" onClick={() => handleView(student)}>View</Button>{' '}
                <Button size="sm" variant="warning" onClick={() => handleEdit(student)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="8" className="text-center text-danger">❌ No Students Found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <StudentFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        isView={isView}
      />
    </div>
    </div>
  );
} 