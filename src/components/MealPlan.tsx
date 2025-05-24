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
    meals?: Meal[];
    foods?: FoodItem[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
  };
}

const MealPlan: React.FC<MealPlanProps> = ({ plan }) => {
  const formatNumber = (num: number) => {
    const rounded = Math.round(num * 100) / 100;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2);
  };

  const mealsToRender = plan.meals || (plan.foods ? [{
    name: 'Прием пищи',
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
        <div><strong>Calories:</strong> {formatNumber(plan.totalCalories)} kcal</div>
        <div><strong>Protein:</strong> {formatNumber(plan.totalProtein)} g</div>
        <div><strong>Carbs:</strong> {formatNumber(plan.totalCarbs)} g</div>
        <div><strong>Fats:</strong> {formatNumber(plan.totalFats)} g</div>
      </div>

      {mealsToRender.length > 0 ? (
        mealsToRender.map((meal, mealIndex) => (
          <div key={mealIndex} className="meal-section">
            <h4>{meal.name}</h4>

            <table className="meal-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Portions</th>
                  <th>Calories</th>
                  <th>Protein</th>
                  <th>Carbs</th>
                  <th>Fats</th>
                </tr>
              </thead>
              <tbody>
                {meal.foods.map((food, foodIndex) => (
                  <tr key={foodIndex}>
                    <td>{food.name}</td>
                    <td>{food.servings}</td>
                    <td>{formatNumber(food.calories)} kcal</td>
                    <td>{formatNumber(food.protein)} g</td>
                    <td>{formatNumber(food.carbs)} g</td>
                    <td>{formatNumber(food.fats)} g</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="meal-total-row">
                  <td colSpan={2}><strong>Total:</strong></td>
                  <td><strong>{formatNumber(meal.calories)} kcal</strong></td>
                  <td><strong>{formatNumber(meal.protein)} g</strong></td>
                  <td><strong>{formatNumber(meal.carbs)} g</strong></td>
                  <td><strong>{formatNumber(meal.fats)} g</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))
      ) : (
        <p className="no-meals">There are no scheduled meals</p>
      )}
    </div>
  );
};

export default MealPlan;
