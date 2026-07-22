"use client";

import { useCookie } from "@/hooks/useCookie";

export default function ThemeToggle() {
  const [theme, setTheme] = useCookie("lab_theme", "dark");

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button onClick={toggleTheme}>
      Cambiar a modo {theme === "dark" ? "claro" : "oscuro"} (actual: {theme})
    </button>
  );
}