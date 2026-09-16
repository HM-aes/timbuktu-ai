"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileSearch, Gauge, KeyRound, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";
import {
  DocSenseDashboard,
  LexDashboard,
  Nis2Dashboard,
  TankSlimDashboard,
} from "@/components/dashboards";

const ease = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  { id: "nis2", name: "NIS2 Analyzer", icon: ShieldCheck, view: Nis2Dashboard },
  { id: "lex", name: "Lex Legal", icon: KeyRound, view: LexDashboard },
  { id: "docsense", name: "DocSense", icon: FileSearch, view: DocSenseDashboard },
  { id: "tankslim", name: "TankSlim", icon: Gauge, view: TankSlimDashboard, soon: true },
] as const;

const STATS = [
  ["3", "systems in production", "NIS2 Analyzer, Lex Legal and DocSense live; TankSlim in development."],
  ["10 / 10", "OWASP LLM risks covered", "Every system is reviewed against the full OWASP Top 10 for LLM applications before it is built."],
  ["1", "specialist, no handoffs", "You talk to the person who designs and builds the system."],
] as const;

export default function Showcase({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState<(typeof PRODUCTS)[number]["id"]>("nis2");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = PRODUCTS.find((p) => p.id === active)!;
  const View = current.view;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = PRODUCTS.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(PRODUCTS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? INSTANT : { duration: 0.9, delay, ease }}
    >
      {/* Tab strip — one cell per product, sharing the frame's hairlines */}
      <div
        role="tablist"
        aria-label="Products"
        className="grid grid-cols-2 border-y border-[var(--line)] sm:flex"
      >
        {PRODUCTS.map((p, i) => {
          const selected = p.id === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${p.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${p.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative flex h-14 items-center justify-center gap-2.5 border-[var(--line)] px-4 text-[14px] font-medium transition-colors odd:border-r [&:nth-child(-n+2)]:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60 sm:h-20 sm:min-w-[10.5rem] sm:flex-1 sm:border-r sm:border-b-0 sm:px-5 sm:text-[15px] sm:last:border-r-0",
                selected
                  ? "bg-foreground/[0.05] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.025] hover:text-foreground",
              )}
            >
              <p.icon
                size={17}
                strokeWidth={1.75}
                className={cn("shrink-0", selected ? "text-signal" : "text-muted-foreground/80")}
              />
              <span className="whitespace-nowrap">{p.name}</span>
              {"soon" in p && p.soon && (
                <span className="label hidden lg:inline">soon</span>
              )}
              {selected && (
                <motion.span
                  layoutId="showcase-tab-underline"
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-signal"
                  transition={reduced ? INSTANT : { duration: 0.4, ease }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div className="stage-glow relative p-3 sm:p-6 lg:p-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`${baseId}-panel-${current.id}`}
            aria-labelledby={`${baseId}-tab-${current.id}`}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            className="panel overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
          >
            <View />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats — three cells */}
      <dl className="cells cells-3 cells-md">
        {STATS.map(([n, label, detail]) => (
          <div key={label} className="cell">
            <dt className="sr-only">{label}</dt>
            <dd className="font-display text-[2.25rem] font-medium leading-none tracking-[-0.02em] text-foreground lg:text-[2.75rem]">
              {n}
            </dd>
            <dd className="mt-3 text-[15px] font-medium text-foreground">{label}</dd>
            <dd className="cell-body mt-1.5 max-w-[24rem] text-[14px]">{detail}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
