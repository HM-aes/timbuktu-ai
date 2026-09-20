import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] text-signal" aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" {...STROKE} />
    </svg>
  );
}

function IconKey() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] text-signal" aria-hidden>
      <circle cx="8" cy="15" r="4" {...STROKE} />
      <path d="M10.8 12.2 20 3" {...STROKE} />
      <path d="m16.5 6.5 2 2M14.5 8.5l1.6 1.6" {...STROKE} />
    </svg>
  );
}

function IconPersonCheck() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] text-signal" aria-hidden>
      <circle cx="9" cy="8" r="3.2" {...STROKE} />
      <path d="M3.8 20c0-3 2.3-5.2 5.2-5.2 1 0 1.9.25 2.7.7" {...STROKE} />
      <path d="m14.5 15.5 2 2 4-4.2" {...STROKE} />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] text-signal" aria-hidden>
      <path d="M12 4 21 19H3L12 4z" {...STROKE} />
      <path d="M12 10v4.5" {...STROKE} />
      <path d="M12 17.5h.01" {...STROKE} />
    </svg>
  );
}

const ICONS = {
  shield: IconShield,
  key: IconKey,
  person: IconPersonCheck,
  alert: IconAlert,
} as const;

export type SecurityControlIcon = keyof typeof ICONS;

export default function SecurityControlCard({
  icon,
  title,
  label,
  body,
  className,
}: {
  icon: SecurityControlIcon;
  title: string;
  label: string;
  body: string;
  className?: string;
}) {
  const Icon = ICONS[icon];

  return (
    <article
      className={cn(
        "group/card flex min-w-0 flex-col rounded-[var(--radius-panel)] border border-[var(--line)] bg-surface p-[var(--space-cell-md)] transition-[border-color,background-color] duration-200 motion-reduce:transition-none hover:border-[var(--line-strong)] sm:p-[1.875rem]",
        className
      )}
    >
      <div
        className={cn(
          "grid size-[46px] shrink-0 place-items-center rounded-[var(--radius-control)] border border-[var(--line)] transition-colors duration-200 motion-reduce:transition-none group-hover/card:border-signal/35 group-hover/card:bg-signal/5"
        )}
      >
        <Icon />
      </div>
      <h3 className="cell-title mt-5 text-foreground">{title}</h3>
      <p className="label mt-2 text-signal">{label}</p>
      <p className="cell-body mt-3 text-[0.94rem] leading-[1.6]">{body}</p>
    </article>
  );
}

export function SecurityControlCardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[70rem] grid-cols-1 gap-[18px] min-[720px]:grid-cols-2">
      {children}
    </div>
  );
}
