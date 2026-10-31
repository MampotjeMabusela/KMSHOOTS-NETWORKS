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
    <section className="hero-stage relative isolate min-h-[min(72svh,720px)] overflow-hidden bg-ink pt-[max(5rem,calc(env(safe-area-inset-top,0px)+4.5rem))] supports-[height:100dvh]:min-h-[min(72dvh,720px)] sm:pt-[max(6rem,calc(env(safe-area-inset-top,0px)+5.5rem))]">
      <FullBleedPhoto src={image.src} alt={image.alt} priority dim />

      <div className="hero-stage-inner relative z-10 mx-auto flex min-h-[min(56svh,560px)] max-w-7xl items-end px-4 pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+2rem))] pt-10 supports-[height:100dvh]:min-h-[min(56dvh,560px)] sm:items-center sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
        <div className="w-full max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-[clamp(1.85rem,7vw,3.75rem)] leading-[1.1] text-cream [text-shadow:0_8px_40px_rgba(0,0,0,0.55)]">
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
