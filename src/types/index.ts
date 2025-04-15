export interface Product {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  date: Date;
  products: {
    product: Product;
    amount: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: number;
  dailyCalorieGoal: number;
}