// File: /src/components/Navbar/Navbar_NoLogo.js
import React from 'react';
import Logo from "../../Images/Logo_No_Slogan.png"
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={Logo} alt="Logo" className="logo" />
    </nav>
  );
} // <--- Navbar() function ends here

export default Navbar;