import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Calorie Tracker. All rights reserved.</p>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;