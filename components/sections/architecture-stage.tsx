"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RequestTrace from "@/components/visuals/request-trace";
import { useScrollScene } from "@/lib/use-scroll-scene";

export type SecurityLayer = {
  n: string;
  name: string;
  /** Plain-language reading, for the person who signs off. */
  purpose: string;
  detail: string;
  /** Engineering reading: what it is built with, what it checks, what that closes. */
  tools: string[];
  checks: string[];
  closes: string[];
};

/** `pinned`: scroll tells the story. `free`: it plays once, then tap, hover or focus. */
type Mode = "pending" | "pinned" | "free";
/** 1-based layer number, or null for the whole system at rest. */
type Focus = number | null;

const PINNED = "(min-width: 1024px) and (min-height: 620px)";
const PINNED_QUERY = `${PINNED} and (prefers-reduced-motion: no-preference)`;
/** How long the trace takes when it plays on its own, in seconds. */
const AUTOPLAY_S = 10;
const OPEN = "power2.inOut";
const TRAVEL = "power1.inOut";

/**
 * The one choreography both modes share: a request enters the Application,
 * is screened at the Model, retrieves from Data, and the answer climbs back
 * while Operations records every hop. Exactly one layer is open at any
 * moment, so the frame keeps its height from the first beat to the last.
 *
 * Every tween ends on the CSS defaults (the finished state), which is what
 * lets the free mode clear its inline values afterwards and hand over to
 * plain CSS for tap and hover.
 */
function buildTrace(el: HTMLElement, tl: gsap.core.Timeline) {
  const scene = el.querySelector<HTMLElement>("[data-scene]");
  const frame = el.querySelector<HTMLElement>(".trc-frame");
  const slot = el.querySelector<HTMLElement>("[data-slot]");
  const cards = Array.from(el.querySelectorAll<HTMLElement>(".trc-card"));
  const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-log]"));
  const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
  const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-step-bar]"));
  if (!scene || !frame || !slot || cards.length < 2 || lines.length < cards.length + 2) return false;

  const light = (i: number) => {
    tl.to(steps.filter((_, j) => j !== i), { opacity: 0.5, duration: 0.35 }, "<");
    tl.to(steps[i] ?? [], { opacity: 1, duration: 0.35 }, "<");
    tl.to(bars.filter((_, j) => j !== i), { opacity: 0.35, duration: 0.35 }, "<");
    tl.to(bars[i] ?? [], { scaleX: 1, opacity: 1, duration: 0.5 }, "<");
  };
  const record = (i: number, at: string) =>
    tl.to(lines[i] ?? [], { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, at);

  /* Before anything has happened: the boundary is open and explaining
     itself, the request waits at the top, nothing has been checked. */
  tl.set(scene, { "--sec": 0 }, 0);
  tl.set(frame, { "--focus": 1, "--pass": 0 }, 0);
  tl.set(slot, { "--flow": 0, "--ret": 0 }, 0);
  tl.set(cards, { "--focus": 0, "--dim": 0, "--pass": 0, "--flow": 0, "--ret": 0 }, 0);
  tl.set(lines, { opacity: 0, y: "0.5em" }, 0);
  tl.set(steps, { opacity: 0.62 }, 0);
  tl.set(bars, { scaleX: 0 }, 0);

  tl.to({}, { duration: 0.4 });
  tl.to(slot, { "--flow": 1, duration: 0.5, ease: TRAVEL });

  /* One layer at a time: it opens as the last one closes, its check
     passes, the log records it, and the request moves on. */
  cards.forEach((card, i) => {
    tl.addLabel(`layer-${i + 1}`);
    tl.to(i === 0 ? frame : (cards[i - 1] ?? []), { "--focus": 0, duration: 0.5, ease: OPEN });
    tl.to(card, { "--focus": 1, "--dim": 0, duration: 0.5, ease: OPEN }, "<");
    tl.to(cards.filter((c) => c !== card), { "--dim": 1, duration: 0.5, ease: OPEN }, "<");
    light(i);
    tl.to(card, { "--pass": 1, duration: 0.3, ease: "power2.out" }, ">+0.3");
    record(i, "<+0.1");
    tl.addLabel(`read-${i + 1}`);
    tl.to({}, { duration: 0.5 });
    if (i < cards.length - 1) tl.to(card, { "--flow": 1, duration: 0.5, ease: TRAVEL });
  });

  /* Operations: the answer climbs back through the layers it came down,
     the last hops are recorded, and the boundary is drawn solid. */
  const last = cards.length;
  tl.addLabel(`layer-${last + 1}`);
  tl.to(cards[last - 1] ?? [], { "--focus": 0, duration: 0.5, ease: OPEN });
  tl.to(frame, { "--focus": 1, duration: 0.5, ease: OPEN }, "<");
  tl.to(cards, { "--dim": 0, duration: 0.5, ease: OPEN }, "<");
  light(last);
  for (let i = last - 2; i >= 0; i -= 1) {
    tl.to(cards[i] ?? [], { "--ret": 1, duration: 0.4, ease: TRAVEL });
    if (i === last - 2) record(last, "<+0.15");
  }
  tl.to(slot, { "--ret": 1, duration: 0.35, ease: TRAVEL });
  record(last + 1, "<");
  tl.to(scene, { "--sec": 1, duration: 0.5, ease: "power2.out" }, ">-0.05");
  tl.to(frame, { "--pass": 1, duration: 0.3, ease: "power2.out" }, "<");
  tl.to(steps, { opacity: 1, duration: 0.4 }, "<");
  tl.to(bars, { scaleX: 1, opacity: 1, duration: 0.4 }, "<");
  tl.addLabel(`read-${last + 1}`);
  tl.to({}, { duration: 0.6 });
  return true;
}

/**
 * The architecture stage.
 *
 * On a large, tall screen the row is pinned and the scroll scrubs the trace;
 * clicking a layer in the list scrolls to its beat. Everywhere else (phones,
 * tablets, short laptops) there is no pinned scroll: the trace plays once
 * when it comes into view, then each layer can be tapped, hovered or
 * focused, and "Replay trace" runs it again. With reduced motion nothing
 * plays; the finished, verified system is shown and layers still open on
 * tap. Nothing the timeline explains is hidden in any mode.
 */
export default function ArchitectureStage({ layers }: { layers: SecurityLayer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const pinnedTl = useRef<gsap.core.Timeline | null>(null);
  const stopAutoplay = useRef<(() => void) | null>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [focus, setFocus] = useState<Focus>(null);
  const [canPlay, setCanPlay] = useState(false);
  /** Bumped by "Replay trace"; 0 means wait for the stage to scroll into view. */
  const [run, setRun] = useState(0);

  /* Which story we are telling: decided on the client, kept in sync on resize. */
  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => {
      setMode(mq.matches ? "pinned" : "free");
      setCanPlay(!mq.matches && motion.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  /* Pinned: the scroll is the playhead. */
  useScrollScene(
    root,
    (el) => {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
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
      buildTrace(el, tl);
      pinnedTl.current = tl;
      return () => {
        pinnedTl.current = null;
      };
    },
    PINNED,
  );

  /* Free: the same trace on a clock, once, then CSS takes over. */
  useEffect(() => {
    const el = root.current;
    if (!el || mode !== "free" || !canPlay) return;
    gsap.registerPlugin(ScrollTrigger);

    let done = false;
    let ctx: gsap.Context | null = null;
    const finish = () => {
      if (done) return;
      done = true;
      stopAutoplay.current = null;
      /* Reverting drops every inline value, which lands on the CSS defaults:
         the finished state the timeline was heading for anyway. */
      ctx?.revert();
    };
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" }, onComplete: () => window.setTimeout(finish, 0) });
      if (!buildTrace(el, tl)) return;
      tl.timeScale(tl.duration() / AUTOPLAY_S);
      if (run > 0) tl.play();
      else ScrollTrigger.create({ trigger: el, start: "top 60%", once: true, onEnter: () => tl.play() });
    }, el);
    stopAutoplay.current = finish;
    return finish;
  }, [mode, canPlay, run]);

  const select = useCallback((n: number, user = true) => {
    stopAutoplay.current?.();
    setFocus((current) => (user && current === n ? null : n));
  }, []);

  /* Pinned: a click on a layer scrolls to the beat where it has been read. */
  const jump = useCallback((n: number) => {
    const tl = pinnedTl.current;
    const st = tl?.scrollTrigger;
    const at = tl?.labels[`read-${n}`];
    if (!tl || !st || at === undefined) return;
    const y = st.start + (st.end - st.start) * (at / tl.duration());
    if (window.__lenis) window.__lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const replay = useCallback(() => {
    setFocus(null);
    setRun((r) => r + 1);
  }, []);

  const free = mode === "free";

  return (
    <div
      ref={root}
      data-free={free ? "" : undefined}
      data-focus={free && focus !== null ? focus : undefined}
      className="arch-stage grid grid-cols-1 border-t border-[var(--line)] lg:min-h-[calc(100svh-var(--header-min-h-lg))] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]"
    >
      <div className="gutter order-2 flex flex-col justify-center py-10 lg:order-1 lg:py-8 lg:pr-10">
        <p className="mb-6 max-w-[36ch] text-base leading-snug text-muted-foreground">
          Follow one request. Each layer checks it before the next one sees it.
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
                  <span className="label w-6 shrink-0 text-[color:var(--arch-go)]">{l.n}</span>
                  <div className="min-w-0">
                    <h3 className="text-[1.125rem] font-medium uppercase tracking-[0.06em] text-foreground">
                      <button
                        type="button"
                        aria-pressed={free ? focus === n : undefined}
                        onClick={() => (free ? select(n) : jump(n))}
                        onFocus={() => free && select(n, false)}
                        onPointerEnter={(e) => {
                          if (free && e.pointerType === "mouse") select(n, false);
                        }}
                        className="cursor-pointer text-left uppercase tracking-[0.06em] after:absolute after:inset-0"
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

      <div className="arch-view order-1 border-b border-[var(--line)] lg:order-2 lg:border-b-0 lg:border-l">
        <RequestTrace layers={layers} onSelect={free ? select : undefined} onReplay={free && canPlay ? replay : undefined} />
      </div>
    </div>
  );
}
