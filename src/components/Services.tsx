"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Cake,
  Clapperboard,
  Flower2,
  GraduationCap,
  Heart,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

const ICONS: Record<string, LucideIcon> = {
  Heart,
  Cake,
  Flower2,
  GraduationCap,
  Briefcase,
  Clapperboard,
  Megaphone,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type ServicesProps = {
  hideIntro?: boolean;
};

export function Services({ hideIntro = false }: ServicesProps) {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="relative scroll-mt-24 bg-ink-soft py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideIntro && (
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              What we capture
            </p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
              Services crafted for every chapter
            </h2>
            <p className="mt-4 text-cream/65">
              From intimate ceremonies to brand campaigns — cinematic
              photography, videography, and marketing storytelling under one
              lens.
            </p>
          </div>
        )}

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${hideIntro ? "" : "mt-12"}`}
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Clapperboard;
            return (
              <motion.li key={service.id} variants={item}>
                <button
                  type="button"
                  onClick={openBooking}
                  className="group flex h-full w-full flex-col rounded-2xl border border-white/8 bg-ink/60 p-6 text-left transition hover:border-gold/35 hover:bg-ink-elevated hover:shadow-[0_0_0_1px_rgba(250,204,21,0.12)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition group-hover:border-gold/50 group-hover:bg-gold/15">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/60">
                    {service.description}
                  </p>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold/80 transition group-hover:text-gold">
                    Book this service →
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
