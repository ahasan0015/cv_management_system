import { useEffect, useState, type ReactNode } from "react";
import { SettingsContext, type Language, type Theme } from "./settingsContextDef";


const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    users: "Users",
    cvs: "CVs",
    jobs: "Jobs",
    settings: "Settings",
    darkMode: "Dark Theme",
    lightMode: "Light Theme",
    language: "Language",
    home: "Home",
    login: "Login",
    logout: "Logout",
    jobs_nav: "Jobs",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    users: "ব্যবহারকারী",
    cvs: "সিভি সমূহ",
    jobs: "চাকরি",
    settings: "সেটিংস",
    darkMode: "ডার্ক থিম",
    lightMode: "লাইট থিম",
    language: "ভাষা",
    home: "হোম",
    login: "লগইন",
    logout: "লগআউট",
    jobs_nav: "চাকরি",
  },
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(
    (localStorage.getItem("app_lang") as Language) || "en"
  );
  
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("app_theme") as Theme) || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <SettingsContext.Provider value={{ language, theme, setLanguage, toggleTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
};