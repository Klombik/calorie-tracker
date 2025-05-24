import React, { useEffect, useState } from "react";
import { fetchFoods } from "../api/foods";
import { Food } from "../types";
import { FoodCard } from "../components/FoodCard";
import { FoodFilter } from "../components/FoodFilter";
import { FoodForm } from "../components/FoodForm";
import { translations } from "../i18n";

interface FoodsProps {
  lang: "ru" | "en";
}

const STORAGE_KEY = "userFoods";

export const Foods: React.FC<FoodsProps> = ({ lang }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filter, setFilter] = useState("");
  const [dark, setDark] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    document.body.className = dark
      ? "dark bg-gray-900 text-white"
      : "bg-white text-black";
  }, [dark]);

  useEffect(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      setFoods(JSON.parse(local));
    } else {
      fetchFoods().then((data) => {
        setFoods(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      });
    }
  }, []);

  const handleAdd = (newFood: Food) => {
    const updated = [...foods, newFood];
    setFoods(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleDelete = (id: number) => {
    const updated = foods.filter((f) => f.id !== id);
    setFoods(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative p-4">
      <h2 className="text-2xl font-semibold mb-4">{t.title}</h2>
      <FoodForm onAdd={handleAdd} lang={lang} />
      <FoodFilter value={filter} onChange={setFilter} placeholder={t.filter} />
      {filtered.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onDelete={handleDelete}
          lang={lang}
        />
      ))}
    </div>
  );
};