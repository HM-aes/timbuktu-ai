"use client";

import { motion } from "motion/react";
import { FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pane, PreviewWindow, rise, Tag } from "@/components/products/dashboards/preview";

const DOCUMENTS = ["NIS2 Policy.pdf", "Supplier Contract.pdf", "Security Report.pdf", "Incident Response.pdf"] as const;

/** Each numbered marker in the answer points at the source card with the same number. */
const SOURCES = [
  {
    n: 1,
    file: "NIS2 Policy.pdf",
    page: "Page 42",
    passage: "Suppliers are assessed for security risk before onboarding and reviewed annually.",
  },
  {
    n: 2,
    file: "Supplier Contract.pdf",
    page: "Page 18",
    passage: "The supplier shall maintain the security controls set out in Schedule 4.",
  },
] as const;

// Motion interpolates concrete colours, not CSS variables: hairline and a soft amber.
const LINE = "rgba(250, 250, 250, 0.1)";
const CITED = "rgba(232, 128, 36, 0.55)";

function Marker({ n }: { n: number }) {
  return (
    <span className="mx-0.5 inline-grid size-[1.15rem] -translate-y-px place-items-center rounded-[4px] border border-signal/40 bg-signal/10 align-middle font-mono text-[9.5px] text-signal">
      {n}
    </span>
  );
}

export default function DocSensePreview() {
  return (
    <PreviewWindow
      product="DocSense"
      label="DocSense interface preview: the question 'What are our supplier security obligations?' is answered with two numbered citations, each linked to the exact page in the source document."
    >
      {/* The question */}
      <motion.div
        variants={rise}
        className="flex items-center gap-2.5 rounded-[10px] border border-[var(--line-strong)] bg-background/40 px-3.5 py-2.5"
      >
        <Search size={14} className="shrink-0 text-muted-foreground" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-[13px] text-foreground/90">
          What are our supplier security obligations?
        </span>
        <span className="hidden rounded-md border border-[var(--line)] px-2 py-0.5 text-[11px] text-muted-foreground sm:inline">
          Ask
        </span>
      </motion.div>

      <div className="mt-2.5 grid gap-2.5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.45fr)_minmax(0,1fr)]">
        {/* Documents in scope */}
        <Pane title="Documents" className="hidden md:flex">
          <ul className="py-1">
            {DOCUMENTS.map((d) => {
              const cited = SOURCES.some((s) => s.file === d);
              return (
                <motion.li key={d} variants={rise} className="flex items-start gap-2 px-3 py-1.5">
                  <FileText size={13} className={cn("mt-px shrink-0", cited ? "text-signal" : "text-muted-foreground/70")} aria-hidden />
                  <span className={cn("min-w-0 break-words text-[11.5px] leading-snug", cited ? "text-foreground/90" : "text-muted-foreground")}>
                    {d}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Pane>

        {/* The answer */}
        <Pane title="Answer" aside={<Tag className="border-verify/40 text-verify">Source-backed</Tag>} bodyClassName="px-3.5 py-3">
          <motion.p variants={rise} className="text-[13px] leading-relaxed text-foreground/90">
            Supplier security requirements are defined in Article 21. Suppliers must be assessed for security
            risk before onboarding
            <Marker n={1} />, and the agreed controls are written into each supplier contract
            <Marker n={2} />.
          </motion.p>
          <motion.p variants={rise} className="mt-3 border-t border-[var(--line)] pt-2.5 text-[11px] text-muted-foreground">
            2 source passages · 4 documents searched
          </motion.p>
        </Pane>

        {/* Where it came from */}
        <Pane title="Sources" bodyClassName="flex flex-col gap-2 p-2.5">
          {SOURCES.map((s, i) => (
            <motion.div
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 8, borderColor: LINE },
                show: {
                  opacity: 1,
                  y: 0,
                  borderColor: [LINE, CITED, LINE],
                  transition: { borderColor: { delay: 0.9 + i * 0.35, duration: 1.4 } },
                },
              }}
              className="rounded-[8px] border bg-surface px-3 py-2.5"
            >
              <p className="flex items-center gap-1.5 text-[11.5px] text-foreground/90">
                <Marker n={s.n} />
                <span className="min-w-0 truncate">{s.file}</span>
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">{s.page}</p>
              <p className="mt-1.5 border-l border-signal/40 pl-2 text-[11px] leading-snug text-muted-foreground">
                “{s.passage}”
              </p>
              <p className="mt-1.5 text-[11px] text-foreground/75">View passage →</p>
            </motion.div>
          ))}
        </Pane>
      </div>
    </PreviewWindow>
  );
}
