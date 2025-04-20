import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Diary } from "./pages/Diary";
import { DietPlan } from "./pages/DietPlan";
import { Foods } from "./pages/Foods";
import { Profile } from "./pages/Profile";
import { translations } from "./i18n";

interface AppProps {
  lang?: "ru" | "en";
}

export const App: React.FC<AppProps> = ({ lang = "ru"}) => {
  const [dark, setDark] = useState(false);
  const [currentLang, setLang] = useState<"ru" | "en">(lang);

  const t = translations[currentLang];

  useEffect(() => {
    document.body.className = dark
      ? "dark bg-gray-900 text-white"
      : "bg-white text-black";
  }, [dark]);

  return (
    <div className="container relative p-4 min-h-screen">
      {/* Переключатель языка */}
      <button
        onClick={() => setLang(currentLang === "ru" ? "en" : "ru")}
        className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {t.toggleLang}
      </button>

      {/* Переключатель темы */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
      >
        {dark ? t.lightTheme : t.darkTheme}
      </button>

      {/* Навигация */}
      <nav className="my-6 flex flex-wrap gap-4 justify-center">
        <Link to="/" className="hover:underline">
          {t.home}
        </Link>
        <Link to="/diary" className="hover:underline">
          {t.diary}
        </Link>
        <Link to="/diet" className="hover:underline">
          {t.dietPlan}
        </Link>
        <Link to="/foods" className="hover:underline">
          {t.foods}
        </Link>
        <Link to="/profile" className="hover:underline">
          {t.profile}
        </Link>
      </nav>

      {/* Роутинг */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/diet" element={<DietPlan />} />
        <Route path="/foods" element={<Foods lang={currentLang} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
