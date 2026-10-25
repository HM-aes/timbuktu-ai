import { ArrowRight, ArrowUp } from "lucide-react";
import BrandMark from "@/components/brand-mark";
import FooterWordmark from "@/components/layout/footer-wordmark";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import {
  APPROACH_URL,
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_URL,
  PRODUCTS_INDEX,
  PRODUCT_ROUTES,
  WRITING_URL,
} from "@/lib/site";

const COLUMNS = [
  {
    heading: "Products",
    links: [
      { label: "NIS2 Analyzer", href: PRODUCT_ROUTES["nis2-analyzer"] },
      { label: "Lex Legal", href: PRODUCT_ROUTES["lex-legal"] },
      { label: "DocSense", href: PRODUCT_ROUTES.docsense },
      { label: "TankSlim", href: PRODUCT_ROUTES.tankslim },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "All products", href: PRODUCTS_INDEX },
      { label: "Approach", href: APPROACH_URL },
      { label: "Writing", href: WRITING_URL },
      { label: "Contact", href: CONTACT_URL },
    ],
  },
] as const;

/**
 * Footer — one dark card that holds in either theme: brand and the one action
 * up top, two short link columns, and the company name as a silhouette on a
 * low amber horizon, with the legal line laid over its base.
 */
export default function Footer() {
  return (
    <footer className="frame footer-shell">
      <div className="dark footer-card">
        <div className="footer-card-body">
          <div className="max-w-[26rem]">
            <BrandMark href="/" variant="footer" />
            <p className="cell-body mt-5">
              Secure AI systems — RAG, agents and access control — architected and built by one
              specialist. Online, or fully air‑gapped.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
              <CtaButton href={BOOKING_URL} tone="signal" size="sm">
                Book a call
                <ArrowRight size={15} data-arrow />
              </CtaButton>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:gap-14">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="footer-heading">{col.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="footer-link">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-base">
          <FooterWordmark />
          <div className="footer-legal">
            <p>
              © {new Date().getFullYear()} Timbuktu AI Solutions · KVK-registered, Netherlands · Operating
              from Porto
            </p>
            <div className="flex items-center gap-5">
              <p>Your data stays yours.</p>
              <a href="#top" className="footer-link inline-flex items-center gap-1.5">
                Back to top
                <ArrowUp size={13} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
