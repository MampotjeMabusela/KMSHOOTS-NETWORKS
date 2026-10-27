"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

/** Text-only preview — team photo is reserved for the About page hero */
export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-ink-soft py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-red/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            About the studio
          </p>
          <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
            A lens for life&apos;s loudest joy and quietest honour
          </h2>
          <p className="mt-5 text-cream/65 leading-relaxed">
            {BRAND.name} is a Pretoria-based photography, videography, and
            business marketing collective. We blend cinematic craft with warm
            direction — so weddings feel epic, brands feel human, and every
            milestone is remembered with intention.
          </p>
          <p className="mt-6 font-display text-xl italic text-gold/85">
            {BRAND.tagline}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full border border-cream/20 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-cream transition hover:border-gold/50 hover:text-gold"
          >
            Our story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
