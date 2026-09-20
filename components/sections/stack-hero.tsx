"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Panel from "@/components/panel";
import BoundaryDiagram from "@/components/diagrams/boundary";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.08;
const STEP = 0.1;

export default function StackHero() {
  const reduced = useReducedMotionSafe();
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -10]);

  const settle = (i: number, distance = 16) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? INSTANT : { duration: 0.75, delay: BASE + i * STEP, ease },
  });

  const visualSettle = {
    initial: reduced ? false : { opacity: 0, y: 20, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: reduced ? INSTANT : { duration: 0.9, delay: BASE + 3 * STEP, ease },
  };

  return (
    <div className="gutter pb-[var(--space-head-gap-lg)] pt-[var(--space-section-y)] md:pb-[var(--space-section-y-md)] md:pt-[var(--space-section-y-md)] lg:pb-[var(--space-section-y-lg)] lg:pt-[var(--space-section-y-lg)]">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
        <div className="flex min-w-0 flex-col gap-5 md:col-span-7 lg:col-span-7 lg:gap-6">
          <motion.p {...settle(0, 10)} className="label text-signal">
            AI security layer
          </motion.p>

          <motion.h2
            {...settle(1, 20)}
            className="title max-w-[28ch] text-pretty text-foreground sm:max-w-[30ch] lg:max-w-[26ch] xl:max-w-[28ch]"
          >
            The AI layer, under the same <span className="accent">threat model</span>.
          </motion.h2>

          <motion.p
            {...settle(2, 14)}
            className="lede max-w-[65ch] text-foreground/90"
          >
            Agents, LLMs and MCP tools widen the attack surface. Prompt injection, tool
            poisoning, data exfiltration — each one gets a control, not a caveat.
          </motion.p>
        </div>

        <motion.div
          ref={visualRef}
          style={{ y: visualY }}
          {...visualSettle}
          className="min-w-0 md:col-span-5 lg:col-span-5"
        >
          <div className="stage-glow relative p-2 sm:p-3 lg:p-4">
            <Panel
              caption="How a request is governed"
              status="live"
              grid
              bodyClassName="p-4 sm:p-5 lg:p-6"
            >
              <BoundaryDiagram className="mx-auto max-w-[22rem] sm:max-w-none" />
            </Panel>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
