"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem("theme", dark ? "dark" : "light");
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  return (
    <button
      type="button"
      role="switch"
      className="theme-switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        const next = document.documentElement.getAttribute("data-theme") !== "dark";
        applyTheme(next);
        setDark(next);
      }}
    >
      <Sun size={13} aria-hidden className="theme-switch-icon theme-switch-sun" />
      <Moon size={13} aria-hidden className="theme-switch-icon theme-switch-moon" />
      <span aria-hidden className="theme-switch-thumb" />
    </button>
  );
}
