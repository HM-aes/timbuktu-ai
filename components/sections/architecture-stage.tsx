"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SecurityCards from "@/components/visuals/security-cards";
import { useScrollScene } from "@/lib/use-scroll-scene";
import { useStageActivity } from "@/lib/use-stage-activity";

export type SecurityLayer = {
  n: string;
  name: string;
  purpose: string;
  detail: string;
};

type Beat = { n?: string; name: string; line: string; layer?: number };

/** `pinned`: scroll tells the story. `free`: tap, hover or let it cycle. */
type Mode = "pending" | "pinned" | "free";
/** 1-based layer number, or null for the whole system at rest. */
type Focus = number | null;

const PINNED_QUERY = "(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";
const CYCLE: Focus[] = [1, 2, 3, 4, null];
const CYCLE_MS = 3400;

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
 * The architecture stage.
 *
 * On a large, tall screen the row is pinned and the scroll tells the story:
 * one card at a time comes forward to be read and settles into place, until
 * the RAG system stands whole inside its Operations boundary and every lock
 * lights. Everywhere else (phones, tablets, short laptops, reduced motion)
 * there is no pinned scroll: the finished structure is shown, each layer can
 * be tapped, hovered or focused, and it cycles gently while on screen until
 * the visitor takes over. Nothing the timeline explains is hidden in either
 * mode.
 */
export default function ArchitectureStage({ layers }: { layers: SecurityLayer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [focus, setFocus] = useState<Focus>(null);
  const [inView, setInView] = useState(false);
  const [touched, setTouched] = useState(false);
  useStageActivity(stage);
  const beats = storyBeats(layers);

  /* Which story we are telling: decided on the client, kept in sync on resize. */
  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const sync = () => setMode(mq.matches ? "pinned" : "free");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Cycle only while the stage is on screen. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = useCallback((n: number, user = true) => {
    if (user) setTouched(true);
    setFocus((current) => (user && current === n ? null : n));
  }, []);

  useEffect(() => {
    if (mode !== "free" || touched || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let timer = window.setTimeout(function tick() {
      setFocus(CYCLE[i % CYCLE.length] ?? null);
      i += 1;
      timer = window.setTimeout(tick, CYCLE_MS);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [mode, touched, inView]);

  useScrollScene(
    root,
    (el) => {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const scene = el.querySelector<HTMLElement>("[data-scene]");
      const cards = layers
        .map((l) => el.querySelector<HTMLElement>(`[data-layer="${Number(l.n)}"]`))
        .filter((card): card is HTMLElement => card !== null);
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-step-bar]"));
      const captions = Array.from(el.querySelectorAll<HTMLElement>("[data-beat]"));
      if (!scene || cards.length !== layers.length || captions.length !== beats.length) return;

      gsap.set(scene, { "--sec": 0 });
      gsap.set(cards, { "--card-in": 0, "--focus": 1, "--dim": 0 });
      gsap.set(steps, { opacity: 0.62 });
      gsap.set(bars, { scaleX: 0 });
      gsap.set(captions, { opacity: 0 });
      gsap.set(captions[0], { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: `top top+=${header}`,
          end: "+=340%",
          pin: true,
          scrub: true,
        },
      });

      const showCaption = (index: number) => {
        captions.forEach((caption, i) => {
          tl.to(caption, { opacity: i === index ? 1 : 0, duration: 0.32 }, "<");
        });
      };

      tl.to({}, { duration: 0.3 });

      /* One card at a time: it arrives in front to be read while the cards
         already placed step back, then it settles into the structure. */
      cards.forEach((card, i) => {
        const placed = cards.slice(0, i);
        tl.to({}, { duration: 0.1 });
        showCaption(i + 1);
        tl.to(placed, { "--focus": 0, "--dim": 1, duration: 0.6, ease: "power2.inOut" }, "<");
        tl.to(card, { "--card-in": 1, "--focus": 1, "--dim": 0, duration: 0.5, ease: "power2.out" }, "<");
        tl.to(
          steps.filter((_, j) => j !== i),
          { opacity: 0.5, duration: 0.35 },
          "<",
        );
        tl.to(steps[i] ?? [], { opacity: 1, duration: 0.35 }, "<");
        tl.to(
          bars.filter((_, j) => j !== i),
          { opacity: 0.35, duration: 0.35 },
          "<",
        );
        tl.to(bars[i] ?? [], { scaleX: 1, opacity: 1, duration: 0.5 }, "<");
        tl.to({}, { duration: 0.8 });
      });

      /* The structure is whole: every card in place, every lock lit. */
      tl.to({}, { duration: 0.1 });
      showCaption(layers.length + 1);
      tl.to(cards, { "--focus": 0, "--dim": 0, duration: 0.6, ease: "power2.inOut" }, "<");
      tl.to(scene, { "--sec": 1, duration: 0.6 }, "<+=0.3");
      tl.to(steps, { opacity: 0.9, duration: 0.4 }, "<");
      tl.to(bars, { opacity: 0.7, duration: 0.4 }, "<");
      tl.to({}, { duration: 0.55 });

      tl.to({}, { duration: 0.1 });
      showCaption(layers.length + 2);
      tl.to(steps, { opacity: 1, duration: 0.4 }, "<");
      tl.to(bars, { opacity: 1, duration: 0.4 }, "<");
      tl.to({}, { duration: 0.5 });
    },
    "(min-width: 1024px) and (min-height: 620px)",
  );

  const free = mode === "free";
  const active = free && focus !== null ? layers[focus - 1] : undefined;

  return (
    <div
      ref={root}
      data-free={free ? "" : undefined}
      data-focus={free && focus !== null ? focus : undefined}
      className="arch-stage grid grid-cols-1 border-t border-[var(--line)] lg:min-h-[calc(100svh-var(--header-min-h-lg))] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]"
    >
      <div className="gutter order-2 flex flex-col justify-center py-10 lg:order-1 lg:py-8 lg:pr-10">
        <p className="mb-6 max-w-[36ch] text-base leading-snug text-muted-foreground">
          Read from the top. Each layer protects the one above it.
        </p>
        <ol aria-label="Security layers">
          {layers.map((l) => {
            const n = Number(l.n);
            return (
              <li
                key={l.n}
                data-step
                data-on={free && focus === n ? "" : undefined}
                className="relative border-t border-[var(--line)] py-5 first:border-t-0 lg:py-4 [@media(min-height:820px)]:lg:py-5"
              >
                <span data-step-bar aria-hidden className="arch-bar" />
                <div className="flex items-baseline gap-4">
                  <span className="label w-6 shrink-0 text-signal">{l.n}</span>
                  <div className="min-w-0">
                    <h3 className="text-[1.125rem] font-medium uppercase tracking-[0.06em] text-foreground">
                      <button
                        type="button"
                        disabled={!free}
                        aria-pressed={free ? focus === n : undefined}
                        onClick={() => select(n)}
                        onFocus={() => free && select(n, false)}
                        onPointerEnter={(e) => {
                          if (free && e.pointerType === "mouse") select(n);
                        }}
                        className="cursor-pointer text-left uppercase tracking-[0.06em] after:absolute after:inset-0 disabled:cursor-default"
                      >
                        {l.name}
                      </button>
                    </h3>
                    <p className="mt-1.5 max-w-[36ch] text-base leading-snug text-foreground/90">{l.purpose}</p>
                    <p className="mt-1.5 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground lg:[@media(max-height:760px)]:hidden">
                      {l.detail}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        ref={stage}
        className="iso-stage stage-object order-1 aspect-square border-b border-[var(--line)] [--glow:14%] sm:aspect-[4/3] lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l"
      >
        <div className="iso-root">
          <SecurityCards layers={layers} onSelect={free ? select : undefined} />
        </div>

        {/* Pinned story: the beat for wherever the scroll has reached. */}
        <div
          aria-hidden
          className="arch-beats pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden px-5 pb-5 lg:block lg:px-8 lg:pb-7"
        >
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

        {/* Free mode: the same caption, driven by tap, hover or the cycle. */}
        {free ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-4 sm:px-8 sm:pb-6"
          >
            <div
              key={active?.n ?? "system"}
              className="max-w-[34ch] border-t border-[var(--line)] pt-3 animate-in fade-in slide-in-from-bottom-1 duration-300"
            >
              <p className="label flex items-center gap-2.5">
                <span className="text-signal">{active?.n ?? "00"}</span>
                <span>{active?.name ?? "One system"}</span>
              </p>
              <p className="mt-1.5 text-base leading-snug text-foreground">
                {active?.purpose ?? "Security is built into the architecture."}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
