import React from 'react';
import '../styles/MealPlan.css';

interface FoodItem {
  foodId: string;
  name: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface Meal {
  name: string;
  foods: FoodItem[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealPlanProps {
  plan: {
    id: string;
    name: string;
    description: string;
    meals?: Meal[]; // Делаем meals опциональным
    foods?: FoodItem[]; // Для обратной совместимости
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
  };
}

const MealPlan: React.FC<MealPlanProps> = ({ plan }) => {
  // Обработка как старой, так и новой структуры данных
  const mealsToRender = plan.meals || (plan.foods ? [{
    name: 'Combined Meals',
    foods: plan.foods,
    calories: plan.totalCalories,
    protein: plan.totalProtein,
    carbs: plan.totalCarbs,
    fats: plan.totalFats
  }] : []);

  return (
    <div className="meal-plan-card">
      <div className="plan-header">
        <h3>{plan.name}</h3>
        <p className="plan-description">{plan.description}</p>
      </div>
      
      <div className="plan-summary">
        <div className="summary-item">
          <span className="summary-label">Total Calories:</span>
          <span className="summary-value">{Math.round(plan.totalCalories * 100) / 100} kcal</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Protein:</span>
          <span className="summary-value">{Math.round(plan.totalProtein * 100) / 100}g</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Carbs:</span>
          <span className="summary-value">{Math.round(plan.totalCarbs * 100) / 100}g</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Fats:</span>
          <span className="summary-value">{Math.round(plan.totalFats * 100) / 100}g</span>
        </div>
      </div>
      
      {mealsToRender.length > 0 ? (
        mealsToRender.map((meal, mealIndex) => (
          <div key={mealIndex} className="meal-section">
            <h4>{meal.name}</h4>
            <div className="meal-summary">
              <span>{meal.calories} kcal</span>
              <span>P: {meal.protein}g</span>
              <span>C: {meal.carbs}g</span>
              <span>F: {meal.fats}g</span>
            </div>
            {meal.foods && meal.foods.length > 0 ? (
              <ul className="food-list">
                {meal.foods.map((food, foodIndex) => (
                  <li key={foodIndex} className="food-item">
                    <div className="food-info">
                      <span className="food-name">{food.name}</span>
                      <span className="food-servings">
                        {food.servings} serving{food.servings !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="food-nutrition">
                      <span>{Math.round(food.calories * 100) / 100} kcal</span>
                      <span>P: {Math.round(food.protein * 100) / 100}g</span>
                      <span>C: {Math.round(food.carbs * 100) / 100}g</span>
                      <span>F: {Math.round(food.fats * 100) / 100}g</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-foods">No foods in this meal</p>
            )}
          </div>
        ))
      ) : (
        <p className="no-meals">No meals planned</p>
      )}
    </div>
  );
};

export default MealPlan;