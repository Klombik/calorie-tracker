import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">CalorieTracker</Link>
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/diary">Дневник</Link></li>
            <li><Link to="/products">Продукты</Link></li>
            <li><Link to="/recipes">Рецепты</Link></li>
            <li><Link to="/profile">Профиль</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;