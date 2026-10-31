"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { FullBleedPhoto } from "@/components/FullBleedPhoto";
import { BRAND } from "@/lib/constants";
import { PAGE_HEROES } from "@/lib/media";
import { useBooking } from "@/context/BookingContext";

const lines = ["Your Moments.", "Our Lens.", "Your Story."] as const;

export function Hero() {
  const { openBooking } = useBooking();
  const hero = PAGE_HEROES.home;
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 18 });
  const springY = useSpring(my, { stiffness: 80, damping: 18 });
  const shiftX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink"
    >
      <motion.div
        style={{ x: shiftX, y: shiftY }}
        className="absolute inset-[-3%]"
      >
        <FullBleedPhoto src={hero.src} alt={hero.alt} priority dim />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 pb-14 pt-28 sm:items-center sm:px-6 sm:pb-16 lg:px-8 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-5 font-display text-base italic tracking-wide text-gold/90 sm:text-lg md:text-xl"
          >
            {BRAND.legalName}
          </motion.p>

          <h1 className="font-display text-[2.35rem] leading-[1.08] text-cream [text-shadow:0_10px_48px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-[3.75rem]">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className={`block ${i === 0 ? "hero-glow-text" : ""} ${i === 2 ? "text-gold" : ""}`}
                initial={{ opacity: 0, y: 28, rotateX: 25 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.25 + i * 0.14,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "left center" }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
          >
            {BRAND.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={openBooking}
              className="btn-3d book-pulse inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Book Your Shoot Today
            </button>
            <Link
              href="/portfolio"
              className="btn-3d inline-flex items-center justify-center rounded-full border border-cream/30 bg-ink/40 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream backdrop-blur-md transition hover:border-gold/50 hover:text-gold"
            >
              Explore Portfolio
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-10 font-display text-lg italic text-cream/50 sm:text-xl"
          >
            {BRAND.footerQuote}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
