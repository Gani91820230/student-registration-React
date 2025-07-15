import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import eduImage from '../images/edu2.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const showError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      theme: 'colored',
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Validate Empty Fields
    if (!username.trim()) {
      showError('Username is required');
      return;
    }
    if (!password.trim()) {
      showError('Password is required');
      return;
    }
    if (!inputCaptcha.trim()) {
      showError('Captcha is required');
      return;
    }

    // ✅ Validate Credentials & Captcha
    if (username !== 'admin' || password !== 'admin123') {
      showError('Invalid Username or Password');
      generateCaptcha();
      setInputCaptcha('');
      return;
    }
    if (inputCaptcha !== captcha) {
      showError('Captcha does not match');
      generateCaptcha();
      setInputCaptcha('');
      return;
    }

    // ✅ Success
    navigate('/register');
  };

  return (
    <div className="split-container">
      <ToastContainer />
      <div className="left-panel">
        <div className="info-box">
          <h1>🎓 Welcome to Education Portal</h1>
          
          <img src={eduImage} alt="EduPortal" className="login-image" />
        </div>
      </div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleLogin} autoComplete="off">
          <h2>🔐 Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-box">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="captcha-box">
            <span>{captcha}</span>
            <button type="button" onClick={generateCaptcha}>↻</button>
          </div>

          <input
            type="text"
            placeholder="Enter Captcha"
            value={inputCaptcha}
            onChange={(e) => setInputCaptcha(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
