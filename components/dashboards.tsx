"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  ChevronRight,
  Download,
  Files,
  History,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/* ─────────────────────────────────────────────────────────────────────
   Shared shell — sidebar + top bar. Every product dashboard renders
   inside this so the four feel like one product family.
──────────────────────────────────────────────────────────────────── */

type NavItem = { icon: typeof LayoutDashboard; label: string };

function Shell({
  product,
  nav,
  title,
  deployment,
  children,
  shellClassName,
}: {
  product: string;
  nav: NavItem[];
  title: string;
  deployment: string;
  children: ReactNode;
  shellClassName?: string;
}) {
  return (
    <div
      className={cn(
        "grid h-full grid-cols-1 text-[13px] text-foreground md:grid-cols-[13.5rem_1fr]",
        shellClassName ?? "min-h-[30rem]",
      )}
    >
      {/* Sidebar */}
      <aside className="hidden flex-col border-r border-foreground/[0.07] bg-background/40 p-4 md:flex">
        <div className="flex items-center gap-2.5 px-2 pb-5 pt-1">
          <span className="grid size-6 place-items-center rounded-md border border-amber-400/40 bg-amber-400/10 text-amber-300">
            <span className="size-1.5 rounded-full bg-amber-400" />
          </span>
          <span className="text-[13.5px] font-medium tracking-tight">{product}</span>
        </div>
        <nav className="space-y-0.5">
          {nav.map((n, i) => (
            <div
              key={n.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px]",
                i === 0
                  ? "bg-foreground/[0.06] text-foreground"
                  : "text-muted-foreground/80",
              )}
            >
              <n.icon size={14} strokeWidth={1.75} />
              {n.label}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-foreground/[0.07] p-3 font-mono text-[10px] tracking-[0.08em] text-muted-foreground/80">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-verify align-middle" />
          {deployment}
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        <header className="flex h-12 items-center justify-between gap-4 border-b border-foreground/[0.07] px-4 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="text-[13.5px] font-medium">{title}</span>
            <span className="hidden font-mono text-[10px] tracking-[0.1em] text-muted-foreground/80 md:hidden sm:inline">
              {deployment}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <span className="hidden h-7 items-center gap-2 rounded-md border border-foreground/[0.08] px-2.5 text-[11.5px] sm:flex">
              <Search size={12} />
              Search
            </span>
            <span className="grid size-7 place-items-center rounded-md border border-foreground/[0.08]">
              <Bell size={12} />
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-foreground/[0.1] text-[10px] font-medium text-foreground">
              HM
            </span>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "signal" | "verify";
}) {
  return (
    <div className="rounded-xl border border-foreground/[0.07] bg-background/40 px-4 py-3.5">
      <p className="text-[11.5px] text-muted-foreground/85">{label}</p>
      <p
        className={cn(
          "mt-1.5 font-display text-[1.6rem] font-medium leading-none tracking-tight",
          tone === "signal" && "text-amber-300",
          tone === "verify" && "text-verify",
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-muted-foreground/70">{hint}</p>
    </div>
  );
}

function Pane({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col rounded-xl border border-foreground/[0.07] bg-background/40",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-foreground/[0.06] px-4 py-2.5">
        <p className="text-[12.5px] font-medium">{title}</p>
        {action}
      </header>
      <div className="min-w-0 flex-1 p-3.5">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   NIS2 Analyzer — coverage against the directive, gap by gap.
──────────────────────────────────────────────────────────────────── */

export type Severity = "critical" | "high" | "medium" | "ok";

const NIS2_ROWS: {
  article: string;
  name: string;
  severity: Severity;
  missing: string;
}[] = [
  {
    article: "Art. 21(2)(a)",
    name: "Risk analysis and information security policies",
    severity: "ok",
    missing: "Covered by the Information Security Policy v3.2, reviewed March 2026.",
  },
  {
    article: "Art. 21(2)(b)",
    name: "Incident handling",
    severity: "high",
    missing:
      "No documented 24-hour early-warning procedure. NIS2 requires the first notification to the CSIRT within 24 hours of awareness.",
  },
  {
    article: "Art. 21(2)(d)",
    name: "Supply chain security",
    severity: "critical",
    missing:
      "Supplier contracts reviewed contain no security clauses. The directive expects supplier risk to be assessed and contractually addressed.",
  },
  {
    article: "Art. 21(2)(e)",
    name: "Vulnerability handling and disclosure",
    severity: "medium",
    missing:
      "A patching schedule exists, but there is no public channel for external researchers to report vulnerabilities.",
  },
  {
    article: "Art. 21(2)(g)",
    name: "Cyber hygiene and training",
    severity: "ok",
    missing: "Annual training records found for all staff; last cycle completed January 2026.",
  },
];

const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical gap",
  high: "High gap",
  medium: "Partial",
  ok: "Covered",
};

export function SeverityPill({ s }: { s: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em]",
        s === "critical" && "border-critical/40 bg-critical/10 text-critical",
        s === "high" && "border-high/40 bg-high/10 text-high",
        s === "medium" && "border-medium/40 bg-medium/10 text-medium",
        s === "ok" && "border-verify/40 bg-verify/10 text-verify",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          s === "critical" && "bg-critical",
          s === "high" && "bg-high",
          s === "medium" && "bg-medium",
          s === "ok" && "bg-verify",
        )}
      />
      {SEVERITY_LABEL[s]}
    </span>
  );
}

function CoverageRing({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 84 84" className="size-24" aria-hidden>
      <circle cx="42" cy="42" r={r} stroke="currentColor" strokeWidth="6" className="text-foreground/[0.08]" fill="none" />
      <motion.circle
        cx="42"
        cy="42"
        r={r}
        stroke="var(--verify)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value / 100) }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 42 42)"
      />
      <text x="42" y="46" textAnchor="middle" className="fill-foreground font-display text-[17px] font-medium">
        {value}%
      </text>
    </svg>
  );
}

export function Nis2Dashboard({
  presentation = "default",
}: {
  /** Wide layout for product-page cinematic showcase — same UI, proportional height. */
  presentation?: "default" | "wide";
}) {
  const [open, setOpen] = useState<string>("Art. 21(2)(d)");
  const reduced = useReducedMotionSafe();
  const isWide = presentation === "wide";

  return (
    <Shell
      product="NIS2 Analyzer"
      title="Compliance overview"
      deployment="hosted · EU region"
      shellClassName={
        isWide ? "min-h-0 md:min-h-[22rem] lg:min-h-[24rem]" : "min-h-[30rem]"
      }
      nav={[
        { icon: LayoutDashboard, label: "Overview" },
        { icon: Files, label: "Documents" },
        { icon: ShieldCheck, label: "Gaps" },
        { icon: History, label: "Runs" },
        { icon: Settings, label: "Settings" },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Coverage" value="72%" hint="34 of 47 requirements" tone="verify" />
        <Kpi label="Open gaps" value="13" hint="1 critical · 4 high" tone="signal" />
        <Kpi label="Documents read" value="38" hint="last run 2 min ago" />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_15rem]">
        <Pane
          title="Requirements — Article 21"
          action={
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/70">
              select a row
            </span>
          }
        >
          <ul className="divide-y divide-foreground/[0.06]">
            {NIS2_ROWS.map((row) => {
              const isOpen = open === row.article;
              return (
                <li key={row.article}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? "" : row.article)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 py-2.5 text-left transition-colors hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <ChevronRight
                      size={13}
                      className={cn(
                        "shrink-0 text-muted-foreground/60 transition-transform",
                        isOpen && "rotate-90 text-amber-300",
                      )}
                    />
                    <span className="hidden w-24 shrink-0 font-mono text-[10.5px] text-muted-foreground/80 sm:inline">
                      {row.article}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{row.name}</span>
                    <SeverityPill s={row.severity} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mb-3 ml-7 max-w-[38rem] text-[12.5px] leading-relaxed text-muted-foreground sm:ml-[8.75rem]">
                          {row.missing}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Pane>

        <Pane title="Board summary">
          <div className="flex flex-col items-center text-center">
            <CoverageRing value={72} />
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
              One critical gap in supplier contracts. Everything else is partial or covered.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex h-8 items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 text-[12px] font-medium text-amber-300 transition-colors hover:bg-amber-500/15"
            >
              <Download size={13} />
              Export for the board
            </button>
          </div>
        </Pane>
      </div>
    </Shell>
  );
}
