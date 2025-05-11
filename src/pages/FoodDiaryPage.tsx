import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodEntryForm from '../components/FoodEntryForm';
import DiaryEntryList from '../components/DiaryEntryList';
import '../../assets/css/FoodDiaryPage.css';

interface DiaryEntry {
  id: string;
  foodId: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;
}

const FoodDiaryPage: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diaryResponse, profileResponse] = await Promise.all([
          axios.get(`/api/diaries?date=${date}`),
          axios.get('/api/profile')
        ]);
        setEntries(diaryResponse.data);
        setProfile(profileResponse.data);
        calculateTotals(diaryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEntries([]);
        calculateTotals([]);
      }
    };
    fetchData();
  }, [date]);

  const calculateTotals = (entries: DiaryEntry[]) => {
    const totals = entries.reduce((acc, entry) => {
      acc.calories += entry.calories;
      acc.protein += entry.protein;
      acc.carbs += entry.carbs;
      acc.fats += entry.fats;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    // Round to 2 decimal places
    setTotalCalories(Math.round(totals.calories * 100) / 100);
    setTotalProtein(Math.round(totals.protein * 100) / 100);
    setTotalCarbs(Math.round(totals.carbs * 100) / 100);
    setTotalFats(Math.round(totals.fats * 100) / 100);
  };

  const handleAddEntry = async (foodId: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', servings: number) => {
    try {
      const response = await axios.post('/api/diaries', {
        foodId,
        date,
        mealType,
        servings
      });
      setEntries([...entries, response.data]);
      calculateTotals([...entries, response.data]);
    } catch (error) {
      console.error('Error adding diary entry:', error);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await axios.delete(`/api/diaries/${id}`);
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      calculateTotals(updatedEntries);
    } catch (error) {
      console.error('Error deleting diary entry:', error);
    }
  };

  const DiarySummary = () => {
    if (!profile) return null;
    
    const remainingCalories = Math.round((profile.dailyCalorieTarget - totalCalories) * 100) / 100;
    const progressPercentage = Math.min((totalCalories / profile.dailyCalorieTarget) * 100, 100);
    
    // Calculate macronutrient percentages (rounded to nearest integer)
    const proteinPercentage = totalCalories > 0 ? Math.round((totalProtein * 4 / totalCalories) * 100) : 0;
    const carbsPercentage = totalCalories > 0 ? Math.round((totalCarbs * 4 / totalCalories) * 100) : 0;
    const fatsPercentage = totalCalories > 0 ? Math.round((totalFats * 9 / totalCalories) * 100) : 0;

    return (
      <div className="summary-card">
        <h3>Daily Progress</h3>
        <div className="calorie-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="calorie-numbers">
            <span>{totalCalories} / {profile.dailyCalorieTarget} kcal</span>
            <span className={remainingCalories < 0 ? 'negative' : ''}>
              {remainingCalories} kcal remaining
            </span>
          </div>
        </div>
        <div className="macronutrients">
          <div className="macro protein">
            <span>Protein: {totalProtein}g ({proteinPercentage}%)</span>
          </div>
          <div className="macro carbs">
            <span>Carbs: {totalCarbs}g ({carbsPercentage}%)</span>
          </div>
          <div className="macro fats">
            <span>Fats: {totalFats}g ({fatsPercentage}%)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="food-diary-page">
      <h2>Food Diary</h2>
      <div className="date-selector">
        <label htmlFor="diary-date">Date:</label>
        <input
          type="date"
          id="diary-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <DiarySummary />
      
      <FoodEntryForm onAddEntry={handleAddEntry} />
      
      <div className="meal-sections">
        <DiaryEntryList 
          title="Breakfast" 
          entries={entries.filter(e => e.mealType === 'breakfast')} 
          onDelete={handleDeleteEntry}
        />
        <DiaryEntryList 
          title="Lunch" 
          entries={entries.filter(e => e.mealType === 'lunch')} 
          onDelete={handleDeleteEntry}
        />
        <DiaryEntryList 
          title="Dinner" 
          entries={entries.filter(e => e.mealType === 'dinner')} 
          onDelete={handleDeleteEntry}
        />
        <DiaryEntryList 
          title="Snacks" 
          entries={entries.filter(e => e.mealType === 'snack')} 
          onDelete={handleDeleteEntry}
        />
      </div>
    </div>
  );
};

export default FoodDiaryPage;