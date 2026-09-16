"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/brand-mark";
import { BOOKING_URL, SECTIONS } from "@/lib/site";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotionSafe();

  return (
    <>
      <div className="frame border-0">
        <div className="gutter flex h-20 items-center justify-between gap-6">
          <BrandMark href="#top" className="shrink-0" />

          {/* Desktop nav — plain links, centred between brand and CTA */}
          <nav aria-label="Sections" className="hidden items-center gap-6 md:flex lg:gap-8">
            {SECTIONS.map((s) => (
              <a key={s.label} href={s.href} className="nav-link">
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <a href={BOOKING_URL} className="btn btn-primary btn-sm hidden sm:inline-flex">
              Book a call
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-[var(--radius-control)] border border-[var(--line)] text-foreground transition-colors hover:bg-foreground/5 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduced ? INSTANT : { duration: 0.3, ease }}
            className="overflow-hidden border-t border-[var(--line)] bg-background md:hidden"
          >
            <nav aria-label="Sections" className="frame border-0">
              <ul className="gutter flex flex-col py-3">
                {SECTIONS.map((s) => (
                  <li key={s.label} className="border-b border-[var(--line)] last:border-b-0">
                    <a
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center text-[15px] text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4 pb-2">
                  {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
                  <a
                    href={BOOKING_URL}
                    onClick={() => setOpen(false)}
                    className="btn btn-primary w-full"
                  >
                    Book a call
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
