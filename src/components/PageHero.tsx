import type { ReactNode } from "react";
import { FullBleedPhoto } from "@/components/FullBleedPhoto";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  image: { src: string; alt: string };
  children?: ReactNode;
};

export function PageHero({
  title,
  eyebrow,
  description,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate min-h-[min(72svh,720px)] overflow-hidden bg-ink pt-20 sm:pt-24">
      <FullBleedPhoto
        src={image.src}
        alt={image.alt}
        priority
        dim
      />

      <div className="relative z-10 mx-auto flex min-h-[min(56svh,560px)] max-w-7xl items-end px-4 pb-12 pt-10 sm:items-center sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl text-cream [text-shadow:0_8px_40px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <div className="mt-4 max-w-xl space-y-4 text-base leading-relaxed text-cream/80 sm:text-lg [text-shadow:0_4px_24px_rgba(0,0,0,0.45)]">
              {typeof description === "string" ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
