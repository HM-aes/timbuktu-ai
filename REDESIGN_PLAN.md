# Timbuktu AI Solutions — Landing page redesign plan

Single job of the page: turn a qualified visitor (founder/CTO adding AI, or a
regulated team handling sensitive data) into a booked call. The one idea every
section repeats: **security is the architecture, not a feature** — RAG, agents
and access control designed inside a boundary from the first commit, on a stack
chosen through the OWASP Top 10 for LLM applications.

Source of truth for voice and constraints: `PRODUCT.md` (quiet, precise, no
hype, proof over promises, speak to the signer).

---

## 0. Ground rules

- Voice: understated expert. No superlatives, no urgency, no "supercharge".
- Layout convention for every content section: **text on the left, diagram on
  the right**, single column stacking on mobile (diagram below text).
- Every animation has a `prefers-reduced-motion` path (global kill switch stays).
- WCAG AA: body ≥ 4.5:1, large ≥ 3:1, status never colour-only.
- Motion stack: `motion/react` for UI + Lenis for scroll (already linked via
  `frame.update`). GSAP is not installed; we do not add a second runtime.
- One memorable element per section. Everything else stays quiet.

## 1. Design system (tokens)

### Colour — "vault graphite"
Shift the background from neutral zinc-black to a deep graphite with a faint
cool cast. It reads as machined steel rather than a generic dark theme and makes
the amber signal warmer by contrast.

| Token | Value | Role |
|---|---|---|
| `--background` | `oklch(0.145 0.010 262)` ≈ `#0e1015` | page |
| `--surface` | `oklch(0.20 0.010 262)` | card base |
| `--surface-secondary` | `oklch(0.24 0.010 262)` | raised card / input |
| `--border` | `oklch(0.29 0.010 262)` | hairlines |
| `--signal` (amber) | unchanged `oklch(0.7065 0.185 59.5)` | brand accent, one per view |
| `--verify` (teal) | `oklch(0.72 0.11 195)` | "checked / allowed" moments in diagrams only |
| `--danger` | unchanged | "blocked / rejected" moments in diagrams only |

Amber = the thing to look at. Teal = passed a check. Red = stopped at the gate.
Nothing else is coloured.

### Type
- Display + body: Plus Jakarta Sans (already loaded). Weights: 300 body,
  400 emphasis, 500 headings. No 600+ anywhere except the wordmark monogram.
- Labels: JetBrains Mono at 10.5–11px, tracking 0.14–0.18em, used only where
  the text is *data* (diagram labels, status pills, ledger keys). Restore the
  `--font-mono` slot to the real mono face so diagrams read as instrumentation.
- Scale (desktop): h1 60/64 · h2 40/44 · h3 24/30 · lead 18/29 · body 16/27 ·
  small 14/22 · label 11/16. Line length ≤ 68ch on all body copy.

### Spacing & rhythm
- Section padding: `py-28` desktop / `py-20` mobile. Section rule sits at the
  top with a numeral and a title (`01 — Approach`), not floating alone.
- Grid: 12-col, content max `1200px`, left-aligned with the header wordmark.
- Text/diagram split: `minmax(0,1.05fr) minmax(0,1fr)`, gap `4rem–5rem`.
- Card radius: `1.5rem` outer, `1rem` inner. One radius per nesting level.

### Card language ("instrument panel")
One card component, `Panel`, used everywhere:
- surface `color-mix(var(--surface) 72%, transparent)` + `backdrop-blur`
- 1px border, pointer-tracked amber edge highlight (existing `.bento-tile`)
- an optional **caption bar** at the top (`mono` label left, status right) so
  diagrams read like a monitored system rather than an illustration.

## 2. Page structure (new order)

```
Header          wordmark · nav · Book a call
01 Hero         text left ─ live "secure request path" diagram right
02 Approach     manifesto card: text left ─ boundary diagram right · 3 principles
03 Security     "Built against the OWASP Top 10 for LLMs": intro text left ─
                threat → control ledger right (10 rows, animated check-in)
04 Stack        "The stack, chosen for security": bento of 6 panels
                (Django + Django Auth · Pydantic · Qdrant · scikit-learn ·
                 SSH-only ops & hardened hosts · anti-injection layer)
05 Solutions    four product rows, all text left ─ motif panel right
06 Process      how an engagement runs: threat model → architecture → build →
                handover (compact 4-step rail)
07 Contact      text left ─ booking card right
Footer
```

## 3. Section specs

### 01 Hero
- Left: H1 "Secure AI systems, architected from the first commit." Lead copy
  (≤ 3 lines), two CTAs (Book a call / See the work), proof line.
- Right: `RequestPathDiagram` — an animated panel showing one request moving
  through: **Identity (Django Auth) → Input gate (Pydantic + injection
  classifier) → Retrieval (Qdrant, ACL-filtered) → Model → Output check →
  Sourced answer**, with an audit line ticking at the bottom. A second, dimmed
  path shows a hostile prompt stopped at the gate (red) so the security claim is
  *shown*, not stated. Loops every ~9s; static final frame under reduced motion.

### 02 Approach
Keep the manifesto card; tighten measure to 60ch, lift the boundary diagram
to a captioned panel. The three principle cards get a hairline top rule and an
icon-free layout (title, one sentence).

### 03 Security (new)
- Left: "Every system is reviewed against the OWASP Top 10 for LLM
  applications before it is built." Two short paragraphs on what that means
  for the buyer (boundaries chosen at design time, findings written for the
  board).
- Right: `ThreatLedger` panel — ten rows: `LLM01 Prompt injection → input
  schema + classifier + tool allow-list`, … Each row reveals on scroll with a
  teal check; hovering a row highlights the matching control. Mono keys,
  sans body.

### 04 Stack (new)
Six `Panel`s in a 3×2 bento. Each: name, one-line *why this and not the
default*, small SVG glyph. Copy stays factual:
- **Django + Django Auth** — sessions, permissions and password hashing that
  have been attacked in public for fifteen years.
- **Pydantic** — every input and every model output is a typed schema; anything
  that does not fit is rejected before it reaches the model.
- **Qdrant** — vector search with payload filters, so retrieval respects the
  same per-document permissions as the file system.
- **scikit-learn** — a small classifier in front of the model that flags
  injection and exfiltration attempts, trained on your traffic.
- **Hardened hosts, SSH-only** — key-based access, no public admin surface,
  air-gapped when required.
- **Output & tool guardrails** — allow-listed tools, scoped credentials,
  answers always carry their source.

### 05 Solutions
Same content; drop the alternating flip so every row is text left, panel
right. Panel gets the caption bar (`NIS2 ANALYZER · in production`). Reduce the
vertical gap between rows to `space-y-20`.

### 06 Process (new, compact)
Four steps on a single horizontal rail with a progress line that draws on
scroll. Copy ≤ 12 words per step.

### 07 Contact
Keep. Align the booking card with the new `Panel` styling; trust list becomes
three short lines with the check icon in teal (a *verified* moment).

## 4. Motion plan
- Page load: header, then hero text words, then diagram panel slides in from
  the right (one orchestrated moment).
- Scroll: section rules draw their line; panels fade-up 24px once; ledger rows
  stagger 40ms; process rail draws.
- Hover: pointer-tracked border glow on panels (existing), no scale on cards.
- Lenis remains the scroll engine; anchors route through it (existing).

## 5. Implementation order
1. `REDESIGN_PLAN.md` (this file).
2. Tokens: `app/theme-dark.css` background/surface/border shift; restore mono
   font slot in `app/globals.css`; add `.panel` + caption utilities.
3. Shared: `components/panel.tsx`, `components/section-rule.tsx` (numeral +
   title), `components/diagrams/request-path.tsx`, `components/diagrams/threat-ledger.tsx`.
4. Sections: hero → approach → security → stack → solutions → process → contact.
5. `app/page.tsx` order, navbar links (add Security).
6. Verify: `next build`, lints, reduced-motion pass, mobile stacking, contrast.
7. Commit and push.

## 6. Verification notes (done)

- `tsc --noEmit` clean; no lint errors.
- Browser console clean with and without `prefers-reduced-motion`.
- Fixed a latent accessibility bug found during verification: `useReducedMotion()`
  is `null` on the server and `true` on a reduced-motion client, so components
  that branched on it rendered different DOM/styles and React left the
  server's `opacity: 0` in place — panels were invisible for exactly those
  users. All entrance animations now go through `lib/use-reduced-motion.ts`
  (`useReducedMotionSafe`), which keeps server and first client render
  identical and then snaps to the visible state. `ScrollReveal` honours the
  preference in CSS (`.reveal-word`).
- Screenshots reviewed at 1440, 1000, 700 and 390 px: every section stacks to
  a single column below `lg`, no horizontal overflow.

## 7. Out of scope / follow-ups
- Real booking URL, contact email, KVK number (placeholders remain in `lib/site.ts`).
- Client logos / testimonials (none available yet, per PRODUCT.md).
- GSAP: not added; revisit only if a scrub-timeline need appears that Motion
  cannot cover.
