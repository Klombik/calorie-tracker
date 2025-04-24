import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlan from '../components/MealPlan';
import '../styles/DietPlannerPage.css';

interface Meal {
  id: string;
  name: string;
  description: string;
  foods: Array<{
    foodId: string;
    servings: number;
  }>;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const DietPlannerPage: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get<Meal[]>('/api/meal-plans');
      setMealPlans(response.data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      setError('Failed to load meal plans.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post<Meal[]>('/api/meal-plans/generate');
      setMealPlans(response.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('Failed to generate meal plan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="diet-planner-page">
      <h2>Diet Planner</h2>
      <button
        className="btn btn-primary generate-btn"
        onClick={handleGeneratePlan}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Meal Plan'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="meal-plans-container">
          {mealPlans.length > 0 ? (
            mealPlans.map(plan => (
              <MealPlan key={plan.id} plan={plan} />
            ))
          ) : (
            <p>No meal plans found. Click "Generate Meal Plan" to create one.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DietPlannerPage;
