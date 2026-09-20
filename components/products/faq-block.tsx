export default function FaqBlock({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="gutter section-block">
      <h2 className="title max-w-[20ch] text-foreground">Questions buyers ask</h2>
      <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((item) => (
          <div key={item.question} className="grid gap-x-6 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:py-6">
            <dt className="cell-title text-foreground">{item.question}</dt>
            <dd className="cell-body text-[15px]">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
