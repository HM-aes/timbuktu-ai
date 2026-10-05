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

type Beat = { n?: string; name: string; line: string };

/** Opening line, one beat per layer, then the link between them, then the close. */
function storyBeats(layers: SecurityLayer[]): Beat[] {
  return [
    { name: "One system", line: "Security is built into the architecture." },
    ...layers.map((l) => ({ n: l.n, name: l.name, line: l.purpose })),
    { name: "Together", line: "Every layer protects the layer above it." },
    { name: "One architecture", line: "Not a feature added at the end." },
  ];
}

/**
 * The pinned architecture stage. On a large screen the row holds still and
 * the scroll tells the story: a closed stack, a slow opening, one layer
 * named at a time, the link between them, then the stack closes again.
 * Mobile, short screens, and reduced motion show the finished system with
 * every layer readable in the list. Nothing the timeline explains is
 * hidden in those states.
 */
export default function ArchitectureStage({ layers }: { layers: SecurityLayer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useStageActivity(stage);
  const beats = storyBeats(layers);

  useScrollScene(
    root,
    (el) => {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const scene = el.querySelector<HTMLElement>("[data-scene]");
      const spine = el.querySelector<HTMLElement>(".iso-spine");
      const plates = layers
        .map((l) => el.querySelector<HTMLElement>(`[data-layer="${Number(l.n)}"]`))
        .filter((plate): plate is HTMLElement => plate !== null);
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-step-bar]"));
      const captions = Array.from(el.querySelectorAll<HTMLElement>("[data-beat]"));
      if (!scene || plates.length !== layers.length || captions.length !== beats.length) return;

      gsap.set(scene, { "--spread": 0.46 });
      gsap.set(plates, { "--focus": 0, "--dim": 0 });
      gsap.set(spine, { opacity: 0.18 });
      gsap.set(steps, { opacity: 0.62 });
      gsap.set(bars, { scaleX: 0 });
      gsap.set(captions, { opacity: 0, y: 0 });
      gsap.set(captions[0], { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: `top top+=${header}`,
          end: "+=320%",
          pin: true,
          scrub: true,
        },
      });

      const show = (index: number) => {
        captions.forEach((caption, i) => {
          tl.to(caption, { opacity: i === index ? 1 : 0, duration: 0.28 }, "<");
        });
      };

      tl.to({}, { duration: 0.4 });
      tl.to(scene, { "--spread": 1.2, duration: 1.2, ease: "power1.inOut" });

      plates.forEach((plate, i) => {
        const others = plates.filter((_, j) => j !== i);
        tl.to({}, { duration: 0.08 });
        show(i + 1);
        tl.to(plate, { "--focus": 1, "--dim": 0, duration: 0.42 }, "<");
        tl.to(others, { "--focus": 0, "--dim": 1, duration: 0.42 }, "<");
        tl.to(
          steps.filter((_, j) => j !== i),
          { opacity: 0.55, duration: 0.3 },
          "<",
        );
        tl.to(steps[i], { opacity: 1, duration: 0.3 }, "<");
        tl.to(
          bars.filter((_, j) => j !== i),
          { opacity: 0.35, duration: 0.3 },
          "<",
        );
        tl.to(bars[i], { scaleX: 1, opacity: 1, duration: 0.45 }, "<");
        tl.to({}, { duration: 0.62 });
      });

      tl.to({}, { duration: 0.08 });
      show(layers.length + 1);
      tl.to(plates, { "--focus": 0, "--dim": 0, duration: 0.4 }, "<");
      tl.to(spine, { opacity: 1, duration: 0.55 }, "<");
      tl.to(steps, { opacity: 0.9, duration: 0.35 }, "<");
      tl.to(bars, { opacity: 0.7, duration: 0.35 }, "<");
      tl.to({}, { duration: 0.5 });

      tl.to({}, { duration: 0.08 });
      show(layers.length + 2);
      tl.to(scene, { "--spread": 1, duration: 0.95, ease: "power1.inOut" }, "<");
      tl.to(steps, { opacity: 1, duration: 0.4 }, "<");
      tl.to(bars, { opacity: 1, duration: 0.4 }, "<");
      tl.to({}, { duration: 0.45 });
    },
    "(min-width: 1024px) and (min-height: 620px)",
  );

  return (
    <div
      ref={root}
      className="arch-stage grid grid-cols-1 border-t border-[var(--line)] lg:min-h-[calc(100svh-var(--header-min-h-lg))] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
    >
      {/* The layers, in the order a request meets them */}
      <div className="gutter order-2 flex flex-col justify-center py-10 lg:order-1 lg:py-8 lg:pr-12">
        <p className="mb-6 max-w-[36ch] text-base leading-snug text-muted-foreground lg:sr-only">
          Read from the top. Each layer protects the one above it.
        </p>
        <ol aria-label="Security layers">
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
      </div>

      {/* The system itself */}
      <div
        ref={stage}
        className="iso-stage stage-object order-1 aspect-[4/3] border-b border-[var(--line)] [--glow:14%] sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l"
      >
        <div className="iso-root translate-y-[2%] [--iso-unit:1.35cqw] sm:[--iso-unit:1.45cqw] lg:-translate-y-[6%] lg:[--iso-unit:1.42cqw]">
          <SecurityStack />
        </div>
        {/* Screen-space caption. The plates stay in 3D; this stays readable. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden px-6 pb-6 lg:block lg:px-10 lg:pb-8">
          <div className="relative h-[6.5rem] max-w-[38ch]">
            {beats.map((beat, i) => (
              <div
                key={`${beat.n ?? "beat"}-${beat.name}`}
                data-beat={i}
                className={
                  i === beats.length - 1
                    ? "arch-beat absolute inset-0 bg-background/85 px-3.5 py-3"
                    : "arch-beat absolute inset-0 bg-background/85 px-3.5 py-3 opacity-0"
                }
              >
                <p className="label flex items-center gap-2.5">
                  {beat.n ? <span className="text-signal">{beat.n}</span> : null}
                  <span>{beat.name}</span>
                </p>
                <p className="mt-2 max-w-[34ch] text-base leading-snug text-foreground">{beat.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
