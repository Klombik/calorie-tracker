import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodEntryForm from '../components/FoodEntryForm';
import DiaryEntryList from '../components/DiaryEntryList';
import '../styles/FoodDiaryPage.css';

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

interface Profile {
  dailyCalorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatsTarget: number;
}

const FoodDiaryPage: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);
  const [profile, setProfile] = useState<Profile | null>(null);

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
  
  // Добавляем fallback значения, если targets не установлены
  const proteinTarget = profile.proteinTarget || calculateDefaultTarget(profile.dailyCalorieTarget, 'protein');
  const carbsTarget = profile.carbsTarget || calculateDefaultTarget(profile.dailyCalorieTarget, 'carbs');
  const fatsTarget = profile.fatsTarget || calculateDefaultTarget(profile.dailyCalorieTarget, 'fats');

  const remainingCalories = Math.round((profile.dailyCalorieTarget - totalCalories) * 100) / 100;
  const progressPercentage = Math.min((totalCalories / profile.dailyCalorieTarget) * 100, 100);
  
  // Правильный расчёт процентов
  const proteinPercentage = proteinTarget > 0 
    ? Math.round((totalProtein / proteinTarget) * 100)
    : 0;
  const carbsPercentage = carbsTarget > 0 
    ? Math.round((totalCarbs / carbsTarget) * 100)
    : 0;
  const fatsPercentage = fatsTarget > 0 
    ? Math.round((totalFats / fatsTarget) * 100)
    : 0;

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
          <span>Protein: {totalProtein}g ({proteinPercentage}% of {proteinTarget}g)</span>
        </div>
        <div className="macro carbs">
          <span>Carbs: {totalCarbs}g ({carbsPercentage}% of {carbsTarget}g)</span>
        </div>
        <div className="macro fats">
          <span>Fats: {totalFats}g ({fatsPercentage}% of {fatsTarget}g)</span>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для расчета стандартных значений
const calculateDefaultTarget = (calories: number, macro: 'protein' | 'carbs' | 'fats') => {
  // Стандартные соотношения: 30% белка, 40% углеводов, 30% жиров
  const percentage = {
    protein: 0.3,
    carbs: 0.4,
    fats: 0.3
  };
  
  // Калории на грамм: 4 для белка и углеводов, 9 для жиров
  const caloriesPerGram = macro === 'fats' ? 9 : 4;
  
  return Math.round((calories * percentage[macro]) / caloriesPerGram);
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