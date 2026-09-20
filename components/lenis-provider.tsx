"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

const HEADER_OFFSET = 72;

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: {
        offset: -HEADER_OFFSET,
      },
    });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
