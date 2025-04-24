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
}

const FoodDiaryPage: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  useEffect(() => {
    fetchDiaryEntries();
  }, [date]);

  const fetchDiaryEntries = async () => {
    try {
      const response = await axios.get(`/api/diaries?date=${date}`);
      setEntries(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      setEntries([]);
      calculateTotals([]);
    }
  };

  const calculateTotals = (entries: DiaryEntry[]) => {
    const calories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    setTotalCalories(calories);
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
      
      <div className="summary-card">
        <h3>Daily Summary</h3>
        <p>Total Calories: {totalCalories}</p>
      </div>
      
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