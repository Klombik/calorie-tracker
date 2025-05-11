import React from 'react';
import '../../assets/css/FoodItem.css';

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
        <span>{food.calories} kcal</span>
        <span>P: {food.protein}g</span>
        <span>C: {food.carbs}g</span>
        <span>F: {food.fats}g</span>
      </div>
    </div>
  );
};

export default FoodItem;