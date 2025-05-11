import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Track Your Calories</h1>
          <p>Easily monitor your daily food intake and achieve your health goals</p>
          <Link to="/diary" className="btn btn-primary">Start Tracking</Link>
        </div>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <i className="fas fa-book"></i>
          <h3>Food Diary</h3>
          <p>Track what you eat every day with our easy-to-use diary.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-utensils"></i>
          <h3>Diet Planner</h3>
          <p>Plan your meals ahead to stay on track with your goals.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-database"></i>
          <h3>Food Database</h3>
          <p>Access thousands of foods with complete nutritional info.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;