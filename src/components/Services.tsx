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
import { TiltCard } from "./TiltCard";

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
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28, rotateX: 12 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type ServicesProps = {
  hideIntro?: boolean;
};

export function Services({ hideIntro = false }: ServicesProps) {
  const { openBooking } = useBooking();

  return (
    <section
      id="services"
      className="relative z-10 scroll-mt-24 bg-ink-soft/80 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
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
          </motion.div>
        )}

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`perspective-stage grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${hideIntro ? "" : "mt-12"}`}
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Clapperboard;
            return (
              <motion.li key={service.id} variants={item} className="h-full">
                <TiltCard
                  onClick={openBooking}
                  className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-ink/70 p-6 text-left backdrop-blur-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold shadow-[0_8px_24px_rgba(250,204,21,0.12)] transition duration-300 group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold/20">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/60">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold/80 transition group-hover:gap-2 group-hover:text-gold">
                    Book this service
                    <span aria-hidden>→</span>
                  </span>
                </TiltCard>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
