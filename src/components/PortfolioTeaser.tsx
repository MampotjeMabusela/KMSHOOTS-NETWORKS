"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Home teaser only — real photos live exclusively on /portfolio to avoid repeats */
export function PortfolioTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(250,204,21,0.1),transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Portfolio
        </p>
        <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
          Frames that feel like film
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/65">
          Step into the gallery for weddings, events, portraits, and cinematic
          storytelling — each frame shot and finished by K.M. Shoots.
        </p>
        <Link
          href="/portfolio"
          className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
        >
          Open the gallery
        </Link>
      </motion.div>
    </section>
  );
}
