import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextProps {
  dark: boolean;
  lang: "ru" | "en";
  toggleDark: () => void;
  toggleLang: () => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"ru" | "en">("ru");

  const toggleDark = () => setDark((prev) => !prev);
  const toggleLang = () => setLang((prev) => (prev === "ru" ? "en" : "ru"));

  return (
    <SettingsContext.Provider value={{ dark, lang, toggleDark, toggleLang }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
