import React from 'react';
import '../styles/MealPlan.css';

interface FoodItem {
  foodId: string;
  servings: number;
}

interface MealPlanProps {
  plan: {
    id: string;
    name: string;
    description: string;
    foods: FoodItem[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const MealPlan: React.FC<MealPlanProps> = ({ plan }) => {
  return (
    <div className="meal-plan-card">
      <h3>{plan.name}</h3>
      <p className="meal-plan-description">{plan.description}</p>

      <div className="meal-plan-summary">
        <div className="summary-item"><span>Calories:</span><span>{plan.calories}</span></div>
        <div className="summary-item"><span>Protein:</span><span>{plan.protein}g</span></div>
        <div className="summary-item"><span>Carbs:</span><span>{plan.carbs}g</span></div>
        <div className="summary-item"><span>Fats:</span><span>{plan.fats}g</span></div>
      </div>

      <h4>Foods:</h4>
      <ul className="meal-plan-foods">
        {plan.foods.map((food, index) => (
          <li key={index} className="food-item">
            <span className="food-name">Food ID: {food.foodId}</span>
            <span className="food-servings">{food.servings} serving{food.servings !== 1 ? 's' : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlan;
