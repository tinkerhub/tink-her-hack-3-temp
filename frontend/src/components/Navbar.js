import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.jpg" alt="Logo"/>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/organisations">Organisations</Link></li>
        <li className="dropdown">
          <span>Register ▼</span>
          <ul className="dropdown-menu">
            <li><Link to="/registerdonor">As Donor</Link></li>
            <li><Link to="/registerorganisation">As Organisation</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
