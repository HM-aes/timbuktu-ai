"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * FooterWordmark — the closing shot. TIMBUKTU stands as a silhouette against
 * a low amber horizon; on first view the light rises and the letters settle
 * up out of the card's bottom edge. Starts visible (dimmed, lowered) so it
 * never reads as missing, and reduced motion snaps straight to the end frame.
 */
export default function FooterWordmark() {
  const reduced = useReducedMotionSafe();
  const viewport = { once: true, margin: "0px 0px -8% 0px" };

  return (
    <div aria-hidden className="footer-horizon">
      <motion.div
        className="footer-horizon-glow"
        initial={{ opacity: 0.35, y: "18%" }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={viewport}
        transition={reduced ? INSTANT : { duration: 2.2, ease }}
      />
      <motion.p
        className="footer-wordmark"
        initial={{ y: "14%" }}
        whileInView={{ y: "0%" }}
        viewport={viewport}
        transition={reduced ? INSTANT : { duration: 1.8, delay: 0.08, ease }}
      >
        Timbuktu
      </motion.p>
    </div>
  );
}
