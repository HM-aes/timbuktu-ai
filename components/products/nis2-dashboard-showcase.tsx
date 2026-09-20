"use client";

import { motion } from "motion/react";
import { Nis2Dashboard } from "@/components/dashboards";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nis2DashboardShowcase() {
  const reduced = useReducedMotionSafe();

  return (
    <div className="relative -mx-[var(--space-gutter)] w-[calc(100%+2*var(--space-gutter))] sm:-mx-[var(--space-gutter-md)] sm:w-[calc(100%+2*var(--space-gutter-md))] lg:-mx-[var(--space-gutter-lg)] lg:w-[calc(100%+2*var(--space-gutter-lg))]">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={reduced ? INSTANT : { duration: 0.85, ease }}
        className="mx-auto w-full min-w-0 px-[var(--space-gutter)] sm:px-[var(--space-gutter-md)] lg:px-[var(--space-gutter-lg)]"
      >
        <div className="mx-auto w-full min-w-0 max-w-[var(--frame-max)]">
          <div className="stage-glow relative p-2 sm:p-4 lg:p-5 xl:p-6">
            <div className="panel overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] lg:overflow-visible">
                <div className="min-w-[min(100%,42rem)] lg:min-w-0">
                  <Nis2Dashboard presentation="wide" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
