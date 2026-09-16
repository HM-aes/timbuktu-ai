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
  ["4", "systems in production", "NIS2 Analyzer, Lex Legal and DocSense live; TankSlim in development."],
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
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? INSTANT : { duration: 1.1, delay, ease }}
      className="shell"
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-foreground/[0.09]">
        {/* Tab strip */}
        <div
          role="tablist"
          aria-label="Products"
          className="flex overflow-x-auto border-b border-foreground/[0.09] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  "relative flex h-[4.5rem] min-w-[11rem] flex-1 items-center justify-center gap-3 border-r border-foreground/[0.08] px-6 text-[15px] font-medium transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60 sm:h-20",
                  selected
                    ? "bg-foreground/[0.04] text-foreground"
                    : "text-muted-foreground hover:bg-foreground/[0.02] hover:text-foreground",
                )}
              >
                <p.icon
                  size={17}
                  strokeWidth={1.75}
                  className={cn("shrink-0", selected ? "text-amber-300" : "text-muted-foreground/70")}
                />
                <span className="whitespace-nowrap">{p.name}</span>
                {"soon" in p && p.soon && (
                  <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/70 lg:inline">
                    soon
                  </span>
                )}
                {selected && (
                  <motion.span
                    layoutId="showcase-tab-underline"
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px bg-amber-400"
                    transition={reduced ? INSTANT : { duration: 0.45, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div className="stage-glow relative p-2 sm:p-4 lg:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              role="tabpanel"
              id={`${baseId}-panel-${current.id}`}
              aria-labelledby={`${baseId}-tab-${current.id}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="panel overflow-hidden rounded-2xl"
            >
              <View />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats */}
        <dl className="grid border-t border-foreground/[0.09] sm:grid-cols-3">
          {STATS.map(([n, label, detail]) => (
            <div
              key={label}
              className="border-b border-foreground/[0.08] px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:px-10 lg:py-9"
            >
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-[2.4rem] font-medium leading-none tracking-[-0.02em] text-foreground lg:text-[2.8rem]">
                {n}
              </dd>
              <dd className="mt-3 text-[15px] text-foreground/90">{label}</dd>
              <dd className="mt-1.5 max-w-[24rem] text-[12.5px] leading-relaxed text-muted-foreground">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
}
