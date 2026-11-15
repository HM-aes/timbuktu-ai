---
name: Timbuktu AI Solutions
description: Secure AI systems, architected and built by one specialist — production-grade, online or air-gapped.
colors:
  background: "oklch(0.145 0.010 262)"
  foreground: "#fafafa"
  surface: "oklch(0.20 0.010 262)"
  surface-secondary: "oklch(0.24 0.010 262)"
  surface-tertiary: "oklch(0.27 0.010 262)"
  muted-foreground: "oklch(0.80 0.012 262)"
  border: "oklch(0.29 0.010 262)"
  line: "color-mix(in srgb, #fafafa 10%, transparent)"
  line-strong: "color-mix(in srgb, #fafafa 18%, transparent)"
  eclipse: "#18181b"
  snow: "#fafafa"
  signal: "oklch(0.7065 0.185 59.5)"
  signal-soft: "oklch(0.7819 0.1585 72.33)"
  signal-dim: "oklch(0.6604 0.173 59.0)"
  ring: "oklch(0.7819 0.1585 72.33)"
  verify: "oklch(0.72 0.11 195)"
  sev-critical: "oklch(0.6532 0.2328 25.74)"
  sev-high: "oklch(0.72 0.2 55.0)"
  sev-medium: "oklch(0.7819 0.1585 72.33)"
  sev-low: "oklch(0.55 0.05 260.0)"
  sev-ok: "oklch(0.7329 0.1935 150.81)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.35rem + 1.9vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  cell-title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  cell-body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "8px"
  control: "8px"
  panel: "12px"
  full: "9999px"
spacing:
  frame-max: "80rem"
  gutter: "1.5rem"
  gutter-md: "2.5rem"
  gutter-lg: "4rem"
  section-y: "3.5rem"
  section-y-md: "5rem"
  section-y-lg: "6rem"
  hero-pt: "4rem"
  hero-pt-lg: "7rem"
  hero-gap: "3.5rem"
  hero-gap-lg: "5rem"
  head-gap: "1.25rem"
  head-gap-lg: "1.5rem"
  cell: "1.5rem"
  cell-md: "2rem"
  cell-lg: "2.5rem"
  cell-y: "2rem"
  cell-y-lg: "3rem"
  column-gap: "2.5rem"
  column-gap-lg: "4rem"
  stack: "1rem"
  stack-lg: "1.5rem"
  control-h: "2.75rem"
  control-h-sm: "2.5rem"
  control-px: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.eclipse}"
    textColor: "{colors.snow}"
    rounded: "{rounded.control}"
    padding: "0 1.5rem"
    height: "2.75rem"
  button-secondary:
    backgroundColor: "color-mix(in srgb, var(--foreground) 7%, transparent)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "0 1.5rem"
    height: "2.75rem"
  button-secondary-hover:
    backgroundColor: "color-mix(in srgb, var(--foreground) 12%, transparent)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "0 1.5rem"
    height: "2.75rem"
  button-ghost-hover:
    backgroundColor: "color-mix(in srgb, var(--foreground) 6%, transparent)"
  button-sm:
    padding: "0 1.125rem"
    height: "2.5rem"
  pill:
    backgroundColor: "color-mix(in srgb, var(--foreground) 4%, transparent)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "0 0.75rem"
    height: "1.75rem"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  nav-link:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.foreground}"
  showcase-tab:
    textColor: "{colors.muted-foreground}"
    padding: "0 1.25rem"
    height: "5rem"
  showcase-tab-selected:
    backgroundColor: "color-mix(in srgb, var(--foreground) 5%, transparent)"
    textColor: "{colors.foreground}"
---

# Design System: Timbuktu AI Solutions

## Overview

**Creative North Star: "The Framed Rail"**

The whole page is one drawn column. A 1280px frame with hairline side rails
runs from the header to the footer watermark; every section is stacked inside
it and separated from the next by the same hairline; every grid of content is
a set of bordered cells that share those lines rather than a row of floating
cards. Light is the default theme and a header switch moves to the graphite
dark theme (`app/theme-light.css`, `app/theme-dark.css`; the choice is stored in
`localStorage`), so every component has to hold in both. Amber is the single
accent, and the type is one humanist sans at two weights, so the eye reads
structure from lines and whitespace instead of from fills, shadows or colour
changes.

The register follows the Atomist SaaS template's discipline (framed column,
hairline cells, large plain h2 with one accented phrase, a muted lede, a live
product stage under the hero) while keeping Timbuktu's own palette, fonts and
content. Nothing decorates for its own sake: the dot field appears only behind
the two centred statement/CTA blocks, ambient light appears only on the hero
showcase stage, and page-level motion is limited to four moments (hero settle,
showcase tab swap, Philosophy statement reveal, and the request trace in the
Architecture section).

**Key Characteristics:**
- One 1280px framed column with 1px side rails from 640px up; sections stacked and separated by hairline rules.
- Bordered grid cells (`.cells` / `.cell`) share hairlines; no floating cards, no card shadows, no glass.
- Every h2 carries exactly one amber-accented phrase; the rest of the heading is plain foreground.
- Vault-graphite dark ground, near-white foreground, lifted grey secondary text; amber reserved for accent phrase, status dot, primary-button edge light, selected tab underline and focus ring.
- Body copy at weight 400; display, title, statement and cell titles at weight 500 with tight negative tracking.
- Mono (JetBrains Mono) only on 11px uppercase labels, panel captions, step numerals and dashboard data.

## Colors

One graphite ground, one near-white ink, one amber signal; every other colour
lives inside product diagrams and dashboards where it carries meaning.

### Primary
- **Signal Amber** (`{colors.signal}`): the one accent outside diagrams. Used for the accented phrase inside each heading (`.accent`), the pill and panel-caption status dot, the primary button's bottom edge light and glow, the selected showcase-tab underline, step numerals in the Process grid, the Stack role label, the brand glyph, and text selection. Never a fill behind text, never a body-text colour.
- **Signal Soft / Focus Ring** (`{colors.signal-soft}` / `{colors.ring}`): the 2px focus outline on every focusable control and the diagram "high" tone. **Signal Dim** (`{colors.signal-dim}`) is the darker step used inside dashboards only.

### Secondary
- **Verify Teal** (`{colors.verify}`): "passed the check" tone. Appears only as the status dot on production pills, the panel-caption dot for the threat ledger, and the check-mark rings in the contact trust line. Not a general UI colour.

### Neutral
- **Vault Graphite** (`{colors.background}`): page ground and the header's 85% translucent bar. Faintly cool so amber reads warm. Never pure black.
- **Snow** (`{colors.foreground}` / `{colors.snow}`): all headings and primary text; also the primary button's label. Never pure white.
- **Eclipse** (`{colors.eclipse}`): the primary button's plate. A fixed near-black that reads darker than the page.
- **Lifted Grey** (`{colors.muted-foreground}`): ledes, cell body copy, nav links at rest, labels and captions. Chosen so body copy meets AA against graphite.
- **Surface** (`{colors.surface}`, secondary and tertiary steps): panel and dashboard backgrounds inside media cells; the stepped tones only appear inside the dashboards.
- **Line** (`{colors.line}`, foreground at 10%): every rail, section rule, cell border, panel border, tab border and footer divider. **Line Strong** (foreground at 18%) is the ghost button's resting border and the secondary button's hover border. The older `border` token remains as the Tailwind default but the page draws its structure with `line`.

### Severity (dashboards and diagrams only)
- Critical, High, Medium, Low, OK (`{colors.sev-critical}` … `{colors.sev-ok}`): only inside the NIS2 dashboard and threat ledger where severity is the content.

### Diagram tones (Architecture stage only)
Scoped to `.arch-stage` in `globals.css`, with a light and a dark value each so small text holds 4.5:1 in both themes.
- **Go** (`--arch-go`; light `oklch(0.53 0.16 55)`, dark `signal-soft`): a request in motion. The conduit fill on the way down, the travelling point, the open layer's border, layer numerals, the one flagged phrase in the audit log.
- **OK** (`--arch-ok`; light `oklch(0.5 0.09 195)`, dark `verify`): a check that passed. Node ticks, the conduit on the way back up, the Answer label, the boundary once it is drawn solid.
- **Ground / Card** (`--arch-ground`, `--arch-card`): a flat dotted sheet (raised band in light, background mixed 30% toward black in dark) with `surface` cards on it. No ambient colour, no glow.

### Named Rules
**The Two-Tone Diagram Rule.** Inside the Architecture stage, amber means "in motion" and teal means "verified". Nothing there is coloured for decoration, and no layer has a colour of its own.

**The One Signal Rule.** Amber is the only accent colour allowed outside diagrams, dashboards and severity chips. A second decorative hue is wrong; use weight, a hairline or whitespace instead.

**The Hairline-Not-Border Rule.** Structure is drawn with `line` (foreground at 10%). Cells, rails, section rules, panels and tabs all use this one value; nothing on the page draws a heavier stroke than 1px at 18%.

## Typography

**Display Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Body Font:** Plus Jakarta Sans (same family; weight 400 body, weight 500 headings)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo fallback)

**Character:** One humanist sans does everything except data. Headings sit at medium weight with tight negative tracking and balanced wrapping; body copy is regular weight and never light. Mono appears only where a value, an id or a status is being read, so its presence always means "telemetry".

### Hierarchy
- **Display** (500, 40→60px fluid, line-height 1.05, tracking −0.025em): the hero h1 only, centred, capped at 16ch.
- **Headline XL** (500, 44→108px fluid, line-height 0.98, tracking −0.04em, `.headline-xl`): the homepage hero h1 ("Build AI. Build it secure."). One per page. The hero also carries the TIMBUKTU AI wordmark as clipped, 8%-foreground background type — decoration inside the hero, never its own section.
- **Title** (500, 30→48px fluid, line-height 1.1, tracking −0.02em): every section h2 and the contact h2; capped at 20ch inside the heading block; one phrase wrapped in `.accent`.
- **Statement** (500, 24→40px fluid, line-height 1.15): the single centred Philosophy pull-quote that reveals word by word on scroll.
- **Lede** (400, 17px → 18px at ≥640px, line-height 1.6, muted): the paragraph under an h2 or the hero h1; 36rem max in heading blocks, 38rem under the hero.
- **Cell Title** (500, 18px, line-height 1.3, tracking −0.01em): h3 inside grid cells (Stack tools, Process steps, Philosophy points). Product names in Solutions step up to 28→32px at the same weight.
- **Body** (400, 16px base; cell body 15px, line-height 1.65, muted): all running copy. Long-form paragraphs in Philosophy and Security use 15.5px inline.
- **Stat Number** (500, 36px → 44px at ≥1024px, line-height 1, tracking −0.02em): the three showcase stats.
- **Label** (mono, 11px, tracking 0.14em, uppercase, muted): step timing, definition-list keys ("The risk / The design / The proof"), Stack role labels (amber), the "soon" tag, the email line (normal-case variant). Panel captions use the same voice at 10.5px.

### Named Rules
**The One Accent Phrase Rule.** Each h2 (and the hero h1) contains exactly one `.accent` span, and it is the phrase that carries the claim. Never two, never zero, never a whole heading.

**The Mono-Is-Data Rule.** JetBrains Mono appears only on labels, captions, numerals, ids and dashboard values. A sentence of prose in mono is wrong.

## Layout

One framed column (`.frame`, max-width 80rem / 1280px, centred) carries the
header bar, every section, and the footer; from 640px up it draws 1px `line`
rails on both sides, so the page reads as a single drawn sheet. Content that is
not a grid cell sits inside `.gutter` (24px mobile, 40px from 640px, 64px from
1024px). Sections (`.section`) are stacked and separated by a 1px top rule; no
section carries its own background, and the header (80px tall, sticky, 85%
graphite with a medium backdrop blur) closes with the same hairline.

Every section after the hero opens with a heading block (`.section-head`): a
48px-max h2 with one accented phrase, an optional 18px muted lede, 20px (24px at
≥640px) between them, capped at 42rem, left-aligned on the gutter, padded 56px
mobile / 80px at ≥640px / 96px at ≥1024px top and bottom. The same padding
scale (`.section-block`) governs the two centred blocks: the Philosophy
statement and the Contact CTA.

Below each heading block the content is a bordered grid (`.cells`): the grid
draws its top rule, each cell draws its right and bottom rule, and the last
column and row drop theirs so no line doubles. Cells pad 32px × 24px on
mobile, 32px × 32px at ≥640px, 48px × 40px at ≥1024px; inside a cell the icon
→ title gap is 24px and title → body is 16px. Column variants: `cells-2`,
`cells-3` (collapses to two columns 640–1023px), `cells-4` (same collapse),
`cells-md cells-3` (short stats and the trust line stay three across from 640px),
and `cells-split` (text 0.9fr / media 1.1fr from 1024px; `cells-split-even`
for 1fr / 1fr). A media cell (`.cell-media`) has zero padding so its diagram or
dashboard fills edge to edge and shares the cell's hairlines.

The hero is the one section without a top rule or heading block: a centred pill,
h1, lede and two buttons padded 64px (112px at ≥1024px) above, then a 56px
(80px at ≥1024px) gap to the showcase, which spans the frame edge to edge as a
tab strip, a padded stage and a three-cell stat row. The footer repeats the
frame with a four-column link grid, a hairline-topped legal line, and a
translucent watermark wordmark clipped at the bottom.

Breakpoints in use: 640px (rails appear, gutter and cell padding step, tabs go
to a row, two-column grids), 768px (desktop nav shows), 1024px (three- and
four-column grids, split rows, largest padding, sticky text column in Security).

## Elevation & Depth

Flat. Depth is conveyed by hairlines and by the contrast between graphite and
the slightly lighter panel surface; cells, panels and pills carry no shadow, no
blur and no gradient at rest. Three deliberate exceptions exist and are the
whole shadow vocabulary:

### Shadow Vocabulary
- **Primary edge light** (`inset 0 -1px 0 signal/70%, 0 6px 20px -8px signal/45%`): the resting treatment on `.btn-primary` — a 1px amber line along the bottom edge and a short amber under-glow. On hover the edge goes to full signal, the glow to `0 10px 28px -8px signal/55%`, and the button lifts 1px. This is the only element that glows at rest.
- **Stage light** (`.stage-glow`): two warm radial gradients from the top corners (signal at 34% and 22%), a 22px dot grid at foreground 9%, over a ground of background mixed 30% toward black. Used only behind the hero showcase stage to frame the live product.
- **Stage drop** (`0 30px 80px -30px rgba(0,0,0,0.8)`): the dashboard panel inside the stage sits on this deep, soft shadow so it reads as lifted above the lit stage. Not used anywhere else.

The sticky header uses a medium backdrop blur over 85% graphite so content
scrolls under it; this is a translucency for legibility, not a glass card style.

### Named Rules
**The Edge-Light Rule.** Ambient glow belongs to two things: the primary button and the hero stage. No cell, panel, pill or heading carries a shadow or glow at rest or on hover.

## Shapes

Corners are small and consistent: controls (buttons, tab focus rings, the
mobile menu button, inputs) use 8px (`rounded.control`); product panels and
dashboards use 12px (`rounded.panel`); pills, status dots, step numerals and
check rings are fully round (9999px). Cells have no radius at all — they are
regions of the frame, cut by hairlines, and their corners are the frame's
corners. Borders everywhere are 1px `line`; the ghost button alone rests on
`line-strong`. Diagram interiors may draw a faint 32px engineering grid
(`.panel-grid`, foreground at 4%) and the statement/CTA blocks a 22px dot field
(`.bg-dots`, foreground at 12%); both are background texture, never a border.

## Components

Controls are quiet plates on a dark ground: hairline borders, 8px corners,
medium-weight 15px labels, and state carried by a fill step or a border step
rather than a colour change.

### Buttons
- **Shape:** 8px corners, 44px tall, 24px horizontal padding, 15px / weight 500 label, 8px gap to an icon. `.btn-sm` is 40px tall, 18px padding, 14px label (header CTA, product CTAs).
- **Primary:** Eclipse plate, Snow label, foreground-14% border, amber edge light (see Elevation). Hover: border to signal/45%, brighter edge and glow, 1px lift. Used for "Book a call" in header, hero, CTA and mobile menu.
- **Secondary:** foreground-7% fill, foreground text, `line` border; hover fill 12% and `line-strong` border. Used for "See the work" and "Email us directly".
- **Ghost:** transparent, foreground text, `line-strong` border; hover fill 6% and border signal/55%. Used for per-product CTAs in Solutions.
- **Icon motion:** a trailing arrow (`data-arrow`) slides 3px right on hover.
- **Focus:** 2px `ring` outline offset 2px on every button and link.

### Pills
- **Style:** fully round, 28px tall, 12px padding, 13px foreground text, `line` border, foreground-4% fill, 6px status dot (signal by default, `verify` for "Available now" / production, muted for "Coming soon"). Status is never dot-only; the label always names it.
- **Used for:** hero kicker line, product status, Security tag list.

### Cells (`.cells` / `.cell`)
- **Corner style:** none. **Background:** none (page graphite). **Shadow:** none.
- **Border:** shared 1px `line` per the grid rules in Layout.
- **Internal padding:** 32 × 24px → 32 × 32px → 48 × 40px.
- **Content rhythm:** optional glyph or numeral, cell title, optional amber mono role label, 15px muted body.

### Panels (`.panel`)
- **Corner style:** 12px. **Background:** Surface. **Border:** 1px `line`. Static; no hover state.
- **Caption bar (`.panel-caption`):** mono 10.5px uppercase 0.14em muted, 6px status dot (signal / verify / muted), status text at foreground 70% on the right, hairline below.
- **Flush variant:** when a panel fills a media cell it drops its own border and radius and inherits the cell's hairlines.
- **Grid interior (`.panel-grid`):** faint 32px grid for diagrams and motifs.

### Definition List (Solutions)
- Three rows ("The risk / The design / The proof") divided by hairlines top, bottom and between; mono label in a 6.5rem column from 640px, 15px muted body beside it.

### Navigation
- **Header:** 80px bar, brand mark left (amber line glyph + 20px semibold "Timbuktu" with a regular-weight muted "AI"), centred plain links from 768px (15px, weight 400, muted → foreground on hover or `aria-current`), primary `.btn-sm` on the right, 40px hairline-bordered menu button below 768px.
- **Mobile menu:** slides open (height + opacity, 0.3s) under the header hairline; links are 48px rows separated by hairlines, full-width primary button at the bottom.
- **Footer:** same frame; 15px medium column headings, 14px `nav-link` items, hairline-topped 13px legal line.

### Signature Component: Product Showcase
The hero ends in a live product stage that spans the frame. A tab strip (four
cells, 56px tall mobile / 80px desktop, 14–15px medium labels with a 17px line
icon; selected tab gets a foreground-5% fill, amber icon and a 2px amber
underline that slides between tabs) sits over a `stage-glow` stage padded 12 →
24 → 40px, holding one 12px-cornered dashboard panel on the stage drop shadow;
a three-cell stat row closes it. Tabs are keyboard-operable (arrows, Home, End).

### Signature Component: Request Trace (Architecture stage)
The section under "Security is not a feature. It is the architecture." It
answers one question with evidence: what happens to a request, and what stops
it going wrong. Files: `components/sections/security-architecture.tsx` (layer
data), `components/sections/architecture-stage.tsx` (modes and timeline),
`components/visuals/request-trace.tsx` (markup), `.arch-*` / `.trc-*` in
`app/globals.css`.

- **Two readings, side by side.** The left column is for the person who signs off: layer name, one plain sentence, one supporting sentence. The stage on the right is for the engineer: what each layer is built with (mono chips), three checks it performs, and the OWASP LLM Top 10 (2025) risk that closes. The same sentence never appears in both.
- **Order.** Layers are numbered in the order a request meets them: 01 Application, 02 Model, 03 Data, 04 Operations. Operations is last because it is the dashed boundary the other three run inside.
- **Anatomy.** Boundary frame (14px radius, 1px dashed, drawn solid in OK once verified) → Operations header → request/answer slot → three layer cards (10px radius, `surface`, hairline border) joined by a 1px conduit through 24px nodes → audit log (mono, tabular numerals, one line per hop). All geometry is in `em`; one `font-size` clamp scales the whole drawing from stage width, and from pinned height on desktop.
- **States of a layer.** Pending (hollow node), open (Go border, soft offset shadow, checks visible), passed (node filled OK with a tick). Exactly one layer is open at a time, and every open layer takes the same height (`--dh`), so the frame never changes size; Operations is the one open at rest.
- **Content is illustrative and says so.** The request, the answer and the five log lines are an example trace (the log header reads "Example trace"). Tools, checks and risk ids restate the stack and threat ledger on `/approach`; change them in both places.
- **Driven by custom properties.** `--focus`, `--dim`, `--pass`, `--flow`, `--ret`, `--sec` (registered with `@property`). Every CSS default is the finished state, so no script, a failed script or reduced motion still shows the whole verified system.

### Motion
Page-level motion is four moments. The first three use the ease `cubic-bezier(0.22, 1, 0.36, 1)`:
1. **Hero settle:** pill, h1, lede, buttons and showcase fade up (10–24px) over 0.8–0.9s, staggered 0.12s from a 0.1s base.
2. **Showcase tab swap:** underline slides in 0.4s; the outgoing dashboard fades down 6px and the incoming fades up 10px, 0.3s each.
3. **Philosophy statement:** words go from 22% opacity and 4px blur to full as the block scrolls between 90% and 45% of the viewport.
4. **Request trace (Architecture):** one GSAP timeline, `buildTrace`, used two ways. On a large, tall screen (≥1024px wide, ≥620px tall) the row is pinned for 320% of the viewport and the scroll scrubs it: the request drops from the slot into Application, each layer opens as the last one closes, its node turns to a tick, the audit log writes a line, the request moves on; at Data the answer climbs back in teal, the last two hops are logged and the boundary is drawn solid. Clicking a layer in the list scrolls to its beat. Everywhere else the same timeline plays once on a 10s clock when the stage reaches 60% of the viewport, then clears its inline values and hands over to CSS, so layers open on tap, hover or focus; "Replay trace" runs it again. With reduced motion nothing plays: the finished state is shown and layers still open on tap. Opening eases on `power2.inOut`, travel on `power1.inOut`, CSS state changes on `cubic-bezier(0.16, 1, 0.3, 1)` over 0.5s. Nothing loops.
Control transitions are 0.2s (buttons, nav links, tabs; button lift uses `cubic-bezier(0.16, 1, 0.3, 1)`). Inside diagrams and product motifs, slow looping SVG telemetry (dashed flow lines, node pulses, a radar sweep, a scan line) runs continuously but stays inside its panel. Smooth scrolling is provided by Lenis. Under `prefers-reduced-motion`, every animation and transition is collapsed to 0.01ms, reveal words are forced visible, and the motion components render their final state.

## Do's and Don'ts

### Do:
- **Do** put every section inside `.frame` and separate it with the `.section` hairline; never add a section background or margin between sections.
- **Do** lay out repeated content as `.cells` that share hairlines, with the column variant that matches the count (`cells-3`, `cells-4`, `cells-split`).
- **Do** open each section with `SectionHead`: an h2 with exactly one `.accent` phrase and, when needed, a muted lede.
- **Do** keep amber to the accent phrase, status dots, primary edge light, selected tab and focus ring — see The One Signal Rule.
- **Do** keep body copy at weight 400 and headings at weight 500; use whitespace and hairlines, not weight jumps, for hierarchy.
- **Do** reserve `.bg-dots` for the centred statement and CTA blocks, and `.stage-glow` for the hero stage.
- **Do** use the spacing tokens (`--space-*`, `--control-*`) rather than ad-hoc values when adding a block.

### Don't:
- **Don't** float cards: no box-shadow, blur, gradient border or raised surface on cells, panels or pills.
- **Don't** add a second accent hue outside dashboards and severity chips, and don't use amber as a fill behind text.
- **Don't** add page-level motion beyond the hero settle, the showcase tab swap, the statement reveal and the request trace.
- **Don't** give the Architecture stage ambient colour, glass, per-layer hues or a looping animation; it is a drawing, and it earns attention by being specific.
- **Don't** put a claim in the request trace (a tool, a check, a risk id) that `/approach` does not also make.
- **Don't** set prose in JetBrains Mono, or introduce eyebrow/kicker lines above headings; the heading block is h2 + lede only.
- **Don't** use a gradient-blob hero, purple-on-white palette, three-up emoji feature grid, skill bars, stock photography or neon glitch effects (PRODUCT.md anti-references).

## Change log

### 2026-11-13 — Architecture stage rebuilt as a request trace
- **Replaced** the four frosted-glass layer cards, their per-layer hues (amber, teal, green, blue), the drifting colour field behind them, the pointer tilt and glare, and the caption strip under the stage. Reasons: in the default light theme the layer hues collapsed to amber and the stage ground went grey, so the section read as orange blobs on mud; the cards repeated the left column's sentences word for word; and coloured blobs behind glass are the look PRODUCT.md lists as an anti-reference.
- **Added** the Request Trace (see Components): layers in request order, stack chips, checks, OWASP risk ids, a conduit with a travelling request and returning answer, and an audit log that writes itself.
- **Renumbered** the layers from Data-first to request order (Application, Model, Data, Operations). Layer copy in the left column is unchanged apart from the intro line.
- **Changed** the lede under the heading to say what the stage now shows (one request, four layers, a Python framework per layer chosen for the risk it closes).
- **Removed** `components/visuals/security-cards.tsx` and `components/ui/glass-card.tsx` (no other users) and all `.crd-*` CSS.
- **Not re-audited in this pass:** the rest of this document. Several statements predate the light theme, the chapter labels, the metallic hero CTAs and the lamp component, and should be regenerated from the code before they are relied on.

### 2026-11-13 — Header, hero and NIS2 preview
- **Buttons.** `CtaButton` gains `tone="solid"`: foreground fill, background-colour label, a slightly lighter ripple on hover. One solid button per group: "Book a call" in the header and mobile menu, "Explore products" in the hero. `tone="metal"` is now the quiet secondary beside it, and its label is solid ink instead of gradient text.
- **Chrome headline.** `.accent-metal` is a single top-to-bottom gradient (dark cap easing to graphite at the baseline; white to grey in dark). The old seven-stop gradient put a bright band at mid-height that read as a strikethrough on small text.
- **Header lockup.** No capsule at rest; mark and wordmark sit left-aligned on the gutter. Mark 32px (36px from 1024px), provenance line 10 to 11px. The hover treatment is unchanged.
- **Stage ground.** `.stage-object` and `.stage-glow` read `--stage-ground`: a light grey in the light theme, background mixed 30% toward black in dark. Previously both mixed toward black in light too, which gave a mid-grey slab behind every product.
- **NIS2 preview.** Two real screens of the app in dark window frames (Dashboard, Gap analysis): stacked on small screens, cascaded from 1024px (each 88% wide, the second overlapping by 9%) so the pair matches the height of the copy column. `public/previews/nis2-gap-analysis.png` is a crop of the page area only.

### 2026-11-13 — Closing block and Secure RAG stack
- **Closing block (`FinalCta`, `.closing-*`).** No longer a centred heading over two pills. A split that shares the frame's hairlines: on the left the claim, the lede, one solid "Book a call", a quiet "Explore the products" and the email as a text link, over the dot field; on the right three terms of the call (about 30 minutes, no slide deck, one person) as a definition list divided by hairlines. 1.2fr / 0.8fr from 1024px, stacked below. The terms restate the contact page; keep the two in step.
- **Button order.** "Book a call" is the primary here, as PRODUCT.md says. The amber `tone="signal"` button is no longer used on a light surface, where its white label did not meet contrast; it remains in the dark footer card.
- **Secure RAG stack.** In the pinned layout each card is centred in the stack, level with the step list, instead of hanging from the top with empty stage beneath it.
