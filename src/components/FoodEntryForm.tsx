import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FoodEntryForm.css';

interface Food {
  id: string;
  name: string;
}

interface FoodEntryFormProps {
  onAddEntry: (foodId: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', servings: number) => void;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({ onAddEntry }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [servings, setServings] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('/api/foods');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setFoods([
          { id: '1', name: 'Apple' },
          { id: '2', name: 'Banana' },
          { id: '3', name: 'Chicken Breast' }
        ]);
      }
    };
    
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!selectedFood || !foods.some(f => f.id === selectedFood)) {
      setError('Please select a valid food from the list');
      return;
    }
    
    if (servings <= 0 || isNaN(servings)) {
      setError('Please enter a valid number of servings');
      return;
    }

    setError(null);
    onAddEntry(selectedFood, mealType, Math.round(servings * 100) / 100);
    setSelectedFood('');
    setSearchTerm('');
    setServings(1);
  };

  return (
    <div className="food-entry-form">
      <h3>Add Food Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Meal Type:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value as any)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Servings:</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={servings}
            onChange={(e) => setServings(parseFloat(e.target.value))}
            className={error?.includes('servings') ? 'error-input' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Search Food:</label>
          <input
            type="text"
            placeholder="Type to search foods..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedFood('');
              setError(null);
            }}
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {searchTerm && (
          <div className="food-search-results">
            {filteredFoods.length > 0 ? (
              filteredFoods.map(food => (
                <div 
                  key={food.id} 
                  className={`food-option ${selectedFood === food.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedFood(food.id);
                    setError(null);
                  }}
                >
                  {food.name}
                </div>
              ))
            ) : (
              <p>No foods found</p>
            )}
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!selectedFood || !!error}
        >
          Add to Diary
        </button>
      </form>
    </div>
  );
};

export default FoodEntryForm;