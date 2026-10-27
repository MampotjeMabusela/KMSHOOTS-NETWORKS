import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
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
    <section className="relative isolate overflow-hidden bg-ink pt-20 sm:pt-24">
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt=""
          fill
          aria-hidden
          priority
          quality={90}
          sizes="100vw"
          className="scale-110 object-cover object-center opacity-25 blur-3xl"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10 lg:px-8 lg:py-14">
        <div className="order-2 lg:order-1">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 max-w-xl font-display text-4xl text-cream sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </div>

        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-elevated sm:aspect-[5/4] lg:order-2 lg:aspect-auto lg:min-h-[58svh]">
          <div className="absolute inset-3 sm:inset-4">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
