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

type Beat = { n?: string; name: string; line: string; layer?: number };

/** Opening line, one beat per layer, then the link between them, then the close. */
function storyBeats(layers: SecurityLayer[]): Beat[] {
  return [
    { name: "One system", line: "Security is built into the architecture." },
    ...layers.map((l) => ({ n: l.n, name: l.name, line: l.purpose, layer: Number(l.n) })),
    { name: "Together", line: "Every layer protects the layer above it." },
    { name: "One architecture", line: "Not a feature added at the end." },
  ];
}

/**
 * Screen-space label for the exploded diagram. The plates stay in CSS 3D;
 * this overlay is ordinary HTML so the name never tilts with them.
 */
function pinCallout(
  stage: HTMLElement,
  plate: HTMLElement,
  callout: HTMLElement,
  line: SVGLineElement,
) {
  const stageBox = stage.getBoundingClientRect();
  const plateBox = plate.getBoundingClientRect();
  const anchor = plate.querySelector<HTMLElement>("[data-layer-anchor]");
  const tip = anchor?.getBoundingClientRect() ?? plateBox;

  const x1 = tip.left + tip.width / 2 - stageBox.left;
  const y1 = tip.top + tip.height / 2 - stageBox.top;
  const width = callout.offsetWidth || 272;
  const gap = 22;
  const fromRight = plateBox.right - stageBox.left + gap;
  const fromLeft = plateBox.left - stageBox.left - width - gap;
  const labelX =
    fromRight + width < stageBox.width - 20
      ? fromRight
      : Math.max(16, fromLeft);
  const labelY = Math.min(stageBox.height - 92, Math.max(20, y1 - 16));

  gsap.set(callout, { x: labelX, y: labelY });
  line.setAttribute("x1", String(x1));
  line.setAttribute("y1", String(y1));
  line.setAttribute("x2", String(labelX + (labelX < x1 ? width : 0)));
  line.setAttribute("y2", String(labelY + 14));
}

/**
 * The pinned architecture stage. On a large screen the row holds still and
 * the scroll tells the story: a closed stack, a slow opening, one layer
 * named at a time on a flat HTML overlay, then the stack closes again.
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
      const stageEl = el.querySelector<HTMLElement>(".iso-stage");
      const spine = el.querySelector<HTMLElement>(".iso-spine");
      const plates = layers
        .map((l) => el.querySelector<HTMLElement>(`[data-layer="${Number(l.n)}"]`))
        .filter((plate): plate is HTMLElement => plate !== null);
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-step-bar]"));
      const captions = Array.from(el.querySelectorAll<HTMLElement>("[data-beat]"));
      const callouts = Array.from(el.querySelectorAll<HTMLElement>("[data-callout]"));
      const lines = Array.from(el.querySelectorAll<SVGLineElement>("[data-callout-line]"));
      if (!scene || !stageEl || plates.length !== layers.length || captions.length !== beats.length) return;

      const place = () => {
        plates.forEach((plate, i) => {
          const callout = callouts[i];
          const line = lines[i];
          if (callout && line) pinCallout(stageEl, plate, callout, line);
        });
      };

      gsap.set(scene, { "--spread": 0.46 });
      gsap.set(plates, { "--focus": 0, "--dim": 0 });
      gsap.set(spine, { opacity: 0.18 });
      gsap.set(steps, { opacity: 0.62 });
      gsap.set(bars, { scaleX: 0 });
      gsap.set(captions, { opacity: 0 });
      gsap.set(captions[0], { opacity: 1 });
      gsap.set(callouts, { opacity: 0, x: 0, y: 0 });
      gsap.set(lines, { opacity: 0 });
      place();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: `top top+=${header}`,
          end: "+=340%",
          pin: true,
          scrub: true,
          onUpdate: place,
          onRefresh: place,
        },
      });

      const showCaption = (index: number) => {
        captions.forEach((caption, i) => {
          tl.to(caption, { opacity: i === index ? 1 : 0, duration: 0.32 }, "<");
        });
      };

      const showCallout = (index: number | null) => {
        callouts.forEach((callout, i) => {
          tl.to(callout, { opacity: i === index ? 1 : 0, duration: 0.36 }, "<");
        });
        lines.forEach((line, i) => {
          tl.to(line, { opacity: i === index ? 0.85 : 0, duration: 0.36 }, "<");
        });
      };

      tl.to({}, { duration: 0.45 });
      tl.to(scene, { "--spread": 1.18, duration: 1.35, ease: "power1.inOut" });

      plates.forEach((plate, i) => {
        const others = plates.filter((_, j) => j !== i);
        tl.to({}, { duration: 0.1 });
        showCaption(i + 1);
        showCallout(i);
        tl.to(plate, { "--focus": 1, "--dim": 0, duration: 0.5 }, "<");
        tl.to(others, { "--focus": 0, "--dim": 1, duration: 0.5 }, "<");
        tl.to(
          steps.filter((_, j) => j !== i),
          { opacity: 0.5, duration: 0.35 },
          "<",
        );
        tl.to(steps[i], { opacity: 1, duration: 0.35 }, "<");
        tl.to(
          bars.filter((_, j) => j !== i),
          { opacity: 0.35, duration: 0.35 },
          "<",
        );
        tl.to(bars[i], { scaleX: 1, opacity: 1, duration: 0.5 }, "<");
        tl.to({}, { duration: 0.72 });
      });

      tl.to({}, { duration: 0.1 });
      showCaption(layers.length + 1);
      showCallout(null);
      tl.to(plates, { "--focus": 0, "--dim": 0, duration: 0.45 }, "<");
      tl.to(spine, { opacity: 1, duration: 0.6 }, "<");
      tl.to(steps, { opacity: 0.9, duration: 0.4 }, "<");
      tl.to(bars, { opacity: 0.7, duration: 0.4 }, "<");
      tl.to({}, { duration: 0.55 });

      tl.to({}, { duration: 0.1 });
      showCaption(layers.length + 2);
      tl.to(scene, { "--spread": 1, duration: 1.05, ease: "power1.inOut" }, "<");
      tl.to(steps, { opacity: 1, duration: 0.4 }, "<");
      tl.to(bars, { opacity: 1, duration: 0.4 }, "<");
      tl.to({}, { duration: 0.5 });
    },
    "(min-width: 1024px) and (min-height: 620px)",
  );

  return (
    <div
      ref={root}
      className="arch-stage grid grid-cols-1 border-t border-[var(--line)] lg:min-h-[calc(100svh-var(--header-min-h-lg))] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]"
    >
      <div className="gutter order-2 flex flex-col justify-center py-10 lg:order-1 lg:py-8 lg:pr-10">
        <p className="mb-6 max-w-[36ch] text-base leading-snug text-muted-foreground">
          Read from the top. Each layer protects the one above it.
        </p>
        <ol aria-label="Security layers">
          {layers.map((l) => (
            <li
              key={l.n}
              data-step
              className="relative border-t border-[var(--line)] py-5 first:border-t-0 lg:py-4 [@media(min-height:820px)]:lg:py-5"
            >
              <span
                data-step-bar
                aria-hidden
                className="absolute left-0 top-[-1px] hidden h-px w-full origin-left bg-signal lg:block"
              />
              <div className="flex items-baseline gap-4">
                <span className="label w-6 shrink-0 text-signal">{l.n}</span>
                <div className="min-w-0">
                  <h3 className="text-[1.125rem] font-medium uppercase tracking-[0.06em] text-foreground">{l.name}</h3>
                  <p className="mt-1.5 max-w-[36ch] text-base leading-snug text-foreground/90">{l.purpose}</p>
                  <p className="mt-1.5 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground lg:[@media(max-height:760px)]:hidden">
                    {l.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div
        ref={stage}
        className="iso-stage stage-object order-1 aspect-[4/3] border-b border-[var(--line)] [--glow:14%] sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l"
      >
        <div className="iso-root translate-y-[2%] [--iso-unit:1.28cqw] sm:[--iso-unit:1.38cqw] lg:-translate-x-[4%] lg:-translate-y-[4%] lg:[--iso-unit:1.22cqw]">
          <SecurityStack />
        </div>

        {/* Flat overlay — names stay horizontal while the plates stay in 3D. */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block">
          {layers.map((l) => (
            <line
              key={l.n}
              data-callout-line
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="var(--signal)"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
          {layers.map((l) => (
            <div key={l.n} data-callout className="arch-callout absolute left-0 top-0 w-[17rem] opacity-0">
              <p className="label flex items-center gap-2.5">
                <span className="text-signal">{l.n}</span>
                <span>{l.name}</span>
              </p>
              <p className="mt-1.5 max-w-[24ch] text-base leading-snug text-foreground">{l.purpose}</p>
            </div>
          ))}
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden px-5 pb-5 lg:block lg:px-8 lg:pb-7">
          <div className="relative h-[4.75rem] max-w-[34ch] border-t border-[var(--line)] pt-4">
            {beats.map((beat, i) => (
              <div
                key={`${beat.n ?? "beat"}-${beat.name}`}
                data-beat={i}
                className={
                  i === beats.length - 1
                    ? "arch-beat absolute inset-x-0 top-4"
                    : "arch-beat absolute inset-x-0 top-4 opacity-0"
                }
              >
                <p className="label flex items-center gap-2.5">
                  {beat.n ? <span className="text-signal">{beat.n}</span> : null}
                  <span>{beat.name}</span>
                </p>
                <p className="mt-2 max-w-[32ch] text-base leading-snug text-foreground">{beat.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
