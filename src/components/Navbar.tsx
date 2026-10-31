"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

export function Navbar() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`safe-top fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/75 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 min-[380px]:px-4 sm:h-24 sm:gap-4 sm:px-6 md:h-28 lg:px-8">
        <Logo className="min-w-0 flex-1" />

        <nav
          className="hidden items-center gap-0.5 xl:gap-1 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  (link.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-2.5 py-2 text-[12px] font-medium tracking-wide transition xl:px-3 xl:text-[13px] ${
                  active
                    ? "text-gold"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <a
            href={CONTACT.phones[0].href}
            className="inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full border border-white/10 px-2.5 text-xs text-cream/80 transition hover:border-gold/40 hover:text-gold min-[380px]:px-3 md:hidden"
            aria-label={`Call ${CONTACT.phones[0].label}`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden min-[400px]:inline">Call</span>
          </a>

          <button
            type="button"
            onClick={openBooking}
            className="btn-3d book-pulse hidden items-center rounded-full bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink sm:inline-flex"
          >
            Book Now
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 bg-ink/95 lg:hidden"
          >
            <nav
              className="safe-bottom flex max-h-[min(70dvh,520px)] flex-col gap-1 overflow-y-auto px-4 py-4"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3.5 text-base text-cream/85 transition hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className="mt-2 min-h-12 rounded-full bg-gold px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
