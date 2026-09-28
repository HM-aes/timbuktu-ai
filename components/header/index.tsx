"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/header/navbar";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "site-header sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-[var(--line)] bg-background/90 backdrop-blur-md"
          : "border-b border-[var(--line)]/40 bg-background/50 backdrop-blur-sm",
      )}
    >
      <Navbar />
    </header>
  );
}
