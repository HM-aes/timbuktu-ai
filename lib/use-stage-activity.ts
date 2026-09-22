"use client";

import { useEffect, type RefObject } from "react";

/**
 * useStageActivity
 * ----------------
 * Marks every `.iso-stage` inside `scope` with `data-active` while it is on
 * screen. The ambient CSS loops in the scenes (float, spin, dash flow) are
 * paused everywhere else, so off-screen 3D layers never repaint.
 */
export function useStageActivity(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const stages = root.matches(".iso-stage")
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>(".iso-stage"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-active", e.isIntersecting);
      },
      { rootMargin: "80px 0px" },
    );
    stages.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [scope]);
}
