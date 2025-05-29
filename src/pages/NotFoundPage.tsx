import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <button 
          onClick={() => navigate('/')} 
          className="home-button"
        >
          Back to Home
        </button>
      </div>
      <div className="not-found-image">
        <img 
          src="https://distribution.faceit-cdn.net/images/1806d5b0-0e35-440b-b20d-9c2beeabae6d.jpg" 
          alt="okak"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;