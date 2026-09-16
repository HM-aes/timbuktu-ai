---
name: Timbuktu AI Solutions
description: Secure AI systems, architected and built by one specialist — production-grade, online or air-gapped.
colors:
  background: "oklch(0.985 0.001 286)"
  background-dark: "oklch(0.145 0.010 262)"
  foreground: "oklch(0.14 0.006 286)"
  foreground-dark: "#fafafa"
  surface: "#ffffff"
  surface-dark: "oklch(0.20 0.010 262)"
  surface-secondary: "oklch(0.965 0.003 286)"
  surface-secondary-dark: "oklch(0.24 0.010 262)"
  muted-foreground: "oklch(0.48 0.012 286)"
  muted-foreground-dark: "oklch(0.80 0.012 262)"
  border: "oklch(0.898 0.006 286)"
  border-dark: "oklch(0.29 0.010 262)"
  signal: "oklch(0.70 0.185 59)"
  signal-dark: "oklch(0.7065 0.185 59.5)"
  signal-soft: "oklch(0.78 0.165 72)"
  signal-dim: "oklch(0.64 0.17 55)"
  verify: "oklch(0.66 0.17 59)"
  verify-dark: "oklch(0.72 0.11 195)"
  sev-critical: "oklch(0.6532 0.2328 25.74)"
  sev-high: "oklch(0.72 0.20 55.0)"
  sev-medium: "oklch(0.72 0.18 67.0)"
  sev-low: "oklch(0.55 0.05 260.0)"
  sev-ok: "oklch(0.66 0.17 59.0)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 5vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "calc(0.75rem * 1.4)"
  panel: "1.5rem"
spacing:
  gutter: "1.5rem"
  gutter-md: "2.5rem"
  gutter-lg: "4rem"
  section-y: "7rem"
  section-y-md: "8rem"
  block-gap: "4rem"
  row-gap-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "#fafafa"
    rounded: "{rounded.xl}"
    padding: "0 1.5rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.surface-secondary}"
  button-secondary:
    backgroundColor: "color-mix(in srgb, var(--foreground) 6%, transparent)"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.xl}"
  panel-surface:
    backgroundColor: "color-mix(in srgb, var(--surface) 72%, transparent)"
    rounded: "{rounded.panel}"
---

# Design System: Timbuktu AI Solutions

## Overview

**Creative North Star: "The Instrument Panel"**

The site reads as a monitored system, not a brochure. Near-black graphite (light
mode: near-white paper) hosts glass panels with hairline borders, mono-set
eyebrow labels, and a single amber "signal" that appears only where something is
active — a status dot, a primary action, a hover state. The page behaves like
equipment you'd trust to watch a production system: quiet at rest, precise on
interaction, never decorative for its own sake. Layout is generous and
left-anchored (a wide text/diagram split, an eyebrow + hairline rule opening
every section) so the eye always knows which numbered chapter it's in.

This is not a generic AI-SaaS page — no gradient blobs, no purple-on-white, no
emoji feature grids. Confidence is carried by restraint: one amber accent, one
card language (`.panel`), one motion grammar, applied with total consistency
rather than varied for novelty.

**Key Characteristics:**
- Vault-graphite dark surface / near-white paper light surface, never pure black or pure white.
- One amber "signal" accent, used rarely and only with meaning (status, primary CTA, active state).
- Mono, uppercase, letter-spaced labels ("eyebrows") mark every section and panel caption like instrument telemetry.
- Glass panels (blur + hairline border) are the single card language across the whole site.
- Flat at rest; glow and lift are always a response to hover/focus/status, never ambient decoration.

## Colors

Two neutral grounds (near-black graphite in dark mode, near-white paper in
light mode) carry almost the entire page; amber is the one accent, and it is
scarce by design.

### Primary
- **Signal Amber** (dark: `oklch(0.7065 0.185 59.5)`, light: `oklch(0.70 0.185 59)`): the one active accent — primary CTA background glow, status dots, section-rule numerals, focus rings, hover borders. Never used as a body-text or large-fill color.

### Secondary
- **Verify Teal** (dark: `oklch(0.72 0.11 195)`, light: `oklch(0.66 0.17 59)`): reserved for "passed the check" / AI-reasoning moments inside diagrams only — not a general UI color.

### Neutral
- **Graphite Background** (dark `oklch(0.145 0.010 262)` / light `oklch(0.985 0.001 286)`): page ground. Never pure black or pure white.
- **Foreground** (dark `#fafafa` / light `oklch(0.14 0.006 286)`): primary text.
- **Surface / Surface Secondary / Surface Tertiary**: stepped card grounds (dark `oklch(0.20–0.27 0.010 262)`, light `#ffffff` → `oklch(0.945 0.003 286)`) used for panel backgrounds and raised elements.
- **Muted Foreground** (dark `oklch(0.80 0.012 262)` / light `oklch(0.48 0.012 286)`): secondary/caption text; kept ≥4.5:1 against its ground for AA body-text contrast.
- **Border** (dark `oklch(0.29 0.010 262)` / light `oklch(0.898 0.006 286)`): hairline dividers and panel edges.

### Severity (diagrams / compliance UI only)
- **Critical** `oklch(0.6532 0.2328 25.74)`, **High** `oklch(0.72 0.20 55.0)`, **Medium** `oklch(0.72 0.18 67.0)`, **Low** `oklch(0.55 0.05 260.0)`, **OK** `oklch(0.66 0.17 59.0)`. Used only inside product diagrams/status pills where severity is the actual content, never as decorative color.

### Named Rules
**The One Signal Rule.** Amber is the only accent color allowed outside diagrams and severity pills. If a second decorative accent color appears, it's wrong — reach for weight, spacing, or the mono label instead.

## Typography

**Display Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Body Font:** Plus Jakarta Sans (same family, lighter weight — one typeface, weight does the differentiating)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo fallback)

**Character:** One humanist sans carries both display and body at different weights (light body, medium display), so the page never feels like it's mixing voices; JetBrains Mono is reserved strictly for data — eyebrows, panel captions, status pills, diagram labels — so its appearance always signals "this is telemetry, read it as a label."

### Hierarchy
- **Display** (500 weight, `clamp(1.9rem, 5vw, 3.9rem)`, line-height 1.06–1.15, tracking −0.02em): section and hero headlines only.
- **Title** (500 weight, 17–28px): panel/card headings, product names.
- **Body** (300 weight, 16–18px, line-height 1.7): paragraph copy; kept under ~68 characters via `.measure` (34rem) / `.measure-wide` (40rem).
- **Label / Eyebrow** (mono, 11px, 400 weight, letter-spacing 0.18em, uppercase): section-rule numerals, panel captions, status text — always mono, always uppercase, always spaced.

### Named Rules
**The Mono-Is-Data Rule.** JetBrains Mono appears only on labels, captions, numerals, and status text — never on headlines or body copy. If mono shows up on a sentence of prose, it's wrong.

## Layout

A single centered `.shell` container (max-width 78rem) with responsive gutters
(24px mobile → 40px @640px → 64px @1024px) anchors every section, so text and
the header wordmark share one left edge throughout the page. Content sections
use a `.split` grid: stacked text-over-diagram on mobile/tablet (gap 64px),
becoming a 1.05fr/1fr text-left / diagram-right row at ≥1024px (gap 128px,
32px inset per column). Vertical rhythm is generous and consistent: ~112–128px
of section padding, a numbered `SectionRule` chapter marker (mono numeral +
label + hairline that draws in on scroll) opens every section after the hero,
and in-section blocks step by 64–96px. The hero alone skips the chapter marker
and uses its own top/bottom padding (64–144px responsive).

## Elevation & Depth

Flat by default; depth is a response, not a decoration. Surfaces sit flush at
rest with only a 1px hairline border; box-shadow and amber glow appear
exclusively on hover, focus, or active status (button glow, panel hover
border, bento-tile pointer-tracked highlight). The one constant elevation
element is the `.panel` glass treatment itself — `backdrop-filter: blur(14px)`
plus a translucent surface fill — which reads as "this is an instrument,"
not as a lifted card.

### Shadow Vocabulary
- **Panel ambient** (`inset 0 1px 0 rgba(fg,5%), 0 24px 60px -30px rgba(0,0,0,.7)`): the resting shadow on every `.panel`; very soft, mostly invisible except as depth cue.
- **Primary CTA glow** (`0 0 20px -2px signal/25%, inset 0 1px 0 white/15%`), intensifying on hover (`0 0 28px 2px signal/40%`): the only shadow allowed to carry the brand color.
- **Glass-card hover** (`0 8px 30px fg/8%, 0 0 20px signal/10%`): hover-only lift for `.glass-card-hover` elements.

### Named Rules
**The Flat-By-Default Rule.** Every surface is flat and quiet at rest. Shadow, glow, or lift is earned by hover, focus, or an active status — never applied ambiently.

## Shapes

Corners are gently rounded and consistent, never sharp and never pill-shaped
except for true tags/dots/status indicators. Buttons and panels use `1.5rem`
(panel) down to `0.75–1rem` (buttons, inputs) radii; chips and status dots use
`9999px` (fully round) to read as discrete tokens against the panel's soft
rectangles. Borders are always hairline (1px) and low-contrast
(`color-mix` at 6–11% of foreground), never a heavy stroke.

## Components

Buttons, panels, and inputs feel precise and instrumented: tight radii,
hairline borders, mono micro-labels where a status needs naming — calibrated
equipment, not soft consumer chrome.

### Buttons
- **Shape:** `rounded-xl` (~0.75rem).
- **Primary (`.btn-glow-primary`):** always dark-on-amber-glow in both themes — background `var(--eclipse)` (#18181b), text `var(--snow)` (#fafafa), 1px border at 40% signal, resting glow `0 0 20px -2px signal/25%`.
- **Hover/Focus:** border brightens to 65% signal, glow intensifies to `0 0 28px 2px signal/40%`, lifts `translateY(-1px) scale(1.02)`, `cubic-bezier(0.16,1,0.3,1)` easing over 0.25s.
- **Secondary (`.btn-corporate-light`):** near-invisible fill (`fg 6%`), border `var(--border)`, muted text; on hover fill deepens to `fg 10%` and text goes full foreground. No glow — glow is reserved for primary.

### Cards / Panels (`.panel`)
- **Corner Style:** `1.5rem` radius.
- **Background:** `color-mix(surface 72%, transparent)` with `blur(14px)` backdrop-filter — the one glass card language for the whole site.
- **Border:** 1px hairline at `fg 9%`.
- **Caption bar (`.panel-caption`):** mono, 10.5px, letter-spacing 0.16em, uppercase, muted-foreground, with a small round status dot in signal/verify/muted color — reads as telemetry, not a card title.
- **Internal grid (`.panel-grid`, optional):** faint 32px engineering grid at `fg 4%` inside diagram panels only.

### Tags / Chips (`.tag-dark`)
- **Style:** fully round, mono, 0.7rem, uppercase, letter-spaced 0.06em; dark zinc fill + light text in dark mode, softened zinc-100/200 fill + dark text in light mode — always high-contrast against its own chip background, independent of page theme.

### Navigation
Wordmark-anchored `brand-mark` lockup (amber-tinted radial badge, faint grid texture, pulsing signal dot) left-aligned to the shared `.shell` edge; nav items use the same restrained, no-shout type voice as body copy.

### Signature Component: Bento Grid
The Solutions/product grid uses pointer-tracked tiles: siblings dim to 48% opacity + desaturate on hover of any tile (cinematic focus), while the hovered tile gets a radial amber border-highlight and inner glow that follow the cursor position via `--bx`/`--by` custom properties. This is the site's one "clever" interaction and should not be duplicated elsewhere as decoration.

## Do's and Don'ts

### Do:
- **Do** keep amber to status, primary CTA, and hover/focus states — see The One Signal Rule.
- **Do** use `.panel` as the only card treatment; don't invent a second glass/shadow language.
- **Do** open every section (except hero) with a numbered `SectionRule` eyebrow + hairline.
- **Do** keep shadows and glow hover/focus-triggered — see The Flat-By-Default Rule.
- **Do** reserve JetBrains Mono for labels/captions/numerals only — see The Mono-Is-Data Rule.

### Don't:
- **Don't** use a gradient-blob hero, purple-on-white palette, identical three-up emoji feature grid, skill bars, stock handshake photography, or neon glitch effects (PRODUCT.md anti-references).
- **Don't** introduce a second accent color outside diagrams/severity pills.
- **Don't** apply ambient shadow or glow to a surface at rest — depth is always a response to interaction.
