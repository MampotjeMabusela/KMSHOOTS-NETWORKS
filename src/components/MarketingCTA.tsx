"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export function MarketingCTA() {
  const { openBooking } = useBooking();

  return (
    <section className="relative z-10 overflow-hidden bg-ink-soft/70 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Business marketing
        </p>
        <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
          Content that sells the feeling of your brand
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-cream/65">
          Product films, founder stories, social campaigns, and visual systems
          that turn browsers into believers — crafted for South African
          businesses ready to look premium.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openBooking}
            className="btn-3d book-pulse rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
          >
            Book a brand shoot
          </button>
          <Link
            href="/business-marketing"
            className="btn-3d rounded-full border border-cream/20 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition hover:border-gold/50 hover:text-gold"
          >
            Explore marketing
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
