"use client";

import { useRef } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { APPROACH_URL } from "@/lib/site";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";
import { useScrollScene } from "@/lib/use-scroll-scene";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.1;
const STEP = 0.12;

/**
 * Hero — the opening line of the story, with the TIMBUKTU AI wordmark set
 * as oversized background type inside the hero itself. The wordmark is
 * absolutely positioned and clipped by the section, so it adds no height;
 * as the hero scrolls away it drifts up and aside, handing over to the
 * security architecture below.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();

  const settle = (i: number, distance = 18) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? INSTANT : { duration: 0.8, delay: BASE + i * STEP, ease },
  });

  useScrollScene(root, (el) => {
    const trigger = { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 };
    gsap.to(el.querySelector("[data-wordmark]"), { yPercent: -22, xPercent: -3, ease: "none", scrollTrigger: trigger });
    gsap.to(el.querySelector("[data-hero-copy]"), { y: -48, opacity: 0.35, ease: "none", scrollTrigger: trigger });
  });

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="frame relative">
        <div
          data-hero-copy
          className="gutter relative z-10 flex min-h-[calc(100svh-var(--header-min-h))] flex-col items-center justify-center pb-[clamp(6rem,13vw,13rem)] pt-12 text-center lg:min-h-[calc(100svh-var(--header-min-h-lg))]"
        >
          <motion.p {...settle(0, 10)} className="pill">
            <span className="dot" aria-hidden />
            Secure AI infrastructure
          </motion.p>

          <motion.h1 {...settle(1, 22)} className="headline-xl mt-6 text-foreground [font-size:clamp(2.75rem,min(1.4rem+5.6vw,12.5svh),6.75rem)]">
            Build AI.
            <br />
            <span className="accent">Build it secure.</span>
          </motion.h1>

          <motion.p {...settle(2, 16)} className="lede mt-6 max-w-[44rem]">
            Timbuktu AI designs and builds RAG, agents and access control that run in production — hosted inside
            hard boundaries, or fully air-gapped on your own infrastructure. Every system is reviewed against the
            OWASP Top 10 for LLM applications before it is built.
          </motion.p>

          <motion.div {...settle(3, 12)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="#products" tone="signal">
              Explore products
              <ArrowRight size={16} data-arrow />
            </CtaButton>
            <CtaButton href={APPROACH_URL}>Our approach</CtaButton>
          </motion.div>
        </div>
      </div>

      {/* Background wordmark — part of the hero, clipped by it, behind the copy */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? INSTANT : { duration: 1.4, delay: BASE + 2 * STEP, ease }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none text-center"
      >
        <span
          data-wordmark
          className="block translate-y-[34%] whitespace-nowrap font-display text-[clamp(4rem,17vw,19rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-foreground/[0.08] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
        >
          TIMBUKTU AI
        </span>
      </motion.p>
    </section>
  );
}
