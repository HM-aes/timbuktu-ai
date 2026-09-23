"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useScrollScene
 * --------------
 * Runs GSAP ScrollTrigger choreography scoped to one section. `setup` only
 * runs when the visitor has not asked for reduced motion (and `media`, if
 * given, matches), runs after mount
 * (never during SSR), and everything it creates is reverted on unmount.
 *
 * Lenis already owns scrolling (one instance, on `window.__lenis`); this
 * hook only forwards its scroll ticks to ScrollTrigger so scrubbed tweens
 * stay locked to the smoothed position — it never creates a scroller.
 */
export function useScrollScene(
  scope: RefObject<HTMLElement | null>,
  setup: (root: HTMLElement) => void,
  /** Extra media conditions, e.g. "(min-width: 1024px)", ANDed with no-preference. */
  media?: string,
) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(root);
    mm.add(["(prefers-reduced-motion: no-preference)", media].filter(Boolean).join(" and "), () => setup(root));

    const lenis = window.__lenis;
    const unsubscribe = lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      unsubscribe?.();
      mm.revert();
    };
    // `setup` is a static choreography description; run it once per mount.
  }, [scope]);
}
