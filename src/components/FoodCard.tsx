import React from "react";
import { Food } from "../types";
import { translations } from "../i18n";

type Props = {
  food: Food;
  onDelete?: (id: number) => void;
  lang: "ru" | "en";
};

export const FoodCard: React.FC<Props> = ({ food, onDelete, lang }) => {
  const t = translations[lang];

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h3 className="text-lg font-bold mb-2">{food.name}</h3>
      <ul className="text-sm space-y-1">
        <li>
          <strong>{lang === "ru" ? "Калории" : "Calories"}:</strong> {food.calories} ккал
        </li>
        <li>
          <strong>{lang === "ru" ? "Белки" : "Protein"}:</strong> {food.protein} г
        </li>
        <li>
          <strong>{lang === "ru" ? "Жиры" : "Fat"}:</strong> {food.fat} г
        </li>
        <li>
          <strong>{lang === "ru" ? "Углеводы" : "Carbs"}:</strong> {food.carbs} г
        </li>
      </ul>
      {onDelete && (
        <button
          onClick={() => onDelete(food.id)}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {t.delete}
        </button>
      )}
    </div>
  );
};
