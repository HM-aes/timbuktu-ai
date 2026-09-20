"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Check,
  ChevronRight,
  FileText,
  Download,
  Files,
  Gauge,
  History,
  KeyRound,
  LayoutDashboard,
  Minus,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { NOTIFY_URL } from "@/lib/site";

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

type Severity = "critical" | "high" | "medium" | "ok";

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

function SeverityPill({ s }: { s: Severity }) {
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

/* ─────────────────────────────────────────────────────────────────────
   Lex Legal — access decided per document, per person.
──────────────────────────────────────────────────────────────────── */

const LEX_PEOPLE = ["M. Okafor", "S. Rijkaard", "J. Ali"] as const;
const LEX_DOCS = [
  "Engagement letter",
  "Witness statement 3",
  "Settlement draft v4",
  "Client financials",
] as const;

const LEX_INITIAL: Record<string, boolean[]> = {
  "Engagement letter": [true, true, true],
  "Witness statement 3": [true, true, false],
  "Settlement draft v4": [true, false, false],
  "Client financials": [true, false, false],
};

export function LexDashboard() {
  const [grid, setGrid] = useState(LEX_INITIAL);
  const [log, setLog] = useState<string[]>([
    "Granted · S. Rijkaard → Witness statement 3",
    "Revoked · J. Ali → Settlement draft v4",
  ]);

  const toggle = (doc: string, i: number) => {
    const granted = !grid[doc][i];
    setGrid({ ...grid, [doc]: grid[doc].map((v, j) => (j === i ? granted : v)) });
    setLog((l) => [`${granted ? "Granted" : "Revoked"} · ${LEX_PEOPLE[i]} → ${doc}`, ...l].slice(0, 4));
  };

  const openCount = Object.values(grid).flat().filter(Boolean).length;

  return (
    <Shell
      product="Lex Legal"
      title="Matter · Van der Berg v. Holt"
      deployment="air-gapped · on-prem"
      nav={[
        { icon: KeyRound, label: "Access" },
        { icon: Files, label: "Documents" },
        { icon: Users, label: "People" },
        { icon: History, label: "Audit log" },
        { icon: Settings, label: "Settings" },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Documents in matter" value="4" hint="of 212 in the firm" />
        <Kpi label="Open permissions" value={String(openCount)} hint="of 12 possible" tone="signal" />
        <Kpi label="Changes today" value={String(log.length)} hint="all recorded" />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_15rem]">
        <Pane
          title="Who can open what"
          action={
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/70">
              click a cell to change it
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[26rem] border-separate border-spacing-y-1">
              <thead>
                <tr className="text-[11px] text-muted-foreground/80">
                  <th className="pb-1 text-left font-normal">Document</th>
                  {LEX_PEOPLE.map((p) => (
                    <th key={p} className="pb-1 text-center font-normal">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEX_DOCS.map((doc) => (
                  <tr key={doc}>
                    <td className="flex items-center gap-2 py-1.5 pr-3">
                      <FileText size={13} className="text-muted-foreground/70" />
                      <span className="truncate">{doc}</span>
                    </td>
                    {LEX_PEOPLE.map((p, i) => {
                      const on = grid[doc][i];
                      return (
                        <td key={p} className="text-center">
                          <button
                            type="button"
                            onClick={() => toggle(doc, i)}
                            aria-pressed={on}
                            aria-label={`${p}: ${on ? "can open" : "no access to"} ${doc}`}
                            className={cn(
                              "inline-grid size-7 place-items-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                              on
                                ? "border-verify/50 bg-verify/10 text-verify hover:bg-verify/15"
                                : "border-foreground/10 text-foreground/30 hover:border-foreground/25",
                            )}
                          >
                            {on ? <Check size={13} strokeWidth={2.5} /> : <Minus size={13} />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Pane>

        <Pane title="Audit log">
          <ol className="space-y-2 font-mono text-[10.5px] leading-snug tracking-[0.02em]">
            <AnimatePresence initial={false}>
              {log.map((entry, i) => (
                <motion.li
                  key={`${entry}-${log.length - i}`}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "rounded-md border border-foreground/[0.06] px-2.5 py-2",
                    entry.startsWith("Granted") ? "text-verify" : "text-amber-300",
                  )}
                >
                  {entry}
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </Pane>
      </div>
    </Shell>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DocSense — a question in, a sourced answer out.
──────────────────────────────────────────────────────────────────── */

const DOCSENSE_QA = [
  {
    q: "What is the notice period in the supplier agreement?",
    a: "Either party may terminate with 90 days' written notice. Termination for material breach requires 30 days' notice and a chance to remedy.",
    sources: [
      { doc: "Supplier agreement 2025.pdf", page: 14, text: "…this Agreement may be terminated by either party on not less than ninety (90) days' written notice…" },
      { doc: "Supplier agreement 2025.pdf", page: 15, text: "…in the event of a material breach, the non-defaulting party may terminate on thirty (30) days' notice if the breach is not remedied…" },
    ],
  },
  {
    q: "Which contracts renew automatically this quarter?",
    a: "Two: the cloud hosting agreement (renews 1 November) and the payroll services contract (renews 15 December). Both can be cancelled up to 60 days before renewal.",
    sources: [
      { doc: "Hosting MSA.pdf", page: 3, text: "…shall automatically renew for successive twelve (12) month terms on 1 November unless notice is given sixty (60) days prior…" },
      { doc: "Payroll services.pdf", page: 7, text: "…renews on 15 December of each year absent written notice not later than sixty (60) days before…" },
    ],
  },
  {
    q: "Who is the data protection officer named in our policies?",
    a: "The Information Security Policy names the Head of Legal as the data protection officer, with a deputy in Operations.",
    sources: [
      { doc: "Information security policy v3.2.pdf", page: 2, text: "…the Head of Legal is appointed Data Protection Officer and may be reached at the address below…" },
    ],
  },
];

export function DocSenseDashboard() {
  const [qi, setQi] = useState(0);
  const [si, setSi] = useState(0);
  const qa = DOCSENSE_QA[qi];
  const src = qa.sources[Math.min(si, qa.sources.length - 1)];

  return (
    <Shell
      product="DocSense"
      title="Ask your documents"
      deployment="hosted · your tenant"
      nav={[
        { icon: Search, label: "Ask" },
        { icon: Files, label: "Library" },
        { icon: History, label: "History" },
        { icon: Settings, label: "Settings" },
      ]}
    >
      <div className="flex h-9 items-center gap-3 rounded-xl border border-foreground/[0.09] bg-background/50 px-3.5">
        <Search size={14} className="text-muted-foreground/70" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={qa.q}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="min-w-0 flex-1 truncate text-[13px]"
          >
            {qa.q}
          </motion.span>
        </AnimatePresence>
        <span className="rounded-md bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
          Ask
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {DOCSENSE_QA.map((item, i) => (
          <button
            key={item.q}
            type="button"
            onClick={() => {
              setQi(i);
              setSi(0);
            }}
            aria-pressed={i === qi}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              i === qi
                ? "border-amber-400/50 bg-amber-400/10 text-amber-200"
                : "border-foreground/10 text-muted-foreground hover:border-foreground/25 hover:text-foreground",
            )}
          >
            {item.q}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_17rem]">
        <Pane title="Answer">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={qa.q}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="max-w-[40rem] text-[13.5px] leading-relaxed">{qa.a}</p>
              <p className="mt-4 text-[11px] text-muted-foreground/80">Sources</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {qa.sources.map((s, i) => (
                  <button
                    key={`${s.doc}-${s.page}`}
                    type="button"
                    onClick={() => setSi(i)}
                    aria-pressed={i === si}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                      i === si
                        ? "border-verify/50 bg-verify/10 text-verify"
                        : "border-foreground/10 text-muted-foreground hover:border-foreground/25",
                    )}
                  >
                    <FileText size={11} />
                    {s.doc} · p.{s.page}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Pane>

        <Pane title="Passage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={`${src.doc}-${src.page}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l-2 border-verify/60 pl-3 text-[12px] leading-relaxed text-muted-foreground"
            >
              {src.text}
              <footer className="mt-2 font-mono text-[10px] text-muted-foreground/70">
                {src.doc} · page {src.page}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </Pane>
      </div>
    </Shell>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TankSlim — in development. A quiet placeholder, not a fake product.
──────────────────────────────────────────────────────────────────── */

const TANK_BARS = [62, 58, 71, 66, 74, 69, 80, 77, 84, 88, 91, 95];

export function TankSlimDashboard() {
  return (
    <Shell
      product="TankSlim"
      title="Monthly cost"
      deployment="in development"
      nav={[
        { icon: Gauge, label: "Overview" },
        { icon: History, label: "History" },
        { icon: Settings, label: "Settings" },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Spend this month" value="— —" hint="connect a source" />
        <Kpi label="Better option found" value="—" hint="waiting for data" />
        <Kpi label="Estimated saving" value="—" hint="waiting for data" />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_15rem]">
        <Pane title="Cost, last 12 months">
          <div className="flex h-40 items-end gap-1.5 px-1">
            {TANK_BARS.map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm",
                  i === TANK_BARS.length - 1
                    ? "bg-amber-400/70"
                    : "bg-foreground/[0.08]",
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground/60">
            <span>Oct</span>
            <span>Mar</span>
            <span>Sep</span>
          </div>
        </Pane>

        <Pane title="Status">
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            TankSlim targets a recurring cost most operations absorb without questioning. Full details at launch.
          </p>
          <a
            href={NOTIFY_URL}
            className="mt-4 inline-flex h-8 items-center gap-2 rounded-lg border border-foreground/15 px-3 text-[12px] font-medium text-foreground transition-colors hover:border-foreground/30"
          >
            <Bell size={13} />
            Get notified
          </a>
        </Pane>
      </div>
    </Shell>
  );
}
