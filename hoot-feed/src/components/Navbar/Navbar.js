import React, { useState, useEffect, useRef } from 'react';
import Logo from "../../Images/Logo_No_Slogan.png"
import "../Navbar/Navbar.css"
import { Auth } from 'aws-amplify';

function Navbar() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginRef = useRef();

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password);
      console.log("Successful Login");
      window.location.href = '/mainfeed'
    } catch (error) {
      console.log('Login error:', error);
      // Handle login error
    }
  };

  const handleClickOutside = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      setLoginOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <div className="logo">
        <a href="/" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" className="logo-image" />
        </a>
      </div>
      <div className="login">
        <button onClick={toggleLogin} className="login-button">Sign In</button>
        {isLoginOpen && (
          <div ref={loginRef} className="dropdown-login">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="forgot-password">
              <a href="/reset">Forgot Password</a>
            </p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
