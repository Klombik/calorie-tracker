require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
let foods = [
  { id: '1', name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
  { id: '2', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 },
  { id: '3', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6 }
];

let diaryEntries = [];
let mealPlans = [];
let profile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  gender: 'male',
  height: 180,
  weight: 75,
  activityLevel: 'moderate',
  goal: 'maintain'
};

// API Routes

// Foods
app.get('/api/foods', (req, res) => {
  res.json(foods);
});

app.post('/api/foods', (req, res) => {
  const newFood = { id: Date.now().toString(), ...req.body };
  foods.push(newFood);
  res.status(201).json(newFood);
});

// Diary
app.get('/api/diaries', (req, res) => {
  const { date } = req.query;
  const entries = diaryEntries.filter(entry => entry.date === date);
  res.json(entries);
});

app.post('/api/diaries', (req, res) => {
  const { foodId, date, mealType, servings = 1 } = req.body;
  const food = foods.find(f => f.id === foodId);
  
  if (!food) return res.status(404).json({ error: 'Food not found' });

  const newEntry = {
    id: Date.now().toString(),
    foodId,
    foodName: food.name,
    calories: food.calories * servings,
    protein: food.protein * servings,
    carbs: food.carbs * servings,
    fats: food.fats * servings,
    date,
    mealType,
    servings
  };

  diaryEntries.push(newEntry);
  res.status(201).json(newEntry);
});

app.delete('/api/diaries/:id', (req, res) => {
  diaryEntries = diaryEntries.filter(entry => entry.id !== req.params.id);
  res.status(204).send();
});

// Profile
app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.put('/api/profile', (req, res) => {
  profile = { ...profile, ...req.body };
  res.json(profile);
});

// Meal Plans
app.get('/api/meal-plans', (req, res) => {
  res.json(mealPlans);
});

app.post('/api/meal-plans/generate', (req, res) => {
  const newPlan = {
    id: Date.now().toString(),
    name: `Meal Plan ${mealPlans.length + 1}`,
    description: `Generated plan for ${profile.goal.replace('_', ' ')}`,
    foods: foods.slice(0, 3).map(f => ({
      foodId: f.id,
      name: f.name,
      servings: 1,
      calories: f.calories,
      protein: f.protein,
      carbs: f.carbs,
      fats: f.fats
    })),
    calories: foods.slice(0, 3).reduce((sum, f) => sum + f.calories, 0),
    protein: foods.slice(0, 3).reduce((sum, f) => sum + f.protein, 0),
    carbs: foods.slice(0, 3).reduce((sum, f) => sum + f.carbs, 0),
    fats: foods.slice(0, 3).reduce((sum, f) => sum + f.fats, 0)
  };
  
  mealPlans.push(newPlan);
  res.json(newPlan);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});