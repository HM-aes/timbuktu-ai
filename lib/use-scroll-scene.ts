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
 * Lenis already owns scrolling. LenisProvider drives it from GSAP's ticker
 * and forwards each tick to ScrollTrigger, so this hook never creates a
 * scroller and never adds a second scroll listener.
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

    return () => {
      mm.revert();
    };
    // `setup` is a static choreography description; run it once per mount.
  }, [scope]);
}
