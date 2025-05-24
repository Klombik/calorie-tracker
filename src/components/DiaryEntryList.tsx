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
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface DiaryEntryListProps {
  title: string;
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
}

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({ title, entries, onDelete }) => {
  const formatNumber = (num: number) => {
    // Форматирование чисел с учетом локали пользователя
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: num % 1 === 0 ? 0 : 2
    }).format(num);
  };

  const totals = entries.reduce((acc, entry) => {
    acc.calories += entry.calories;
    acc.protein += entry.protein;
    acc.carbs += entry.carbs;
    acc.fats += entry.fats;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return (
    <div className="diary-entry-list">
      <h3>{title}</h3>
      {entries.length > 0 ? (
        <>
          <div className="entry-header">
            <span className="header-food">Food</span>
            <span className="header-calories">Calories</span>
            <span className="header-protein">Protein</span>
            <span className="header-carbs">Carbs</span>
            <span className="header-fats">Fats</span>
            <span className="header-action">Action</span>
          </div>
          
          <div className="entries-container">
            {entries.map(entry => (
              <div key={entry.id} className="entry-item">
                <div className="food-info">
                  <span className="food-name">{entry.foodName}</span>
                  {entry.servings && (
                    <span className="servings">
                      ({formatNumber(entry.servings)} serving{entry.servings !== 1 ? 's' : ''})
                    </span>
                  )}
                </div>
                <span className="calories">{formatNumber(entry.calories)} kcal</span>
                <span className="protein">{formatNumber(entry.protein)}g</span>
                <span className="carbs">{formatNumber(entry.carbs)}g</span>
                <span className="fats">{formatNumber(entry.fats)}g</span>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(entry.id)}
                  aria-label={`Delete ${entry.foodName}`}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="entry-totals">
            <span className="total-label">Total:</span>
            <span className="total-calories">{formatNumber(totals.calories)} kcal</span>
            <span className="total-protein">{formatNumber(totals.protein)}g</span>
            <span className="total-carbs">{formatNumber(totals.carbs)}g</span>
            <span className="total-fats">{formatNumber(totals.fats)}g</span>
            <span className="total-spacer"></span>
          </div>
        </>
      ) : (
        <p className="no-entries">No entries for {title.toLowerCase()}.</p>
      )}
    </div>
  );
};

export default DiaryEntryList;