import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/organisations">Organisations</Link></li>
        <li className="dropdown">
          <span>Register ▼</span>
          <ul className="dropdown-menu">
            <li><Link to="/register-donor">As Donor</Link></li>
            <li><Link to="/register-organisation">As Organisation</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
