// src/components/FoodFilter.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
};

export const FoodFilter: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border rounded w-full mb-4"
  />
);
