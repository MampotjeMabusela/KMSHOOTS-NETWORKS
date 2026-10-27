"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { PAGE_HEROES } from "@/lib/media";
import { useBooking } from "@/context/BookingContext";

export function Hero() {
  const { openBooking } = useBooking();
  const hero = PAGE_HEROES.home;

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src={hero.src}
          alt=""
          fill
          aria-hidden
          priority
          quality={90}
          sizes="100vw"
          className="scale-110 object-cover object-center opacity-30 blur-3xl"
        />
        <div className="absolute inset-0 bg-ink/50" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:justify-center lg:px-8 lg:pb-16 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="mb-5 font-display text-base italic tracking-wide text-gold/90 sm:text-lg md:text-xl">
              {BRAND.legalName}
            </p>

            <h1 className="font-display text-[2.35rem] leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              <span className="hero-glow-text">Your Moments.</span>
              <br />
              <span className="text-cream">Our Lens.</span>
              <br />
              <span className="text-gold">Your Story.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {BRAND.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_0_32px_rgba(250,204,21,0.35)] transition hover:bg-gold-bright"
              >
                Book Your Shoot Today
              </button>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-ink/40 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream backdrop-blur-sm transition hover:border-gold/50 hover:text-gold"
              >
                Explore Portfolio
              </Link>
            </div>

            <p className="mt-10 font-display text-lg italic text-cream/45 sm:text-xl">
              {BRAND.footerQuote}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-4 mb-8 min-h-[52svh] overflow-hidden rounded-2xl border border-white/10 bg-ink-elevated sm:mx-6 sm:mb-10 lg:mx-8 lg:mb-12 lg:mt-24 lg:min-h-[calc(100svh-8rem)]"
        >
          <div className="absolute inset-3 sm:inset-4 lg:inset-5">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
