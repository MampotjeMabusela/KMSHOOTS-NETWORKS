"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_GROUPS,
  PORTFOLIO_ITEMS,
  type PortfolioFilter,
  type PortfolioItem,
} from "@/lib/media";

function ShotCard({
  shot,
  onOpen,
}: {
  shot: PortfolioItem;
  onOpen: (shot: PortfolioItem) => void;
}) {
  return (
    <motion.button
      layout
      type="button"
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(shot)}
      className="group shine-sweep relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-elevated text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_22px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(250,204,21,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="relative min-h-0 flex-1 bg-ink">
        <Image
          src={shot.src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          aria-hidden
          className="scale-110 object-cover object-center opacity-30 blur-xl"
          quality={90}
        />
        <div className="absolute inset-3 sm:inset-4">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center transition duration-700 group-hover:scale-[1.02]"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ink/60 text-gold backdrop-blur">
            <ZoomIn className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="relative border-t border-white/8 bg-ink/90 px-4 py-3 backdrop-blur-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/90">
          {shot.category}
        </p>
        <p className="mt-0.5 font-display text-lg text-cream sm:text-xl">
          {shot.title}
        </p>
      </div>
    </motion.button>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((i) => i.category === filter),
    [filter],
  );

  const groups = useMemo(
    () =>
      PORTFOLIO_GROUPS.map((group) => ({
        ...group,
        items: PORTFOLIO_ITEMS.filter((i) => i.category === group.category),
      })).filter((g) => g.items.length > 0),
    [],
  );

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-24 bg-ink py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Portfolio
            </p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
              Frames that feel like film
            </h2>
            <p className="mt-4 text-cream/65">
              {PORTFOLIO_ITEMS.length} unique shoots from the K.M. Shoots lens —
              grouped by weddings, portraits, events, corporate, and cinema.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Portfolio filters"
          >
            {PORTFOLIO_FILTERS.map((tab) => {
              const count =
                tab === "All"
                  ? PORTFOLIO_ITEMS.length
                  : PORTFOLIO_ITEMS.filter((i) => i.category === tab).length;
              if (tab !== "All" && count === 0) return null;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab}
                  onClick={() => setFilter(tab)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition ${
                    filter === tab
                      ? "bg-gold text-ink"
                      : "border border-white/10 text-cream/70 hover:border-gold/40 hover:text-gold"
                  }`}
                >
                  {tab === "Cinema" ? "Cinema/Storytelling" : tab}
                  <span className="ml-1.5 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filter === "All" ? (
          <div className="mt-14 space-y-16">
            {groups.map((group) => (
              <div key={group.category}>
                <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-cream sm:text-3xl">
                      {group.label}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm text-cream/55">
                      {group.blurb}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFilter(group.category)}
                    className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-gold-bright sm:mt-0"
                  >
                    View {group.category.toLowerCase()} only →
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((shot) => (
                    <ShotCard key={shot.id} shot={shot} onOpen={setActive} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {items.map((shot) => (
                <ShotCard key={shot.id} shot={shot} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {items.length === 0 && (
          <p className="mt-12 text-center text-sm text-cream/50">
            No frames in this category yet — try another filter.
          </p>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal
            aria-label={active.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] max-h-[75svh] bg-ink sm:aspect-[16/10]">
                <div className="absolute inset-3">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="90vw"
                    className="object-contain object-center"
                    quality={100}
                    priority
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 bg-ink-elevated px-5 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                    {active.category}
                  </p>
                  <p className="font-display text-2xl text-cream">
                    {active.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/15 p-2 text-cream/80 transition hover:border-gold/40 hover:text-gold"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
