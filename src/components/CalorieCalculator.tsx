import React, { useState } from 'react';
import { calculateCalories } from '../services/calculatorService';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [activity, setActivity] = useState<number>(1.2);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const calories = calculateCalories(age, gender, weight, height, activity);
    setResult(calories);
  };

  return (
    <div className="calculator">
      <h2>Калькулятор калорий</h2>
      <div className="form-group">
        <label>Возраст:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(parseInt(e.target.value))} 
        />
      </div>
      {/* Другие поля формы */}
      <button onClick={handleCalculate}>Рассчитать</button>
      {result && <div className="result">Ваша норма: {result} ккал/день</div>}
    </div>
  );
};

export default CalorieCalculator;