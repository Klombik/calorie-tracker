import { Food } from "../types";

export const fetchFoods = async (): Promise<Food[]> => {
  const response = await fetch("/data/foods.json");
  return response.json();
};
