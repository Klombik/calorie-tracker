import { Product, Meal, User } from '../types';

const API_URL = 'https://your-api-endpoint.com';

export const fetchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products?search=${query}`);
  return await response.json();
};

export const saveMeal = async (meal: Omit<Meal, 'id'>): Promise<Meal> => {
  const response = await fetch(`${API_URL}/meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meal),
  });
  return await response.json();
};

export const getUserData = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  return await response.json();
};