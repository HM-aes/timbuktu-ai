"use client";

import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pane, PreviewWindow, rise, Tag } from "@/components/products/dashboards/preview";

const TABS = ["Documents", "Access", "People", "Audit log"] as const;

const DOCUMENTS = [
  { name: "Client Agreement.pdf", people: ["SC", "JM"], note: "2 of 3 people" },
  { name: "Merger Review.pdf", people: ["SC"], note: "Owner only" },
  { name: "Employment Contract.pdf", people: ["SC", "JM"], note: "2 people" },
  { name: "Due Diligence.pdf", people: ["SC", "JM", "JA"], note: "3 people" },
] as const;

type Level = "owner" | "edit" | "none";

const ACCESS: { name: string; initials: string; role: string; level: Level }[] = [
  { name: "Sarah Chen", initials: "SC", role: "Partner", level: "owner" },
  { name: "James Miller", initials: "JM", role: "Associate", level: "edit" },
  { name: "Junior Associate", initials: "JA", role: "Associate", level: "none" },
];

const AUDIT = [
  { time: "09:12", text: "Sarah Chen granted access" },
  { time: "10:47", text: "James Miller access changed to edit" },
  { time: "11:03", text: "Junior Associate access revoked" },
] as const;

function Avatar({ initials, muted = false }: { initials: string; muted?: boolean }) {
  return (
    <span
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full border border-surface text-[9.5px] font-medium",
        muted ? "bg-foreground/[0.06] text-muted-foreground" : "bg-foreground/[0.12] text-foreground",
      )}
    >
      {initials}
    </span>
  );
}

const LEVEL_STYLE: Record<Level, string> = {
  owner: "border-verify/40 bg-verify/10 text-verify",
  edit: "border-[var(--line-strong)] text-foreground/85",
  none: "border-critical/40 bg-critical/10 text-critical",
};
const LEVEL_LABEL: Record<Level, string> = { owner: "Owner", edit: "Can edit", none: "No access" };

/** The revoked row changes state after the pane settles: can view → no access. */
function AccessLevel({ level }: { level: Level }) {
  const pill = "rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em]";
  if (level !== "none") return <span className={cn(pill, LEVEL_STYLE[level])}>{LEVEL_LABEL[level]}</span>;
  return (
    <span className="relative inline-grid">
      <motion.span
        className={cn(pill, "col-start-1 row-start-1 border-[var(--line-strong)] text-foreground/85")}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 0, transition: { delay: 1.1, duration: 0.4 } } }}
      >
        Can view
      </motion.span>
      <motion.span
        className={cn(pill, "col-start-1 row-start-1", LEVEL_STYLE.none)}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.1, duration: 0.4 } } }}
      >
        No access
      </motion.span>
    </span>
  );
}

export default function LexLegalPreview() {
  return (
    <PreviewWindow
      product="Lex Legal"
      label="Lex Legal interface preview: access to Client Agreement.pdf is set per person — Sarah Chen owner, James Miller can edit, Junior Associate has no access — with every change in the audit log."
    >
      {/* App tabs + the matter these files belong to */}
      <motion.div variants={rise} className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-md px-2.5 py-1 text-[12px]",
                i === 0 ? "bg-foreground/[0.07] text-foreground" : "text-muted-foreground",
                i === 2 && "hidden sm:inline",
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <Tag>Matter · Project Atlas</Tag>
      </motion.div>

      <div className="grid gap-2.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Pane
          title="Documents"
          aside={<span className="text-[11px] text-muted-foreground">Access set per file</span>}
          bodyClassName="flex flex-col"
        >
          <ul>
            {DOCUMENTS.map((d, i) => (
              <motion.li
                key={d.name}
                variants={rise}
                className={cn(
                  "relative flex items-center gap-3 border-b border-[var(--line)] px-3.5 py-2.5 last:border-b-0",
                  i === 0 && "bg-foreground/[0.04]",
                )}
              >
                {i === 0 && <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-signal" />}
                <FileText size={14} className="shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] text-foreground/90">{d.name}</span>
                  <span className="block text-[11px] text-muted-foreground/80">{d.note}</span>
                </span>
                <span className="flex -space-x-1.5">
                  {d.people.map((p) => (
                    <Avatar key={p} initials={p} />
                  ))}
                </span>
              </motion.li>
            ))}
          </ul>
          <motion.p
            variants={rise}
            className="mt-auto border-t border-[var(--line)] px-3.5 py-2.5 text-[11px] leading-snug text-muted-foreground"
          >
            Everyone on the matter sees only the files they have been granted.
          </motion.p>
        </Pane>

        <div className="flex min-w-0 flex-col gap-2.5">
          <Pane title="Document access · Client Agreement.pdf">
            <ul>
              {ACCESS.map((a) => (
                <motion.li
                  key={a.name}
                  variants={rise}
                  className="flex items-center gap-3 border-b border-[var(--line)] px-3.5 py-2.5 last:border-b-0"
                >
                  <Avatar initials={a.initials} muted={a.level === "none"} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] text-foreground/90">{a.name}</span>
                    <span className="block text-[11px] text-muted-foreground/80">{a.role}</span>
                  </span>
                  <AccessLevel level={a.level} />
                </motion.li>
              ))}
            </ul>
            <motion.div variants={rise} className="flex flex-wrap gap-1.5 border-t border-[var(--line)] px-3.5 py-2.5">
              {["Grant access", "Restrict", "Revoke"].map((action, i) => (
                <span
                  key={action}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11.5px]",
                    i === 0 ? "border-signal/40 bg-signal/10 text-signal" : "border-[var(--line)] text-foreground/80",
                  )}
                >
                  {action}
                </span>
              ))}
            </motion.div>
          </Pane>

          <Pane title="Audit log">
            <ul className="px-3.5 py-1.5">
              {AUDIT.map((e) => (
                <motion.li key={e.time} variants={rise} className="flex items-baseline gap-3 py-1">
                  <span className="font-mono text-[10.5px] text-muted-foreground/80">{e.time}</span>
                  <span className="min-w-0 truncate text-[12px] text-foreground/85">{e.text}</span>
                </motion.li>
              ))}
            </ul>
          </Pane>
        </div>
      </div>
    </PreviewWindow>
  );
}
