export default function RiskDesignProof({
  risk,
  design,
  proof,
}: {
  risk: string;
  design: string;
  proof: string;
}) {
  const blocks = [
    { label: "Risk", body: risk },
    { label: "Design", body: design },
    { label: "Proof", body: proof },
  ];

  return (
    <div className="gutter section-block pt-0">
      <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {blocks.map((b) => (
          <div key={b.label} className="grid gap-x-6 gap-y-1.5 py-5 sm:grid-cols-[6.5rem_1fr] lg:py-6">
            <dt className="label pt-1">{b.label}</dt>
            <dd className="cell-body max-w-[40rem] text-[15px] sm:text-base">{b.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
