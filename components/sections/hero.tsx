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
const BASE = 0.16;
const STEP = 0.2;
const WORDMARK_LEFT = [..."TIMBUKTU"];
const WORDMARK_RIGHT = [..."AI"];

/**
 * Hero — the opening line of the story, with the TIMBUKTU AI wordmark set
 * as oversized background type inside the hero itself. The wordmark is
 * absolutely positioned and clipped by the section, so it adds no height.
 * The wordmark splits with the scroll itself. The section is not pinned,
 * so the page keeps moving while the letters travel.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();

  const settle = (i: number, distance = 18) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? INSTANT : { duration: 1.45, delay: BASE + i * STEP, ease: [0.16, 1, 0.3, 1] },
  });

  useScrollScene(root, (el) => {
    // Scrub is linear and the section is not pinned, so each pixel of scroll
    // both moves the page and drives the wordmark apart.
    const trigger = {
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    };
    const chars = gsap.utils.toArray<HTMLElement>("[data-wm-char]", el);
    const mid = (chars.length - 1) / 2;
    gsap
      .timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: trigger })
      .to(el.querySelector("[data-wordmark]"), { yPercent: -36 }, 0)
      .to(el.querySelector("[data-wm-left]"), { xPercent: -52 }, 0)
      .to(el.querySelector("[data-wm-right]"), { xPercent: 120, "--wm-ai": 1 }, 0)
      .to(chars, { yPercent: -18, rotate: (i) => (i - mid) * 3.5, stagger: { each: 0.012, from: "edges" } }, 0);

    if (!window.matchMedia("(pointer: fine)").matches) return;
    const drift = el.querySelector<HTMLElement>("[data-wm-pointer]");
    const toX = gsap.quickTo(drift, "x", { duration: 1.2, ease: "power3.out" });
    const toY = gsap.quickTo(drift, "y", { duration: 1.2, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      toX(((e.clientX - r.left) / r.width - 0.5) * -48);
      toY(((e.clientY - r.top) / r.height - 0.5) * -16);
    };
    const onLeave = () => {
      toX(0);
      toY(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <section ref={root} className="relative overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? INSTANT : { duration: 1.6, ease }}
        className="hero-grid pointer-events-none absolute inset-0 z-0"
      />
      <div className="frame relative">
        <div
          data-hero-copy
          className="gutter relative z-10 flex min-h-[calc(100svh-var(--header-min-h))] flex-col items-center justify-center pb-[clamp(6rem,13vw,13rem)] pt-12 text-center lg:min-h-[calc(100svh-var(--header-min-h-lg))]"
        >
          <motion.p {...settle(0, 10)} className="pill pill--hero">
            <span className="dot" aria-hidden />
            Secure AI infrastructure
          </motion.p>

          <motion.h1 {...settle(1, 36)} className="headline-xl mt-8 text-foreground [font-size:clamp(2.875rem,min(1.1rem+7vw,15svh),8rem)] lg:mt-10">
            Build AI.
            <br />
            <span className="accent-metal">Build it secure.</span>
          </motion.h1>

          <motion.p {...settle(2, 16)} className="lede mt-8 max-w-[42rem] lg:mt-10">
            Timbuktu AI designs and builds RAG dashboards that run in production — hosted inside hard
            boundaries, or fully air-gapped on your own infrastructure. Every system is reviewed against the
            OWASP Top 10 for LLM applications before it is built.
          </motion.p>

          <motion.div {...settle(3, 12)} className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:mt-12">
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
        <span data-wm-pointer className="block">
          <span
            data-wordmark
            className="block translate-y-[34%] whitespace-nowrap font-display text-[clamp(4rem,17vw,19rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-foreground/[0.08] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
          >
            <span data-wm-left className="inline-block">
              {WORDMARK_LEFT.map((c, i) => (
                <span key={i} data-wm-char className="inline-block">
                  {c}
                </span>
              ))}
            </span>
            <span data-wm-right className="wm-ai ml-[0.22em] inline-block">
              {WORDMARK_RIGHT.map((c, i) => (
                <span key={i} data-wm-char className="inline-block">
                  {c}
                </span>
              ))}
            </span>
          </span>
        </span>
      </motion.p>
    </section>
  );
}
