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
  { id: '3', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: '4', name: 'Salmon', calories: 208, protein: 20, carbs: 0, fats: 13 },
  { id: '5', name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
  { id: '6', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 6.6, fats: 0.4 },
  { id: '7', name: 'Eggs', calories: 143, protein: 12.6, carbs: 0.7, fats: 9.5 },
  { id: '8', name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fats: 0.4 }
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
  goal: 'maintain',
  dailyCalorieTarget: 2500,
  macronutrients: {
    protein: 30,
    carbs: 50,
    fats: 20
  }
};

// Расчет дневной нормы калорий
function calculateDailyCalories(profile) {
  // Формула Миффлина-Сан Жеора
  let bmr;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const goalAdjustments = {
    lose_weight: -500,
    maintain: 0,
    gain_weight: 500
  };

  const calculatedCalories = Math.round(bmr * activityMultipliers[profile.activityLevel] + goalAdjustments[profile.goal]);
  
  // Обновляем профиль
  profile.dailyCalorieTarget = calculatedCalories;
  
  return calculatedCalories;
}

// Генерация плана питания
function generateMealPlan(calorieTarget, macronutrients) {
  // Расчет целевых значений макронутриентов в граммах
  const proteinGrams = Math.round((calorieTarget * macronutrients.protein / 100) / 4);
  const carbsGrams = Math.round((calorieTarget * macronutrients.carbs / 100) / 4);
  const fatsGrams = Math.round((calorieTarget * macronutrients.fats / 100) / 9);

  // Функция для генерации одного приема пищи
  const generateMeal = (mealName, calorieTarget, proteinTarget, carbsTarget, fatsTarget) => {
    const mealFoods = [];
    let remainingCalories = calorieTarget;
    let remainingProtein = proteinTarget;
    let remainingCarbs = carbsTarget;
    let remainingFats = fatsTarget;

    // Фильтруем подходящие продукты
    const suitableFoods = foods.filter(food => {
      return food.calories < calorieTarget * 0.7 && 
             food.protein > 0;
    }).sort(() => Math.random() - 0.5); // Случайный порядок

    for (const food of suitableFoods) {
      if (remainingCalories <= 0) break;

      // Рассчитываем оптимальное количество порций
      const maxServings = Math.min(
        Math.floor(remainingCalories / food.calories),
        Math.floor(remainingProtein / food.protein),
        3 // Максимум 3 порции одного продукта
      );

      if (maxServings > 0) {
        const servings = Math.max(0.5, Math.min(maxServings, 3));
        const foodEntry = {
          foodId: food.id,
          name: food.name,
          servings: servings,
          calories: Math.round(food.calories * servings),
          protein: Math.round(food.protein * servings * 10) / 10,
          carbs: Math.round(food.carbs * servings * 10) / 10,
          fats: Math.round(food.fats * servings * 10) / 10
        };

        mealFoods.push(foodEntry);
        remainingCalories -= foodEntry.calories;
        remainingProtein -= foodEntry.protein;
        remainingCarbs -= foodEntry.carbs;
        remainingFats -= foodEntry.fats;
      }
    }

    const totals = mealFoods.reduce((acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbs += food.carbs;
      acc.fats += food.fats;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return {
      name: mealName,
      foods: mealFoods,
      ...totals
    };
  };

  // Генерируем приемы пищи
  const breakfast = generateMeal(
    'Breakfast', 
    calorieTarget * 0.25,
    proteinGrams * 0.25,
    carbsGrams * 0.25,
    fatsGrams * 0.25
  );

  const lunch = generateMeal(
    'Lunch',
    calorieTarget * 0.35,
    proteinGrams * 0.35,
    carbsGrams * 0.35,
    fatsGrams * 0.35
  );

  const dinner = generateMeal(
    'Dinner',
    calorieTarget * 0.3,
    proteinGrams * 0.3,
    carbsGrams * 0.3,
    fatsGrams * 0.3
  );

  const snack = generateMeal(
    'Snack',
    calorieTarget * 0.1,
    proteinGrams * 0.1,
    carbsGrams * 0.1,
    fatsGrams * 0.1
  );

  // Собираем общий план
  const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snack.calories;
  const totalProtein = breakfast.protein + lunch.protein + dinner.protein + snack.protein;
  const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs;
  const totalFats = breakfast.fats + lunch.fats + dinner.fats + snack.fats;

  return {
    id: Date.now().toString(),
    name: `Personalized Plan - ${new Date().toLocaleDateString()}`,
    description: `Custom plan for ${calorieTarget} kcal (P:${macronutrients.protein}%/C:${macronutrients.carbs}%/F:${macronutrients.fats}%)`,
    meals: [breakfast, lunch, dinner, snack],
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFats,
    targets: {
      calories: calorieTarget,
      protein: proteinGrams,
      carbs: carbsGrams,
      fats: fatsGrams
    }
  };
}

// API Routes

// Foods
app.get('/api/foods', (req, res) => {
  res.json(foods);
});

app.post('/api/foods', (req, res) => {
  const newFood = { 
    id: Date.now().toString(), 
    ...req.body,
    createdAt: new Date().toISOString()
  };
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
    calories: Math.round(food.calories * servings * 100) / 100,
    protein: Math.round(food.protein * servings * 100) / 100,
    carbs: Math.round(food.carbs * servings * 100) / 100,
    fats: Math.round(food.fats * servings * 100) / 100,
    date,
    mealType,
    servings,
    addedAt: new Date().toISOString()
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
  // Пересчитываем калории при обновлении профиля
  const updatedProfile = {
    ...profile,
    ...req.body,
    dailyCalorieTarget: calculateDailyCalories({ ...profile, ...req.body })
  };
  
  profile = updatedProfile;
  res.json(updatedProfile);
});

// Meal Plans
app.get('/api/meal-plans', (req, res) => {
  res.json(mealPlans);
});

// В методе POST /api/meal-plans/generate
app.post('/api/meal-plans/generate', (req, res) => {
  try {
    const { calorieTarget, macronutrients } = req.body;
    
    if (!calorieTarget || !macronutrients) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const newPlan = generateMealPlan(
      calorieTarget,
      macronutrients
    );
    
    mealPlans = [newPlan, ...mealPlans].slice(0, 5);
    
    // Всегда возвращаем массив для совместимости
    res.json([newPlan]);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Sample profile:', {
    email: profile.email,
    dailyCalorieTarget: profile.dailyCalorieTarget
  });
});