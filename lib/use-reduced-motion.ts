"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * useReducedMotionSafe
 * --------------------
 * `useReducedMotion()` is `null` on the server and `true` immediately on a
 * client that prefers reduced motion. Branching on it during render makes
 * the server HTML differ from the first client render, and React does not
 * patch attribute mismatches — so server-rendered `opacity: 0` styles would
 * stay in the DOM for exactly the users who asked for less motion.
 *
 * This hook returns `false` until after mount, so both renders agree, and
 * only then reports the real preference. Callers should express "reduced"
 * as an *animate-to-visible-instantly* state rather than by changing the
 * rendered tree.
 */
export function useReducedMotionSafe(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}

/** Zero-duration transition used to snap to the final state. */
export const INSTANT = { duration: 0 } as const;
