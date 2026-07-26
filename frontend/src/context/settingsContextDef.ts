import { createContext } from "react";

export type Language = "en" | "bn";
export type Theme = "light" | "dark";

export interface SettingsContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);