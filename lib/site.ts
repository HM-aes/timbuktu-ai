// ─────────────────────────────────────────────────────────────────────────────
// Timbuktu AI Solutions — site-wide config
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Booking URL for every "Book a call" button. Set NEXT_PUBLIC_BOOKING_URL to a
 * Cal.com / Calendly link at build time; until then every button lands on the
 * contact page, where the email is, instead of on a dead anchor.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact#book";

/** The person behind the company — shown on the homepage "Who builds it" block. */
export const FOUNDER = {
  name: "Hassan Mohamed",
  role: "Founder · architect and engineer",
  /** Optional profile links; an empty string hides the link. */
  linkedin: process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN || "",
  github: process.env.NEXT_PUBLIC_FOUNDER_GITHUB || "",
} as const;

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
