
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import StudentList from './Pages/StudentList';

function App() {
  const [isLoggedIn] = useState(true); // Update based on actual login logic

  return (
    <Router>
      <Routes>
         <Route path="/" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/studentlist" element={<StudentList />} />
    <Route path="/edit/:id" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
