import type { ProductSecurity } from "@/lib/products";

/**
 * The company-wide four-layer architecture, read for one product: which
 * control each layer contributes here and the OWASP LLM Top 10 risk it closes.
 */
export default function ProductSecurityArchitecture({ security }: { security: ProductSecurity }) {
  return (
    <div className="mt-10">
      <ol className="cells cells-4">
        {security.layers.map((l, i) => (
          <li key={l.layer} className="cell flex flex-col gap-3">
            <p className="label flex items-center gap-2">
              <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span>{l.layer}</span>
            </p>
            <p className="text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] text-foreground">{l.control}</p>
            <p className="cell-body text-[14px] leading-relaxed">{l.detail}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {l.closes.map((c) => (
                <li key={c} className="rounded-full border border-[var(--line-strong)] bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {c}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
