"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const HEADER_OFFSET = 72;

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    // Lenis already eases the wheel. If GSAP also skips frames when the
    // main thread is busy, pinned sections hitch against that eased scroll.
    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: {
        offset: -HEADER_OFFSET,
      },
    });
    window.__lenis = lenis;

    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      if (typeof unsubscribe === "function") unsubscribe();
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
