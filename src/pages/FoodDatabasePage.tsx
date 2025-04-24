import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodItem from '../components/FoodItem';
import AddFoodModal from '../components/AddFoodModal';
import '../styles/FoodDatabasePage.css';

interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const FoodDatabasePage: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get('/api/foods');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
      setFoods([
        { id: '1', name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
        { id: '2', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 }
      ]);
    }
    setIsLoading(false);
  };

  const handleAddFood = async (food: Omit<Food, 'id'>) => {
    try {
      const response = await axios.post('/api/foods', food);
      setFoods([...foods, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-database-page">
      <h2>Food Database</h2>
      
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Food
        </button>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="food-list">
          {filteredFoods.length > 0 ? (
            filteredFoods.map(food => (
              <FoodItem key={food.id} food={food} />
            ))
          ) : (
            <p>No foods found. Try a different search term or add a new food.</p>
          )}
        </div>
      )}
      
      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFood={handleAddFood}
      />
    </div>
  );
};

export default FoodDatabasePage;