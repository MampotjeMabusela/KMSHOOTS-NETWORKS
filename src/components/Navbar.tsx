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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/75 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:h-28 sm:gap-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
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
                className={`rounded-full px-3 py-2 text-[13px] font-medium tracking-wide transition ${
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CONTACT.phones[0].href}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs text-cream/80 transition hover:border-gold/40 hover:text-gold md:hidden"
            aria-label={`Call ${CONTACT.phones[0].label}`}
          >
            <Phone className="h-3.5 w-3.5" />
            Call
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
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 bg-ink/95 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-sm text-cream/85 transition hover:bg-white/5 hover:text-gold"
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
                className="mt-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
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
