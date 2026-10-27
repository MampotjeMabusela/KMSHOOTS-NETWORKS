"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  Film,
  Megaphone,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const OFFERINGS = [
  {
    icon: Film,
    title: "Brand films & founder stories",
    copy: "Short cinematic pieces that introduce who you are — and why clients should care.",
  },
  {
    icon: Megaphone,
    title: "Social storytelling systems",
    copy: "Feed-ready photography and reels built around campaigns, launches, and seasonal hooks.",
  },
  {
    icon: Target,
    title: "Product & service showcases",
    copy: "Clean, conversion-minded visuals that make offers feel tangible and premium.",
  },
  {
    icon: Users,
    title: "Team & culture content",
    copy: "Humanising portraits and behind-the-scenes that build trust with your audience.",
  },
  {
    icon: Clapperboard,
    title: "Event & launch coverage",
    copy: "Corporate gatherings documented with editorial pacing for PR and internal pride.",
  },
  {
    icon: Sparkles,
    title: "Campaign creative direction",
    copy: "Moodboards, shot lists, and on-set direction so every frame serves the brand.",
  },
];

export function BusinessMarketingContent() {
  const { openBooking } = useBooking();

  return (
    <>
      <section className="bg-ink-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            What we create for brands
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/8 bg-ink/50 p-6"
              >
                <item.icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-xl text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">
                  {item.copy}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 text-center">
        <p className="font-display text-2xl italic text-cream/75 sm:text-3xl">
          Capture. Create. Convert.
        </p>
        <button
          type="button"
          onClick={openBooking}
          className="mt-8 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-ink"
        >
          Start your campaign
        </button>
      </section>
    </>
  );
}
