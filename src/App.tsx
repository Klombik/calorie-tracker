import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FoodDiaryPage from './pages/FoodDiaryPage';
import DietPlannerPage from './pages/DietPlannerPage';
import FoodDatabasePage from './pages/FoodDatabasePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary" element={<FoodDiaryPage />} />
          <Route path="/planner" element={<DietPlannerPage />} />
          <Route path="/database" element={<FoodDatabasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;