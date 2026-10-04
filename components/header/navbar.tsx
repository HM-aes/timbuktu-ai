"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/brand-mark";
import { HeaderNavLink } from "@/components/header/nav-link";
import { ProductsNavDesktop, ProductsNavMobile } from "@/components/header/products-nav";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL, HOME_URL, MAIN_NAV } from "@/lib/site";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const NAV_AFTER_HOME = MAIN_NAV.filter((item) => item.label !== "Home");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (!open) setProductsOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMobile = () => setOpen(false);

  return (
    <>
      <motion.div
        className="frame"
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? INSTANT : { duration: 0.5, ease }}
      >
        <div className="gutter header-bar">
          <div className="header-zone-start">
            <BrandMark href={HOME_URL} variant="header" className="min-w-0 max-w-full" />
          </div>

          <nav aria-label="Primary" className="header-zone-center max-md:hidden">
            <HeaderNavLink href={HOME_URL}>Home</HeaderNavLink>
            <ProductsNavDesktop />
            {NAV_AFTER_HOME.map((item) => (
              <HeaderNavLink key={item.href} href={item.href}>
                {item.label}
              </HeaderNavLink>
            ))}
          </nav>

          <div className="header-zone-end">
            <CtaButton href={BOOKING_URL} size="sm" className="hidden md:inline-flex">
              Book a call
            </CtaButton>
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
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduced ? INSTANT : { duration: 0.32, ease }}
            className="overflow-hidden border-t border-[var(--line)] bg-background md:hidden"
          >
            <nav aria-label="Primary" className="frame border-0">
              <ul className="gutter flex flex-col py-4">
                <li className="border-b border-[var(--line)]">
                  <HeaderNavLink
                    href={HOME_URL}
                    onClick={closeMobile}
                    className="flex min-h-14 items-center text-[1rem]"
                  >
                    Home
                  </HeaderNavLink>
                </li>
                <ProductsNavMobile
                  open={productsOpen}
                  onToggle={() => setProductsOpen((v) => !v)}
                  onNavigate={closeMobile}
                />
                {NAV_AFTER_HOME.map((item) => (
                  <li key={item.href} className="border-b border-[var(--line)] last:border-b-0">
                    <HeaderNavLink
                      href={item.href}
                      onClick={closeMobile}
                      className="flex min-h-14 items-center text-[1rem]"
                    >
                      {item.label}
                    </HeaderNavLink>
                  </li>
                ))}
                <li className="pt-6 pb-2">
                  <CtaButton href={BOOKING_URL} onClick={closeMobile} className="w-full">
                    Book a call
                  </CtaButton>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
