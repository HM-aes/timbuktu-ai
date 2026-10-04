"use client";

import { motion } from "motion/react";
import { Check, FileText, Lock, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Metric, Pane, PreviewWindow, rise, Tag } from "@/components/products/dashboards/preview";

/** Illustrative data — one question followed through the pipeline. */

const INCOMING = [
  { file: "Supplier Contract — Sahel Logistics.pdf", label: "Confidential" },
  { file: "Board Minutes Q3.docx", label: "Restricted" },
  { file: "NIS2 Policy v4.pdf", label: "Internal" },
  { file: "Incident Report 2026-118.pdf", label: "Confidential" },
] as const;

const ACCESS = [
  { file: "NIS2 Policy v4.pdf", rule: "Internal · all staff", allowed: true },
  { file: "Supplier Contract — Sahel Logistics.pdf", rule: "Legal team", allowed: true },
  { file: "Board Minutes Q3.docx", rule: "Board only", allowed: false },
  { file: "M&A Term Sheet.pdf", rule: "Named individuals", allowed: false },
] as const;

const AUDIT = [
  { t: "09:41:07.112", event: "Query received", who: "A. Diallo", tone: "default" },
  { t: "09:41:07.130", event: "Access policy evaluated — 2 documents withheld", who: "Policy engine", tone: "signal" },
  { t: "09:41:07.402", event: "3 passages retrieved from 2 documents", who: "Retriever", tone: "default" },
  { t: "09:41:08.951", event: "Answer delivered with 2 citations", who: "Model · on-prem", tone: "verify" },
  { t: "09:41:08.960", event: "Record sealed — SHA-256 3f9a…c21e", who: "Audit", tone: "default" },
] as const;

function Marker({ n }: { n: number }) {
  return (
    <span className="mx-0.5 inline-grid size-[1.15rem] -translate-y-px place-items-center rounded-[4px] border border-signal/40 bg-signal/10 align-middle font-mono text-[9.5px] text-signal">
      {n}
    </span>
  );
}

function Heading({ title, meta }: { title: string; meta: string }) {
  return (
    <motion.div variants={rise} className="mb-3 flex items-baseline justify-between gap-3">
      <p className="text-[15px] font-medium tracking-tight">{title}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/80">{meta}</p>
    </motion.div>
  );
}

export function IngestCard() {
  return (
    <PreviewWindow
      product="DocSense"
      meta={<Tag className="hidden sm:inline-flex">Private deployment</Tag>}
      label="Ingestion view: 1,284 documents indexed and classified inside the customer's own environment, with nothing sent to third parties."
    >
      <Heading title="Ingestion" meta="Your environment" />
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        <Metric label="Documents indexed" value="1,284" detail="PDF, Word, email" />
        <Metric label="Classified" value="100%" detail="Labelled on arrival" tone="verify" />
        <Metric label="Sent to third parties" value="0" detail="Stays on your network" tone="signal" />
      </div>
      <Pane title="Incoming — last 24 hours" className="mt-2.5" aside={<Tag>Encrypted at rest</Tag>}>
        <ul>
          {INCOMING.map((d) => (
            <motion.li
              key={d.file}
              variants={rise}
              className="flex items-center gap-3 border-b border-[var(--line)] px-3.5 py-2.5 last:border-b-0"
            >
              <FileText size={13} className="shrink-0 text-muted-foreground/70" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground/90">{d.file}</span>
              <Tag className="hidden sm:inline-flex">{d.label}</Tag>
              <span className="flex shrink-0 items-center gap-1 text-[11px] text-verify">
                <Check size={12} aria-hidden />
                Indexed
              </span>
            </motion.li>
          ))}
        </ul>
      </Pane>
    </PreviewWindow>
  );
}

export function AccessCard() {
  return (
    <PreviewWindow
      product="DocSense"
      meta={<Tag className="hidden sm:inline-flex">Policy engine</Tag>}
      label="Access check: before retrieval, four candidate documents are checked against the person asking. Two are allowed, two are withheld from the model."
    >
      <Heading title="Access check" meta="Before retrieval" />
      <motion.div
        variants={rise}
        className="flex items-center gap-3 rounded-[10px] border border-[var(--line)] bg-background/40 px-3.5 py-3"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] font-mono text-[11px]">
          AD
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] text-foreground/90">Aminata Diallo</span>
          <span className="block truncate text-[11px] text-muted-foreground">Legal counsel · Bamako office</span>
        </span>
        <Tag className="border-signal/35 text-signal">Clearance: Confidential</Tag>
      </motion.div>

      <Pane title="Candidate documents" className="mt-2.5" aside={<Tag>2 of 4 allowed</Tag>}>
        <ul>
          {ACCESS.map((d) => (
            <motion.li
              key={d.file}
              variants={rise}
              className={cn(
                "flex items-center gap-3 border-b border-[var(--line)] px-3.5 py-2.5 last:border-b-0",
                !d.allowed && "bg-critical/[0.05]",
              )}
            >
              {d.allowed ? (
                <FileText size={13} className="shrink-0 text-muted-foreground/70" aria-hidden />
              ) : (
                <Lock size={13} className="shrink-0 text-critical" aria-hidden />
              )}
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground/90">{d.file}</span>
              <span className="hidden w-32 shrink-0 truncate text-[11px] text-muted-foreground sm:block">{d.rule}</span>
              <span
                className={cn(
                  "flex w-[4.75rem] shrink-0 items-center justify-end gap-1 text-[11px]",
                  d.allowed ? "text-verify" : "text-critical",
                )}
              >
                {d.allowed ? <Check size={12} aria-hidden /> : <X size={12} aria-hidden />}
                {d.allowed ? "Allowed" : "Withheld"}
              </span>
            </motion.li>
          ))}
        </ul>
      </Pane>

      <motion.div variants={rise} className="mt-2.5 rounded-[10px] border border-signal/25 bg-signal/[0.05] px-3.5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Enforced</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground/85">
          Withheld documents are never retrieved, so the model cannot quote what this person may not read.
        </p>
      </motion.div>
    </PreviewWindow>
  );
}

export function AnswerCard() {
  return (
    <PreviewWindow
      product="DocSense"
      meta={<Tag className="hidden sm:inline-flex">Model on-premise</Tag>}
      label="Answer view: the question about supplier breach notification is answered from the permitted documents only, with two numbered citations."
    >
      <motion.div
        variants={rise}
        className="flex items-center gap-2.5 rounded-[10px] border border-[var(--line-strong)] bg-background/40 px-3.5 py-2.5"
      >
        <Search size={14} className="shrink-0 text-muted-foreground" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-[13px] text-foreground/90">
          How fast must our supplier report a breach to us?
        </span>
      </motion.div>

      <div className="mt-2.5 grid gap-2.5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Pane title="Answer" aside={<Tag className="border-verify/40 text-verify">Source-backed</Tag>} bodyClassName="px-3.5 py-3">
          <motion.p variants={rise} className="text-[13px] leading-relaxed text-foreground/90">
            Within 24 hours of becoming aware of it
            <Marker n={1} />. The notice must describe the affected systems and the measures taken, and our own
            policy requires escalation to the security lead the same day
            <Marker n={2} />.
          </motion.p>
          <motion.p variants={rise} className="mt-3 border-t border-[var(--line)] pt-2.5 text-[11px] text-muted-foreground">
            Answered from 2 permitted documents · 2 withheld
          </motion.p>
        </Pane>

        <Pane title="Sources" bodyClassName="flex flex-col gap-2 p-2.5">
          {[
            { n: 1, file: "Supplier Contract — Sahel Logistics.pdf", page: "Clause 14.2" },
            { n: 2, file: "NIS2 Policy v4.pdf", page: "Page 31" },
          ].map((s) => (
            <motion.div key={s.n} variants={rise} className="rounded-[8px] border border-[var(--line)] bg-surface px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-[11.5px] text-foreground/90">
                <Marker n={s.n} />
                <span className="min-w-0 truncate">{s.file}</span>
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">{s.page}</p>
            </motion.div>
          ))}
          <Metric label="Grounding" value="98%" detail="Claims matched to a passage" tone="verify" className="bg-surface" />
        </Pane>
      </div>
    </PreviewWindow>
  );
}

export function AuditCard() {
  return (
    <PreviewWindow
      product="DocSense"
      meta={<Tag className="hidden sm:inline-flex">Audit trail</Tag>}
      label="Audit view: every step of the query — received, access evaluated, passages retrieved, answer delivered — is logged with a timestamp and sealed with a hash."
    >
      <Heading title="Audit trail" meta="Query 7f3c-0921" />
      <Pane title="Events" aside={<Tag className="border-verify/40 text-verify">Tamper-evident</Tag>}>
        <ol>
          {AUDIT.map((e) => (
            <motion.li
              key={e.t}
              variants={rise}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-0.5 border-b border-[var(--line)] px-3.5 py-2.5 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
            >
              <span className="font-mono text-[10.5px] text-muted-foreground/80">{e.t}</span>
              <span
                className={cn(
                  "min-w-0 text-[12.5px] leading-snug text-foreground/90",
                  e.tone === "signal" && "text-signal",
                  e.tone === "verify" && "text-verify",
                )}
              >
                {e.event}
              </span>
              <span className="col-start-2 text-[11px] text-muted-foreground sm:col-start-3">{e.who}</span>
            </motion.li>
          ))}
        </ol>
      </Pane>
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:gap-2.5">
        <Metric label="Retention" value="7 years" detail="Configurable per policy" />
        <Metric label="Events this month" value="18,402" detail="Exportable for auditors" tone="signal" />
      </div>
    </PreviewWindow>
  );
}
