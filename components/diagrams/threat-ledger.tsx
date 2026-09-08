"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

/* OWASP Top 10 for LLM Applications (2025) — each risk, and the control
   that is designed in before the first line of application code. */
export const THREATS = [
  {
    id: "LLM01",
    threat: "Prompt injection",
    control: "Typed input schema (Pydantic), an injection classifier (scikit-learn) ahead of the model, tools on an allow-list.",
  },
  {
    id: "LLM02",
    threat: "Sensitive information disclosure",
    control: "Retrieval filtered by document-level ACL at query time (Qdrant payload filters); output redaction before return.",
  },
  {
    id: "LLM03",
    threat: "Supply chain",
    control: "Pinned, hash-verified dependencies; no third-party model calls in air-gapped deployments.",
  },
  {
    id: "LLM04",
    threat: "Data and model poisoning",
    control: "Ingestion is a signed pipeline; every chunk keeps its source, owner and version.",
  },
  {
    id: "LLM05",
    threat: "Improper output handling",
    control: "Model output is validated against a schema; raw text never reaches a downstream system.",
  },
  {
    id: "LLM06",
    threat: "Excessive agency",
    control: "Agents hold scoped credentials; write actions require an explicit approval step.",
  },
  {
    id: "LLM07",
    threat: "System prompt leakage",
    control: "No secrets or policy in the prompt — configuration lives in Django settings and permissions.",
  },
  {
    id: "LLM08",
    threat: "Vector and embedding weaknesses",
    control: "Collections scoped per tenant; the same permissions as the file system apply to every search.",
  },
  {
    id: "LLM09",
    threat: "Misinformation",
    control: "Every answer cites the passage it came from; unsupported claims are marked as such.",
  },
  {
    id: "LLM10",
    threat: "Unbounded consumption",
    control: "Per-user rate limits and token budgets via Django throttling; cost is bounded by design.",
  },
] as const;

export default function ThreatLedger() {
  const reduced = useReducedMotionSafe();

  return (
    <ol className="divide-y divide-foreground/[0.06]">
      {THREATS.map((t, i) => (
        <motion.li
          key={t.id}
          initial={{ opacity: 0, x: 12 }}
          animate={reduced ? { opacity: 1, x: 0 } : undefined}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={reduced ? INSTANT : { duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="group/row grid grid-cols-[3.4rem_1fr_auto] items-start gap-x-4 px-5 py-3.5 transition-colors duration-300 hover:bg-foreground/[0.025] sm:px-6"
        >
          <span className="pt-0.5 font-mono text-[10.5px] tracking-[0.08em] text-amber-400/90">
            {t.id}
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] font-normal leading-snug text-foreground">
              {t.threat}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover/row:text-foreground/85">
              {t.control}
            </p>
          </div>
          <motion.span
            aria-label="control in place"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={reduced ? { scale: 1, opacity: 1 } : undefined}
            whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={reduced ? INSTANT : { duration: 0.4, delay: i * 0.05 + 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-0.5 grid size-5 place-items-center rounded-full border border-verify/50 bg-verify/10 text-verify"
          >
            <Check size={11} strokeWidth={2.75} />
          </motion.span>
        </motion.li>
      ))}
    </ol>
  );
}
