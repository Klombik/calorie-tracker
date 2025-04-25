import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CalorieTracker
        </Link>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/diary" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-book"></i> Diary
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/planner" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-utensils"></i> Planner
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/database" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-database"></i> Food DB
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-user"></i> Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;