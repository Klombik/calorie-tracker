import React from 'react';
import '../styles/FoodItem.css';

interface FoodItemProps {
  food: {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const FoodItem: React.FC<FoodItemProps> = ({ food }) => {
  return (
    <div className="food-item">
      <div className="food-name">{food.name}</div>
      <div className="food-nutrition">
        <div className="nutrition-block">
          <strong>Calories:</strong>
          <span>{food.calories} kcal</span>
        </div>
        <div className="nutrition-block">
          <strong>Protein:</strong>
          <span>{food.protein} g</span>
        </div>
        <div className="nutrition-block">
          <strong>Carbs:</strong>
          <span>{food.carbs} g</span>
        </div>
        <div className="nutrition-block">
          <strong>Fats:</strong>
          <span>{food.fats} g</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
