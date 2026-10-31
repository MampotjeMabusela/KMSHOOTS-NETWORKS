import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 bg-transparent sm:gap-3.5 ${className}`}
      aria-label={BRAND.legalName}
    >
      <span
        className={`relative block shrink-0 bg-transparent transition duration-300 group-hover:brightness-110 ${
          compact
            ? "h-16 w-[4.5rem] sm:h-[4.5rem] sm:w-20"
            : "h-[4.75rem] w-[5.35rem] sm:h-20 sm:w-[5.75rem] md:h-24 md:w-[6.85rem]"
        }`}
      >
        <Image
          src="/images/brand/logo.png?v=3"
          alt=""
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className="bg-transparent object-contain object-left"
          quality={100}
          priority
          unoptimized
        />
      </span>

      <span className="flex min-w-0 flex-col leading-[1.05]">
        <span
          className={`font-display font-semibold tracking-[0.06em] text-cream transition group-hover:text-gold ${
            compact
              ? "text-base sm:text-lg"
              : "text-lg sm:text-xl md:text-2xl"
          }`}
        >
          K.M. SHOOTS
        </span>
        <span
          className={`font-medium uppercase text-gold/90 ${
            compact
              ? "text-[10px] tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]"
              : "text-xs tracking-[0.2em] sm:text-sm sm:tracking-[0.22em] md:text-[0.95rem]"
          }`}
        >
          Networks (Pty) Ltd
        </span>
        <span
          className={`mt-0.5 font-medium tracking-[0.08em] text-cream/55 ${
            compact ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-xs"
          }`}
        >
          Reg. {BRAND.registration}
        </span>
      </span>
    </Link>
  );
}
