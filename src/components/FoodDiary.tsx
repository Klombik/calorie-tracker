import React, { useState, useEffect } from 'react';
import { Meal, Product } from '../types';
import { fetchProducts, saveMeal } from '../services/apiService';
import { calculateMacros } from '../services/calculatorService';

const FoodDiary: React.FC<{ date: Date }> = ({ date }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{product: Product, amount: number}[]>([]);

  useEffect(() => {
    // Здесь будет загрузка данных о приёмах пищи за выбранную дату
    // В демо-версии используем моковые данные
    setMeals([
      {
        id: '1',
        date: new Date(),
        products: [
          { product: { id: '1', name: 'Куриная грудка', calories: 165, protein: 31, carbs: 0, fat: 3.6 }, amount: 100 },
          { product: { id: '2', name: 'Рис варёный', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 }, amount: 150 }
        ]
      }
    ]);
  }, [date]);

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await fetchProducts(query);
      setSearchResults(results);
    }
  };

  const addProductToMeal = (product: Product) => {
    setSelectedProducts([...selectedProducts, { product, amount: 100 }]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const saveMealHandler = async () => {
    const newMeal = {
      date,
      products: selectedProducts
    };
    
    const savedMeal = await saveMeal(newMeal);
    setMeals([...meals, savedMeal]);
    setSelectedProducts([]);
  };

  const calculateTotals = (items: {product: Product, amount: number}[]) => {
    return items.reduce((acc, item) => {
      const ratio = item.amount / 100;
      return {
        calories: acc.calories + Math.round(item.product.calories * ratio),
        protein: acc.protein + Math.round(item.product.protein * ratio),
        carbs: acc.carbs + Math.round(item.product.carbs * ratio),
        fat: acc.fat + Math.round(item.product.fat * ratio),
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const dailyTotals = calculateTotals(meals.flatMap(meal => meal.products));
  const selectedTotals = calculateTotals(selectedProducts);

  return (
    <div className="food-diary">
      <div className="search-section">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Найти продукт..."
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map(product => (
              <li key={product.id} onClick={() => addProductToMeal(product)}>
                {product.name} - {product.calories} ккал
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="selected-products">
        <h3>Добавляемые продукты:</h3>
        {selectedProducts.map((item, index) => (
          <div key={index} className="product-item">
            <span>{item.product.name} - {item.amount}г</span>
            <input
              type="number"
              value={item.amount}
              onChange={(e) => {
                const newProducts = [...selectedProducts];
                newProducts[index].amount = parseInt(e.target.value) || 0;
                setSelectedProducts(newProducts);
              }}
              min="1"
            />
          </div>
        ))}
        {selectedProducts.length > 0 && (
          <div className="totals">
            <p>Итого: {selectedTotals.calories} ккал</p>
            <p>Б: {selectedTotals.protein}г, Ж: {selectedTotals.fat}г, У: {selectedTotals.carbs}г</p>
            <button onClick={saveMealHandler}>Сохранить приём пищи</button>
          </div>
        )}
      </div>

      <div className="meals-list">
        <h3>Приёмы пищи за {date.toLocaleDateString()}:</h3>
        {meals.length > 0 ? (
          meals.map(meal => (
            <div key={meal.id} className="meal">
              <h4>{meal.date.toLocaleTimeString()}</h4>
              <ul>
                {meal.products.map((item, idx) => (
                  <li key={idx}>
                    {item.product.name} - {item.amount}г ({Math.round(item.product.calories * item.amount / 100)} ккал)
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Нет данных о приёмах пищи</p>
        )}
      </div>

      <div className="daily-totals">
        <h3>Итого за день:</h3>
        <p>Калории: {dailyTotals.calories}</p>
        <p>Белки: {dailyTotals.protein}г</p>
        <p>Жиры: {dailyTotals.fat}г</p>
        <p>Углеводы: {dailyTotals.carbs}г</p>
      </div>
    </div>
  );
};

export default FoodDiary;