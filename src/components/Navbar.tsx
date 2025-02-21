import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          News Aggregator
        </Link>
      </div>
      <button
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <span className="navbar-toggle-icon"></span>
      </button>
      <div className={`navbar-links ${isOpen ? 'navbar-links--open' : ''}`}>
        <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/news" className="navbar-link" onClick={() => setIsOpen(false)}>
          News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;