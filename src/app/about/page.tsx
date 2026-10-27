import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BRAND } from "@/lib/constants";
import { PAGE_HEROES } from "@/lib/media";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${BRAND.legalName} — cinematic photography, videography, and marketing from Pretoria.`,
};

export default function AboutPage() {
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="About us"
        title={BRAND.legalName}
        description="We are a professional photography, videography, and business marketing agency based in Pretoria / Gauteng. Our craft sits at the intersection of cinema and celebration."
        image={PAGE_HEROES.about}
      />

      <section className="border-y border-white/8 bg-ink-soft py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Capture",
              copy: "Directed sessions and documentary coverage that feel effortless in the moment — and magnetic forever.",
            },
            {
              title: "Create",
              copy: "Films, edits, and campaign assets designed to move audiences: from aisle to feed to boardroom.",
            },
            {
              title: "Remember",
              copy: "Archives built for families and brands alike — heirlooms and marketing assets that outlast trends.",
            },
          ].map((pillar) => (
            <div key={pillar.title}>
              <h2 className="font-display text-3xl italic text-gold">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                {pillar.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-display text-2xl italic text-cream/80 sm:text-3xl">
            “{BRAND.tagline}”
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
            >
              Get in touch
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-cream/20 px-7 py-3.5 text-sm uppercase tracking-[0.14em] text-cream transition hover:border-gold/50 hover:text-gold"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
