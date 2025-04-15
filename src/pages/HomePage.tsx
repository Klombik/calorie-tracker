import React from 'react';
import { CalorieCalculator, DailyProgress } from '../components';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Добро пожаловать в CalorieTracker</h1>
      <CalorieCalculator />
      <DailyProgress />
    </div>
  );
};

export default HomePage;