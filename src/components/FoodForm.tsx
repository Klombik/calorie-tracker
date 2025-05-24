import React, { useState } from "react";
import { Food } from "../types";

type FoodFormProps = {
  onAdd: (food: Food) => void;
  lang: "ru" | "en";
};

export const FoodForm: React.FC<FoodFormProps> = ({ onAdd, lang }) => {
  const [form, setForm] = useState<Omit<Food, "id">>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "name" ? value : parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFood: Food = { ...form, id: Date.now() };
    onAdd(newFood);
    setForm({ name: "", calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-2">{lang === "ru" ? "Добавить еду" : "Add New Food"}</h3>
      {Object.entries(form).map(([key, val]) => (
        <input
          key={key}
          name={key}
          value={val}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="p-2 border rounded w-full mb-2"
          type={key === "name" ? "text" : "number"}
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {lang === "ru" ? "Добавить" : "Add"}
      </button>
    </form>
  );
};
