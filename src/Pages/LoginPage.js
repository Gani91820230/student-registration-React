import React, { useState } from 'react';
import './LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import eduImage from '../images/edu2.webp';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(code);
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === 'admin' &&
      password === 'admin123' &&
      inputCaptcha === captcha
    ) {
      navigate('/register');
    } else {
      setError('Invalid Username, Password or Captcha!');
      generateCaptcha();
      setInputCaptcha('');
    }
  };

  return (
    <div className="split-container">
      <div className="left-panel">
        <div className="info-box">
          <h1>🎓 Welcome to Education Portal</h1>
          <p>Your one-stop solution for student management.</p>
          <img src={eduImage} alt="EduPortal" className="login-image"  />
        </div>
      </div>
      <div className="right-panel">
         <form className="login-form" onSubmit={handleLogin} autoComplete="off">
          <h2>🔐 Login</h2>
          {error && <div className="error-msg">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="password-box">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            required
          />
          <button type="submit">Login</button>
        </form>
       
      </div>
    </div>
  );
}

