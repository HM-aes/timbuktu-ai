export default function ProductStackFit({
  headline,
  body,
  points,
}: {
  headline: string;
  body: string;
  points: { label: string; detail: string }[];
}) {
  return (
    <div className="gutter section-block pt-0">
      <div className="section-head max-w-none pb-0 pt-0">
        <h2 className="title text-foreground">{headline}</h2>
        <p className="lede">{body}</p>
      </div>
      <div className="cells cells-3 mt-6 border-t border-[var(--line)]">
        {points.map((p) => (
          <div key={p.label} className="cell">
            <p className="label text-signal">{p.label}</p>
            <p className="cell-body mt-3 text-[15px]">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
