import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar: React.FC = () => {


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          News Aggregator
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/news" className="navbar-link">
        News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;