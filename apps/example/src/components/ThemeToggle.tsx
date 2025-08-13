"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") as Theme | null)
        : null;
    const initial: Theme =
      saved ||
      (document.documentElement.getAttribute("data-theme") as Theme) ||
      "light";
    document.documentElement.setAttribute("data-theme", initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed top-4 left-4 z-50 rounded-md border px-3 h-9 bg-white/70 backdrop-blur text-sm shadow hover:bg-white"
    >
      {theme === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
}
