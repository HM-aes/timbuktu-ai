"use client";

import { motion } from "motion/react";
import { Clock3 } from "lucide-react";
import { Metric, Pane, PreviewWindow, rise, Tag } from "@/components/products/dashboards/preview";

/** Illustrative only — TankSlim is in development; nothing here is live data. */
const TREND = [62, 58, 71, 66, 74, 69, 80, 77, 84, 88, 91, 95];
const BREAKDOWN = [
  { label: "Fuel", share: 46 },
  { label: "Maintenance", share: 24 },
  { label: "Operations", share: 19 },
  { label: "Idle time", share: 11 },
] as const;

export default function TankSlimPreview() {
  return (
    <PreviewWindow
      product="TankSlim"
      meta={
        <Tag className="hidden sm:inline-flex">
          <Clock3 size={10} aria-hidden />
          Coming soon
        </Tag>
      }
      label="TankSlim interface preview, in development: an operational cost view with illustrative figures. The product is not live yet."
    >
      <motion.div variants={rise} className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-medium tracking-tight">Operational cost intelligence</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/80">Illustrative</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        <Metric label="Current cost" value="€48,200" detail="per year" />
        <Metric label="Potential optimisation" value="12%" detail="estimated" tone="signal" />
      </div>

      {/* Not built yet: shown muted and out of focus, with the honest label on top */}
      <div className="relative mt-2.5">
        <div aria-hidden className="grid gap-2.5 opacity-60 blur-[2px] sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Pane title="Monthly trend" bodyClassName="flex h-28 items-end gap-1.5 px-3.5 pb-3 pt-4">
            {TREND.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[3px] bg-foreground/15" style={{ height: `${h}%` }} />
            ))}
          </Pane>
          <Pane title="Cost breakdown" bodyClassName="space-y-2 px-3.5 py-3">
            {BREAKDOWN.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-[11.5px] text-foreground/80">
                  <span>{b.label}</span>
                  <span className="font-mono text-[10.5px] text-muted-foreground">{b.share}%</span>
                </div>
                <span className="mt-1 block h-1 rounded-full bg-foreground/[0.08]">
                  <span className="block h-full rounded-full bg-foreground/25" style={{ width: `${b.share * 2}%` }} />
                </span>
              </div>
            ))}
          </Pane>
        </div>

        <motion.div variants={rise} className="absolute inset-0 grid place-items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface/90 px-3.5 py-1.5 text-[12.5px] text-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground" aria-hidden />
            In development
          </span>
        </motion.div>
      </div>

      <motion.p variants={rise} className="mt-2.5 text-[11px] text-muted-foreground">
        Interface preview — product in development. Figures are illustrative.
      </motion.p>
    </PreviewWindow>
  );
}
