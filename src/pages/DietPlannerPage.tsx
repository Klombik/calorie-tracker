import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlan from '../components/MealPlan';
import '../styles/DietPlannerPage.css';

interface Meal {
  id: string;
  name: string;
  description: string;
  meals?: Array<{
    name: string;
    foods: Array<{
      foodId: string;
      name: string;
      servings: number;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    }>;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }>;
  foods?: Array<{
    foodId: string;
    name: string;
    servings: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

const DietPlannerPage: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [plansResponse, profileResponse] = await Promise.all([
          axios.get('/api/meal-plans'),
          axios.get('/api/profile')
        ]);
        
        // Добавляем проверку на наличие данных
        const plans = Array.isArray(plansResponse.data) ? plansResponse.data : [];
        setMealPlans(plans);
        setProfile(profileResponse.data || {
          dailyCalorieTarget: 2000,
          macronutrients: { protein: 30, carbs: 50, fats: 20 }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        // Устанавливаем значения по умолчанию при ошибке
        setProfile({
          dailyCalorieTarget: 2000,
          macronutrients: { protein: 30, carbs: 50, fats: 20 }
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGeneratePlan = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!profile) {
        throw new Error('Profile data not loaded');
      }

      const response = await axios.post('/api/meal-plans/generate', {
        calorieTarget: profile.dailyCalorieTarget,
        macronutrients: profile.macronutrients
      });
      
      // Добавляем проверку на наличие данных
      const newPlan = response.data && response.data[0] ? response.data[0] : null;
      if (newPlan) {
        setMealPlans([newPlan, ...mealPlans].slice(0, 5));
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('Failed to generate meal plan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="diet-planner-page">
      <h2>Diet Planner</h2>
      
      {profile && (
        <div className="planner-summary">
          <h3>Your Nutrition Targets</h3>
          <div className="targets">
            <div className="target-item">
              <span className="target-label">Calories:</span>
              <span className="target-value">{profile.dailyCalorieTarget} kcal</span>
            </div>
            <div className="target-item">
              <span className="target-label">Protein:</span>
              <span className="target-value">{profile.macronutrients.protein}%</span>
            </div>
            <div className="target-item">
              <span className="target-label">Carbs:</span>
              <span className="target-value">{profile.macronutrients.carbs}%</span>
            </div>
            <div className="target-item">
              <span className="target-label">Fats:</span>
              <span className="target-value">{profile.macronutrients.fats}%</span>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary generate-btn"
        onClick={handleGeneratePlan}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate New Meal Plan'}
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
            <p className="no-plans">No meal plans found. Click "Generate New Meal Plan" to create one.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DietPlannerPage;