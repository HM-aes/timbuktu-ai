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

/** Dedicated product pages (home tiles + footer). */
export const PRODUCT_ROUTES = {
  "nis2-analyzer": "/products/nis2-analyzer",
  "lex-legal": "/products/lex-legal",
  docsense: "/products/docsense",
  tankslim: "/products/tankslim",
} as const;

export const WRITING_URL = "/writing";

/** First product page — nav "Solutions" entry point. */
export const SOLUTIONS_ENTRY = PRODUCT_ROUTES["nis2-analyzer"];

// Legacy aliases (prefer PRODUCT_ROUTES for new links)
export const NIS2_APP_URL = PRODUCT_ROUTES["nis2-analyzer"];
export const LEX_DEMO_URL = PRODUCT_ROUTES["lex-legal"];
export const DOCSENSE_URL = PRODUCT_ROUTES.docsense;
export const NOTIFY_URL = PRODUCT_ROUTES.tankslim;

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/** Section navigation — shared by the header and footer. */
export const SECTIONS = [
  { label: "Approach", href: "/#philosophy" },
  { label: "Security", href: "/#security" },
  { label: "Stack", href: "/#stack" },
  { label: "Solutions", href: SOLUTIONS_ENTRY },
  { label: "Writing", href: WRITING_URL },
  { label: "Contact", href: "/#contact" },
] as const;
