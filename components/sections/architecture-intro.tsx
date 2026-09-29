"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/use-scroll-scene";

/**
 * Architecture section intro — scroll-scrubbed settle (GSAP + Lenis via useScrollScene).
 */
export default function ArchitectureIntro() {
  const root = useRef<HTMLDivElement>(null);

  useScrollScene(root, (el) => {
    const eyebrow = el.querySelector<HTMLElement>("[data-arch-eyebrow]");
    const headline = el.querySelector<HTMLElement>("[data-arch-headline]");
    const lede = el.querySelector<HTMLElement>("[data-arch-lede]");
    if (!eyebrow || !headline || !lede) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
        end: "top 40%",
        scrub: 1.45,
      },
      defaults: { ease: "power2.out" },
    });

    tl.fromTo(
      eyebrow,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 1 },
      0,
    )
      .fromTo(
        headline,
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: 1.15 },
        0.14,
      )
      .fromTo(
        lede,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.05 },
        0.32,
      );
  });

  return (
    <div ref={root}>
      <div data-arch-eyebrow className="flex items-center gap-4">
        <p className="label shrink-0 text-signal">01 — Architecture</p>
        <span aria-hidden className="h-px min-w-0 flex-1 bg-signal/30" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-12">
        <div data-arch-headline className="lg:col-span-7">
          <h2 className="display max-w-[16ch] text-foreground">
            Security is not a feature. <span className="accent">It is the architecture.</span>
          </h2>
        </div>
        <div data-arch-lede className="lg:col-span-5 lg:pb-2">
          <p className="lede max-w-[36rem]">
            Built with security at every layer — from the data that enters a system to how it is watched after
            deployment. Every system is reviewed against the OWASP Top 10 for LLM applications before it is built.
          </p>
        </div>
      </div>
    </div>
  );
}
