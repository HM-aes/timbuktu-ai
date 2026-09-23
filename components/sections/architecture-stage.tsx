"use client";

import { useRef } from "react";
import gsap from "gsap";
import SecurityStack from "@/components/visuals/security-stack";
import { useScrollScene } from "@/lib/use-scroll-scene";
import { useStageActivity } from "@/lib/use-stage-activity";

export type SecurityLayer = {
  n: string;
  name: string;
  purpose: string;
  detail: string;
};

/**
 * The pinned architecture stage. On desktop the row pins below the header
 * and the scroll assembles the system: the core first, then each layer drops
 * into place around it while its entry in the list lights up. Everywhere
 * else — mobile, short screens, reduced motion — the finished system is
 * simply shown; the timeline only ever hides things it is about to reveal.
 */
export default function ArchitectureStage({ layers }: { layers: SecurityLayer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useStageActivity(stage);

  useScrollScene(
    root,
    (el) => {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const plates = layers.map((l) => el.querySelector(`[data-layer="${Number(l.n)}"]`));
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-step-bar]"));

      gsap.set(plates, { opacity: 0, "--lz": 4 });
      gsap.set(steps, { opacity: 0.32 });
      gsap.set(bars, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el,
          start: `top top+=${header}`,
          end: "+=260%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      tl.to({}, { duration: 0.6 }); // the core on its own for a beat
      plates.forEach((plate, i) => {
        const at = 0.6 + i * 1.2;
        tl.to(plate, { opacity: 1, "--lz": 0, duration: 1 }, at);
        tl.to(steps[i], { opacity: 1, duration: 0.5 }, at);
        tl.to(bars[i], { scaleX: 1, duration: 0.9 }, at);
      });
      tl.to({}, { duration: 0.8 }); // hold the finished system before release
    },
    "(min-width: 1024px) and (min-height: 620px)",
  );

  return (
    <div
      ref={root}
      className="grid grid-cols-1 border-t border-[var(--line)] bg-background lg:min-h-[calc(100svh-var(--header-min-h-lg))] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
    >
      {/* The layers, in the order a request meets them */}
      <ol aria-label="Security layers" className="gutter order-2 flex flex-col justify-center py-10 lg:order-1 lg:py-8 lg:pr-12">
        {layers.map((l) => (
          <li key={l.n} data-step className="relative border-t border-[var(--line)] py-5 first:border-t-0 lg:py-4 [@media(min-height:820px)]:lg:py-6">
            <span
              data-step-bar
              aria-hidden
              className="absolute left-0 top-[-1px] hidden h-px w-full origin-left bg-signal lg:block"
            />
            <div className="flex items-baseline gap-4">
              <span className="label w-6 shrink-0 text-signal">{l.n}</span>
              <div className="min-w-0">
                <h3 className="text-[1.125rem] font-medium uppercase tracking-[0.06em] text-foreground">{l.name}</h3>
                <p className="mt-1.5 text-[15.5px] leading-snug text-foreground/90">{l.purpose}</p>
                {/* Detail drops out on short desktop screens so the pinned list always fits */}
                <p className="cell-body mt-1.5 max-w-[42ch] lg:[@media(max-height:760px)]:hidden">{l.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* The system itself */}
      <div
        ref={stage}
        className="iso-stage stage-object order-1 aspect-square border-b border-[var(--line)] [--glow:14%] sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l"
      >
        <div className="iso-root translate-y-[8%] [--iso-unit:1.45cqw] sm:[--iso-unit:1.5cqw] lg:[--iso-unit:1.55cqw]">
          <SecurityStack />
        </div>
      </div>
    </div>
  );
}
