import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} CalorieTracker - Приложение для учёта калорий</p>
        <div className="links">
          <a href="/privacy">Политика конфиденциальности</a>
          <a href="/terms">Условия использования</a>
          <a href="/contact">Контакты</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;