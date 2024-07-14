import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="Nav-container">
        <div className="nav-branding">
          <img src="chef.jpeg" alt="chef" className="chef" />
          Recipe<span className="hub">APP</span>
        </div>
        <div className={nav-link-container ${isOpen ? "open" : ""}}>
          <ul>
            <li className="nav-links">
              <Link to="/" className="navs" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="nav-links">
              <Link to="/discover" className="navs" onClick={toggleMenu}>
                Discover
              </Link>
            </li>
            <li className="nav-links">
              <Link to="/addyours" className="navs" onClick={toggleMenu}>
                Add Yours
              </Link>
            </li>
            <li className="nav-links">
              <Link to="/login" className="login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
