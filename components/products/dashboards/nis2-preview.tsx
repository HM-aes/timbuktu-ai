"use client";

import { motion } from "motion/react";
import { SeverityPill, type Severity } from "@/components/dashboards";
import { Metric, Pane, PreviewWindow, rise, Tag } from "@/components/products/dashboards/preview";

/** Illustrative run — mirrors the NIS2 content used across the site. */
const REQUIREMENTS: { article: string; name: string; severity: Severity }[] = [
  { article: "21(2)(a)", name: "Risk analysis and information security policies", severity: "ok" },
  { article: "21(2)(b)", name: "Incident handling", severity: "high" },
  { article: "21(2)(d)", name: "Supply chain security", severity: "critical" },
  { article: "21(2)(e)", name: "Vulnerability handling and disclosure", severity: "medium" },
  { article: "21(2)(g)", name: "Cyber hygiene and training", severity: "ok" },
];

const COVERAGE = 72;

export default function Nis2Preview() {
  return (
    <PreviewWindow
      product="NIS2 Analyzer"
      meta={<Tag className="hidden sm:inline-flex">EU region</Tag>}
      label="NIS2 Analyzer interface preview: 72% coverage, 34 of 47 requirements met, 13 open gaps including one critical gap in supply chain security."
    >
      <motion.div variants={rise} className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-medium tracking-tight">Compliance overview</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/80">Article 21</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        <Metric label="Coverage" value={`${COVERAGE}%`} detail="34 of 47 requirements" tone="verify">
          <span className="mt-2.5 block h-1 overflow-hidden rounded-full bg-foreground/[0.08]">
            <motion.span
              className="block h-full origin-left rounded-full bg-verify"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: COVERAGE / 100 } }}
              style={{ width: "100%" }}
            />
          </span>
        </Metric>
        <Metric label="Open gaps" value="13" detail="1 critical · 4 high" tone="signal" />
        <Metric label="Documents read" value="38" detail="Mapped to the directive" />
      </div>

      <Pane title="Requirements — Article 21" className="mt-2.5" aside={<Tag>5 of 10</Tag>}>
        <ul>
          {REQUIREMENTS.map((r) => (
            <motion.li
              key={r.article}
              variants={rise}
              className={
                "flex items-center gap-3 border-b border-[var(--line)] px-3.5 py-2.5 last:border-b-0" +
                (r.severity === "critical" ? " bg-critical/[0.05]" : "")
              }
            >
              <span className="hidden w-16 shrink-0 font-mono text-[10.5px] text-muted-foreground/80 sm:block">
                {r.article}
              </span>
              <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-foreground/90">{r.name}</span>
              <SeverityPill s={r.severity} />
            </motion.li>
          ))}
        </ul>
      </Pane>

      <motion.div variants={rise} className="mt-2.5 rounded-[10px] border border-signal/25 bg-signal/[0.05] px-3.5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Board summary</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground/85">
          One critical gap in supplier contracts. Everything else is partial or covered.
        </p>
      </motion.div>
    </PreviewWindow>
  );
}
