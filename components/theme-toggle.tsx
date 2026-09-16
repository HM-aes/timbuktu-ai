"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Read stored preference; default is dark
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    
    // Toggle Tailwind dark mode
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
