import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Calorie Tracker. All rights reserved.</p>
        <div className="social-links">
          <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-vk"></i>
          </a>
          <a href="https://mail.ru" target="_blank" rel="noopener noreferrer">
            <i className="far fa-envelope"></i>
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-telegram-plane"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;