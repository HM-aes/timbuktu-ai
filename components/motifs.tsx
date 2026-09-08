/* Ambient per-product SVG motifs. CSS-animated; the global
   prefers-reduced-motion rule freezes them. Colour comes from the
   parent via `currentColor` + the amber --signal token. */

export type MotifKind = "audit" | "tree" | "chart" | "query" | "vault";

export function Motif({ kind }: { kind: MotifKind }) {
  const stroke = "currentColor";
  const common =
    "motif h-full w-full text-foreground/[0.28] transition-colors duration-500 group-hover/card:text-foreground/[0.42]";

  if (kind === "audit") {
    const rows = [16, 30, 44, 58, 72, 86, 100, 114];
    return (
      <svg
        viewBox="0 0 240 140"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={common}
        aria-hidden
      >
        {rows.map((y, i) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2={i % 3 === 0 ? 150 : i % 3 === 1 ? 200 : 120}
            y2={y}
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
        <rect x="186" y="40" width="7" height="7" rx="1.5" fill="var(--signal)" />
        <rect x="186" y="82" width="7" height="7" rx="1.5" fill="var(--signal)" />
        <g style={{ animation: "bento-scan 4.5s ease-in-out infinite" }}>
          <rect x="12" y="0" width="216" height="18" rx="4" fill="var(--signal)" opacity="0.14" />
          <line x1="12" y1="9" x2="228" y2="9" stroke="var(--signal)" strokeWidth="1.5" opacity="0.6" />
        </g>
      </svg>
    );
  }

  if (kind === "tree") {
    return (
      <svg
        viewBox="0 0 240 130"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={common}
        aria-hidden
        style={{ animation: "bento-drift 7s ease-in-out infinite" }}
      >
        <rect x="20" y="54" width="34" height="22" rx="5" stroke={stroke} strokeWidth="2" />
        <path d="M54 65 H84" stroke={stroke} strokeWidth="2" />
        <path d="M84 65 V30 M84 65 V100 M84 30 H112 M84 100 H112" stroke={stroke} strokeWidth="2" />
        <rect x="112" y="18" width="42" height="24" rx="5" stroke={stroke} strokeWidth="2" />
        <rect x="112" y="88" width="42" height="24" rx="5" stroke="var(--signal)" strokeWidth="2" />
        <path d="M154 100 H182" stroke="var(--signal)" strokeWidth="2" />
        <circle cx="188" cy="100" r="4" fill="var(--signal)" />
      </svg>
    );
  }

  if (kind === "query") {
    return (
      <svg
        viewBox="0 0 240 130"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={common}
        aria-hidden
      >
        {/* stacked documents */}
        <rect x="18" y="16" width="70" height="92" rx="6" stroke={stroke} strokeWidth="2" />
        <rect x="30" y="26" width="70" height="92" rx="6" stroke={stroke} strokeWidth="2" />
        {[42, 54, 66, 78, 90].map((y) => (
          <line key={y} x1="42" y1={y} x2={y === 90 ? 78 : 90} y2={y} stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        ))}
        {/* query beam → answer */}
        <path d="M104 72 H150" stroke="var(--signal)" strokeWidth="2" strokeDasharray="4 5">
          <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.1s" repeatCount="indefinite" />
        </path>
        <circle cx="150" cy="72" r="4" fill="var(--signal)" />
        <rect x="160" y="44" width="62" height="56" rx="6" stroke="var(--signal)" strokeWidth="2" />
        <line x1="170" y1="60" x2="212" y2="60" stroke="var(--signal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="170" y1="72" x2="204" y2="72" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <line x1="170" y1="84" x2="208" y2="84" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "vault") {
    return (
      <svg
        viewBox="0 0 240 130"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={common}
        aria-hidden
      >
        <rect x="70" y="30" width="100" height="80" rx="10" stroke={stroke} strokeWidth="2" />
        <circle cx="120" cy="70" r="22" stroke={stroke} strokeWidth="2" />
        <circle
          cx="120"
          cy="70"
          r="22"
          stroke="var(--signal)"
          strokeWidth="2"
          strokeDasharray="14 90"
          style={{ animation: "bento-radar 7s linear infinite", transformOrigin: "120px 70px" }}
        />
        <circle cx="120" cy="70" r="5" fill="var(--signal)" />
        <line x1="120" y1="75" x2="120" y2="92" stroke="var(--signal)" strokeWidth="3" />
      </svg>
    );
  }

  // chart — self-drawing break-even line
  return (
    <svg
      viewBox="0 0 240 130"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={common}
      aria-hidden
    >
      <line x1="24" y1="108" x2="220" y2="108" stroke={stroke} strokeWidth="1.5" />
      <line x1="24" y1="14" x2="24" y2="108" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M24 96 L70 84 L110 70 L150 48 L196 20"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animation: "bento-draw 2.4s ease-out 0.2s forwards" }}
      />
      <path
        d="M24 40 L70 52 L110 64 L150 78 L196 96"
        stroke="var(--signal)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animation: "bento-draw 2.4s ease-out 0.5s forwards" }}
      />
      <line x1="130" y1="14" x2="130" y2="108" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.7" />
      <circle cx="130" cy="60" r="4.5" fill="var(--signal)" />
    </svg>
  );
}
