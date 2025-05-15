import React from 'react';
import '../styles/DiaryEntryList.css';

interface DiaryEntry {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servings?: number;
}

interface DiaryEntryListProps {
  title: string;
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
}

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({ title, entries, onDelete }) => {
  const formatNumber = (num: number) => {
    const rounded = Math.round(num * 100) / 100;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2);
  };

  const totalCalories = formatNumber(entries.reduce((sum, entry) => sum + entry.calories, 0));
  const totalProtein = formatNumber(entries.reduce((sum, entry) => sum + entry.protein, 0));
  const totalCarbs = formatNumber(entries.reduce((sum, entry) => sum + entry.carbs, 0));
  const totalFats = formatNumber(entries.reduce((sum, entry) => sum + entry.fats, 0));

  return (
    <div className="diary-entry-list">
      <h3>{title}</h3>
      {entries.length > 0 ? (
        <>
          <div className="entry-header">
            <span>Food</span>
            <span>Calories</span>
            <span>Protein</span>
            <span>Carbs</span>
            <span>Fats</span>
            <span>Action</span>
          </div>
          {entries.map(entry => (
            <div key={entry.id} className="entry-item">
              <div className="food-info">
                <span className="food-name">{entry.foodName}</span>
                {entry.servings && <span className="servings">{entry.servings} serving{entry.servings !== 1 ? 's' : ''}</span>}
              </div>
              <span>{formatNumber(entry.calories)} kcal</span>
              <span>{formatNumber(entry.protein)}g</span>
              <span>{formatNumber(entry.carbs)}g</span>
              <span>{formatNumber(entry.fats)}g</span>
              <button 
                className="delete-btn"
                onClick={() => onDelete(entry.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <div className="entry-totals">
            <span>Total:</span>
            <span>{totalCalories} kcal</span>
            <span>{totalProtein}g</span>
            <span>{totalCarbs}g</span>
            <span>{totalFats}g</span>
            <span></span>
          </div>
        </>
      ) : (
        <p>No entries for this meal.</p>
      )}
    </div>
  );
};

export default DiaryEntryList;