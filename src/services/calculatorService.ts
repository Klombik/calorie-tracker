export const calculateCalories = (
  age: number,
  gender: 'male' | 'female',
  weight: number,
  height: number,
  activity: number
): number => {
  // Формула Миффлина-Сан Жеора
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  
  return Math.round(bmr * activity);
};

export const calculateMacros = (
  calories: number,
  proteinPercent: number = 30,
  fatPercent: number = 30,
  carbsPercent: number = 40
) => {
  return {
    protein: Math.round((calories * proteinPercent / 100) / 4),
    fat: Math.round((calories * fatPercent / 100) / 9),
    carbs: Math.round((calories * carbsPercent / 100) / 4),
  };
};