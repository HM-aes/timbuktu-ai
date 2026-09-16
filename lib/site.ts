// ─────────────────────────────────────────────────────────────────────────────
// Timbuktu AI Solutions — site-wide config
//
// TODO(placeholders): fill these in before launch. Every value below is a
// placeholder — nothing here is a real address, number, or URL.
// ─────────────────────────────────────────────────────────────────────────────

/** Calendly / Cal.com booking URL for every "Book a call" button. */
export const BOOKING_URL = "#book"; // TODO: replace with real Calendly/Cal.com link

/** Public contact email (used for "email us directly" + footer). */
export const CONTACT_EMAIL = "hello@timbuktu-ai.nl"; // TODO: replace with real address

/** KVK registration number — shown in the trust line + footer. */
export const KVK_NUMBER = "00000000"; // TODO: replace with real KVK number

/** Primary domain. */
export const SITE_DOMAIN = "timbuktu-ai.nl";

// ── Per-product CTAs ────────────────────────────────────────────────────────
// TODO: point these at the real app / signup / demo-request destinations.
export const NIS2_APP_URL = "#nis2"; // "Try NIS2 Analyzer"
export const LEX_DEMO_URL = "#lex-demo"; // "Book a demo"
export const DOCSENSE_URL = "#docsense"; // "Try it free"
export const NOTIFY_URL = "#notify"; // "Get notified" (TankSlim)

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/** Section navigation — shared by the header and footer. */
export const SECTIONS = [
  { label: "Approach", href: "#philosophy" },
  { label: "Security", href: "#security" },
  { label: "Stack", href: "#stack" },
  { label: "Solutions", href: "#solutions" },
  { label: "Contact", href: "#contact" },
] as const;
