import { cn } from "@/lib/utils";

export function StandardsStrip({ labelClassName }: { labelClassName?: string }) {
  return (
    <>
      <p className={cn("standards-label shrink-0", labelClassName)}>
        <span className="standards-label-mark" aria-hidden />
        Aligned to
      </p>
      <StandardsTagList />
    </>
  );
}

const STANDARDS = [
  { name: "OWASP LLM Top 10", accent: "signal" },
  { name: "OWASP Agentic Top 10", accent: "verify" },
  { name: "MCP human-in-the-loop spec", accent: "secondary" },
] as const;

const ACCENT_CLASS = {
  signal: "pill--accent-signal",
  verify: "pill--accent-verify",
  secondary: "pill--accent-secondary",
} as const;

export default function StandardsTagList({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {STANDARDS.map(({ name, accent }) => (
        <li key={name} className={cn("pill pill--tag", ACCENT_CLASS[accent])}>
          {name}
        </li>
      ))}
    </ul>
  );
}
