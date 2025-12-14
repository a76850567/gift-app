/**
 * useTheme Hook
 * Manage theme state and CSS variables
 */

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Theme, ThemeColor } from "../types";

const THEME_COLORS: Record<ThemeColor, string> = {
  pink: "#FF5FA2",
  orange: "#FF7A45",
  blue: "#3B82F6",
  purple: "#A855F7",
  green: "#10B981",
};

export function useTheme(defaultTheme: Theme) {
  const [theme, setTheme] = useLocalStorage<Theme>("app_theme", defaultTheme);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Set accent color
    root.style.setProperty("--accent-color", THEME_COLORS[theme.accent]);
    
    // Set dark mode class
    if (theme.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Set reduce motion preference
    if (theme.reduceMotion) {
      root.style.setProperty("--animation-duration", "0.01ms");
    } else {
      root.style.setProperty("--animation-duration", "");
    }
  }, [theme]);

  const setAccent = (accent: ThemeColor) => {
    setTheme((prev) => ({ ...prev, accent }));
  };

  const setReduceMotion = (reduceMotion: boolean) => {
    setTheme((prev) => ({ ...prev, reduceMotion }));
  };

  const setDarkMode = (darkMode: boolean) => {
    setTheme((prev) => ({ ...prev, darkMode }));
  };

  const toggleDarkMode = () => {
    setTheme((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return {
    theme,
    setTheme,
    setAccent,
    setReduceMotion,
    setDarkMode,
    toggleDarkMode,
  };
}
