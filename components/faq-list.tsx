import { Plus } from "lucide-react";

export type FaqItem = { question: string; answer: string };

/**
 * Plain disclosure list. Native <details> so it works without JavaScript and
 * reads correctly to assistive tech; the rule-and-cell styling matches the
 * rest of the page.
 */
export default function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <dl className={className}>
      {items.map((f) => (
        <details key={f.question} className="faq group border-t border-[var(--line)] last:border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <dt className="text-[1.0625rem] font-medium tracking-[-0.01em] text-foreground">{f.question}</dt>
            <Plus
              size={16}
              aria-hidden
              className="shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-signal"
            />
          </summary>
          <dd className="cell-body max-w-[60ch] pb-6 text-[15px] leading-relaxed">{f.answer}</dd>
        </details>
      ))}
    </dl>
  );
}
