import React, { useState } from 'react';
import Logo from "../../Images/Logo_No_Slogan.png"
import "../Navbar/Navbar.css"
import { Auth } from 'aws-amplify';

function Navbar() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password);
      console.log("Successful Login");
      window.location.href = '/dashboard'
    } catch (error) {
      console.log('Login error:', error);
      // Handle login error
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="login">
        <button onClick={toggleLogin} className="login-button">Login</button>
        {isLoginOpen && (
          <div className="dropdown-login">
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
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
