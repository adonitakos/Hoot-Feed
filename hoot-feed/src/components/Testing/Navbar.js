import React, { useState } from 'react';
import Logo from "../../Images/Logo_No_Slogan.png"
import "../../Styling/Navbar.css"

function Navbar() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="login">
        
        {isLoginOpen && (
          <div className="dropdown-login">
            {/* Your login form or content goes here */}
          </div>
        )}
        <button onClick={toggleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
}

export default Navbar;
