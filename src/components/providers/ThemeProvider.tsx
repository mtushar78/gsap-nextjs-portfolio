"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ✅ CHANGE 1: Initialize state from localStorage directly
  const [theme, setTheme] = useState<Theme>(() => {
    // Only access localStorage on client-side
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      return stored || "dark";
    }
    return "dark";
  });

  // ✅ CHANGE 2: Separate effect that only handles DOM updates
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // ✅ CHANGE 3: Simplified toggleTheme (removed redundant DOM manipulation)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    // DOM update is now handled by the useEffect above
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
