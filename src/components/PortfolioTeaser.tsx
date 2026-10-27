"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Home teaser only — real photos live exclusively on /portfolio to avoid repeats */
export function PortfolioTeaser() {
  return (
    <section className="relative z-10 overflow-hidden bg-ink/80 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(250,204,21,0.14),transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-gold"
        >
          Portfolio
        </motion.p>
        <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
          Frames that feel like film
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/65">
          Step into the gallery for weddings, events, portraits, and cinematic
          storytelling — each frame shot and finished by K.M. Shoots.
        </p>
        <Link
          href="/portfolio"
          className="btn-3d mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink shadow-[0_12px_40px_rgba(250,204,21,0.3)]"
        >
          Open the gallery
        </Link>
      </motion.div>
    </section>
  );
}
