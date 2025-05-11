import React from 'react';
import '../../assets/css/DiaryEntryList.css';

interface DiaryEntry {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface DiaryEntryListProps {
  title: string;
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
}

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({ title, entries, onDelete }) => {
  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFats = entries.reduce((sum, entry) => sum + entry.fats, 0);

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
              <span>{entry.foodName}</span>
              <span>{entry.calories}</span>
              <span>{entry.protein}g</span>
              <span>{entry.carbs}g</span>
              <span>{entry.fats}g</span>
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
            <span>{totalCalories}</span>
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