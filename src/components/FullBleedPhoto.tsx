import Image from "next/image";

type FullBleedPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/**
 * Always shows the complete photograph (object-contain) so faces/bodies
 * are never cropped. A soft blurred twin fills empty letterbox space.
 */
export function FullBleedPhoto({
  src,
  alt,
  priority = false,
  className = "",
}: FullBleedPhotoProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        priority={priority}
        quality={90}
        className="scale-125 object-cover object-center opacity-40 blur-3xl"
      />
      <div className="absolute inset-3 sm:inset-5 lg:inset-6">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          priority={priority}
          quality={100}
          className="object-contain object-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        />
      </div>
    </div>
  );
}
