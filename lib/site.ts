// ─────────────────────────────────────────────────────────────────────────────
// Timbuktu AI Solutions — site-wide config
// ─────────────────────────────────────────────────────────────────────────────

/** Calendly / Cal.com booking URL for every "Book a call" button. */
export const BOOKING_URL = "#book"; // TODO: replace with real Calendly/Cal.com link

/** Public contact email (used for "email us directly" + footer). */
export const CONTACT_EMAIL = "hello@timbuktu-ai.nl";

/** KVK registration number — shown in the trust line + footer. */
export const KVK_NUMBER = "00000000"; // TODO: replace with real KVK number

/** Primary domain. */
export const SITE_DOMAIN = "timbuktu-ai.nl";

export const HOME_URL = "/";
export const PRODUCTS_INDEX = "/products";
export const APPROACH_URL = "/approach";
export const CONTACT_URL = "/contact";
export const WRITING_URL = "/writing";

/** Dedicated product pages. */
export const PRODUCT_ROUTES = {
  "nis2-analyzer": "/products/nis2-analyzer",
  "lex-legal": "/products/lex-legal",
  docsense: "/products/docsense",
  tankslim: "/products/tankslim",
} as const;

export const NIS2_APP_URL = PRODUCT_ROUTES["nis2-analyzer"];
export const LEX_DEMO_URL = PRODUCT_ROUTES["lex-legal"];
export const DOCSENSE_URL = PRODUCT_ROUTES.docsense;
export const NOTIFY_URL = PRODUCT_ROUTES.tankslim;

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/** Primary header navigation. */
export const MAIN_NAV = [
  { label: "Home", href: HOME_URL },
  { label: "Approach", href: APPROACH_URL },
  { label: "Writing", href: WRITING_URL },
  { label: "Contact", href: CONTACT_URL },
] as const;

/** Footer column — site sections. */
export const FOOTER_NAV = [
  { label: "Home", href: HOME_URL },
  { label: "Products", href: PRODUCTS_INDEX },
  { label: "Approach", href: APPROACH_URL },
  { label: "Writing", href: WRITING_URL },
  { label: "Contact", href: CONTACT_URL },
] as const;
