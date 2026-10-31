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
      className={`group inline-flex min-w-0 max-w-full items-center gap-2 bg-transparent sm:gap-3.5 ${className}`}
      aria-label={BRAND.legalName}
    >
      <span
        className={`relative block shrink-0 bg-transparent transition duration-300 group-hover:brightness-110 ${
          compact
            ? "h-12 w-14 sm:h-16 sm:w-[4.5rem]"
            : "h-12 w-14 min-[380px]:h-14 min-[380px]:w-16 sm:h-20 sm:w-[5.75rem] md:h-24 md:w-[6.85rem]"
        }`}
      >
        <Image
          src="/images/brand/logo.png?v=3"
          alt=""
          fill
          sizes="(max-width: 640px) 64px, 128px"
          className="bg-transparent object-contain object-left"
          quality={100}
          priority
          unoptimized
        />
      </span>

      <span className="flex min-w-0 flex-col leading-[1.05]">
        <span
          className={`truncate font-display font-semibold tracking-[0.04em] text-cream transition group-hover:text-gold sm:tracking-[0.06em] ${
            compact
              ? "text-sm sm:text-lg"
              : "text-sm min-[380px]:text-base sm:text-xl md:text-2xl"
          }`}
        >
          K.M. SHOOTS
        </span>
        <span
          className={`truncate font-medium uppercase text-gold/90 ${
            compact
              ? "text-[9px] tracking-[0.14em] sm:text-xs sm:tracking-[0.2em]"
              : "text-[9px] tracking-[0.12em] min-[380px]:text-[10px] min-[380px]:tracking-[0.16em] sm:text-sm sm:tracking-[0.22em] md:text-[0.95rem]"
          }`}
        >
          Networks (Pty) Ltd
        </span>
        <span
          className={`mt-0.5 truncate font-medium tracking-[0.06em] text-cream/55 sm:tracking-[0.08em] ${
            compact
              ? "text-[8px] sm:text-[10px]"
              : "text-[8px] min-[380px]:text-[10px] sm:text-xs"
          }`}
        >
          Reg. {BRAND.registration}
        </span>
      </span>
    </Link>
  );
}
