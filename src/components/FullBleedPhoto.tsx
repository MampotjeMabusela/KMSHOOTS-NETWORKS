import Image from "next/image";

type FullBleedPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Soften the sharp photo so overlay copy stays readable */
  dim?: boolean;
};

/**
 * Edge-to-edge hero / header photograph.
 * The full image is always visible (object-contain) — never cropped.
 * A soft blurred twin fills the letterbox so the stage still feels full-bleed.
 */
export function FullBleedPhoto({
  src,
  alt,
  priority = false,
  className = "",
  dim = false,
}: FullBleedPhotoProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {/* Atmosphere fill — covers empty bands without cropping the hero read */}
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        priority={priority}
        quality={95}
        className="scale-110 object-cover object-center opacity-45 blur-2xl"
      />

      {/* True photograph — complete frame, high quality, centered */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        quality={100}
        className={`object-contain object-center ${dim ? "opacity-55" : "opacity-80"}`}
      />

      {/* Professional vignette for typography */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />
      <div className="absolute inset-0 bg-ink/20" />
    </div>
  );
}
