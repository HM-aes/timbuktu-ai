"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Nis2Dashboard } from "@/components/dashboards";
import { useScrollScene } from "@/lib/use-scroll-scene";

const CRITICAL_ROW = "Art. 21(2)(d)";

/** The four beats of one analysis, read left to right above the interface. */
const BEATS = [
  {
    title: "Documents in",
    body: "Upload the policies you already have. Each one is read and classified before the analysis starts.",
  },
  {
    title: "Mapped to the directive",
    body: "Every requirement of Article 21 is checked against what your documents actually say.",
  },
  {
    title: "The gap, in plain language",
    body: "Each finding says what is missing, which article expects it, and why it matters.",
  },
  {
    title: "Ready for the board",
    body: "Coverage in one number, the evidence behind it, and an export your auditor can read.",
  },
] as const;

/**
 * NIS2 Analyzer, told as one analysis. On large screens the interface pins
 * and scrolling plays the run: documents are counted in, requirements fill
 * row by row, the critical gap opens, and the board summary lands. On small
 * screens the same timeline plays once as the interface enters. With reduced
 * motion the interface simply shows its finished state.
 */
export default function Nis2Story() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string>(CRITICAL_ROW);

  useScrollScene(ref, (el) => {
    const q = <T extends Element = HTMLElement>(sel: string) => el.querySelector<T>(sel);
    const all = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, el);

    const pin = q("[data-story-pin]");
    const steps = all("[data-story-step]");
    const kpis = all("[data-nis2-kpi]");
    const docsValue = q('[data-nis2-kpi="docs"] [data-nis2-value]');
    const coverageValue = q('[data-nis2-kpi="coverage"] [data-nis2-value]');
    const rows = all("[data-nis2-row]");
    const pills = all("[data-nis2-pill]");
    const critical = q('[data-nis2-row="critical"]');
    const criticalPill = q('[data-nis2-row="critical"] [data-nis2-pill]');
    const summary = q("[data-nis2-summary]");
    const ring = q<SVGCircleElement>("[data-nis2-ring]");
    const exportBtn = q("[data-nis2-export]");
    if (!pin || !ring || !summary || !critical || rows.length === 0) return;

    const large = window.matchMedia("(min-width: 1024px)").matches;
    const ringFull = Number(ring.dataset.circumference);
    const ringEnd = Number(ring.getAttribute("stroke-dashoffset"));

    // Start state. Everything is authored in its finished state, so this is
    // the only place the "before" exists — and matchMedia reverts it.
    gsap.set(kpis, { opacity: 0, y: 12 });
    gsap.set(rows, { opacity: 0, x: -12 });
    gsap.set(pills, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(summary, { opacity: 0.3, y: 16 });
    gsap.set(exportBtn, { opacity: 0, y: 8 });
    gsap.set(ring, { attr: { "stroke-dashoffset": ringFull } });

    const counters = { docs: 0, coverage: 0 };
    const paintCounters = () => {
      if (docsValue) docsValue.textContent = String(Math.round(counters.docs));
      if (coverageValue) coverageValue.textContent = `${Math.round(counters.coverage)}%`;
    };

    let active = -1;
    let focused: boolean | null = null;
    const phase = (p: number) => {
      const i = Math.min(BEATS.length - 1, Math.floor(p * BEATS.length));
      if (i !== active) {
        active = i;
        steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
      }
      const f = p >= 0.52;
      if (f !== focused) {
        focused = f;
        critical.classList.toggle("is-focus", f);
        setOpen(f ? CRITICAL_ROW : "");
      }
    };

    if (large) el.classList.add("is-pinned");

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onUpdate: () => phase(tl.progress()),
      scrollTrigger: large
        ? {
            trigger: pin,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.6}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          }
        : {
            trigger: pin,
            start: "top 72%",
            toggleActions: "play none none none",
          },
    });

    // 1 — documents in
    tl.to(kpis, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, 0);
    tl.to(counters, { docs: 38, duration: 0.8, ease: "power1.inOut", onUpdate: paintCounters }, 0.1);

    // 2 — mapped to the directive
    tl.to(rows, { opacity: 1, x: 0, duration: 0.4, stagger: 0.13 }, 1);
    tl.to(pills, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.13 }, 1.2);
    tl.to(counters, { coverage: 72, duration: 0.9, ease: "power1.inOut", onUpdate: paintCounters }, 1.1);

    // 3 — the gap, in plain language
    if (criticalPill) {
      tl.to(criticalPill, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" }, 2.15);
    }
    tl.to({}, { duration: 0.85 }, 2.15); // hold while the finding is read

    // 4 — ready for the board
    tl.to(summary, { opacity: 1, y: 0, duration: 0.5 }, 3);
    tl.to(ring, { attr: { "stroke-dashoffset": ringEnd }, duration: 0.9, ease: "power2.inOut" }, 3.05);
    tl.to(exportBtn, { opacity: 1, y: 0, duration: 0.4 }, 3.6);

    phase(0);
    paintCounters();

    return () => {
      el.classList.remove("is-pinned");
      critical.classList.remove("is-focus");
      steps.forEach((s) => s.classList.remove("is-active"));
      setOpen(CRITICAL_ROW);
    };
  });

  return (
    <div ref={ref} className="nis2-story">
      <div data-story-pin className="nis2-story-pin">
        <ol className="nis2-story-steps" aria-label="How one analysis runs">
          {BEATS.map((b, i) => (
            <li key={b.title} data-story-step className="nis2-step">
              <span className="nis2-step-number">{String(i + 1).padStart(2, "0")}</span>
              <span className="nis2-step-title">{b.title}</span>
              <span className="nis2-step-body">{b.body}</span>
            </li>
          ))}
        </ol>

        <div className="nis2-story-stage">
          <div className="stage-glow relative p-2 sm:p-4 lg:p-5">
            <div className="panel overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <div
                className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] lg:overflow-visible"
                data-lenis-prevent
              >
                <div className="min-w-[min(100%,42rem)] lg:min-w-0">
                  <Nis2Dashboard presentation="wide" open={open} onOpenChange={setOpen} animateRing={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
