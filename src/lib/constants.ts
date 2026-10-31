export const BRAND = {
  name: "KMSHOOTS NETWORKS",
  legalName: "K.M. SHOOTS NETWORKS (PTY) LTD",
  registration: "K2026/184918/07",
  tagline: "Your Moments. Our Lens. Your Story.",
  footerQuote: "Capture. Create. Remember.",
  subtitle:
    "Professional Photography & Videography for All Occasions & Business Marketing.",
} as const;

export const CONTACT = {
  phones: [
    { label: "063 725 7595", href: "tel:+27637257595", e164: "27637257595" },
    { label: "066 214 5479", href: "tel:+27662145479", e164: "27662145479" },
  ],
  emails: [
    "isaackgothatsombonani28@gmail.com",
    "rasebotsaboitshepo91@gmail.com",
  ],
  whatsapp: {
    number: "27637257595",
    message:
      "Hi KMSHOOTS NETWORKS, I would like to book/enquire about your photography and marketing services.",
  },
  location: "Pretoria / Gauteng, South Africa",
  socials: {
    facebook: {
      label: "Kmshoots Kmshoots",
      href: "https://www.facebook.com/search/top?q=Kmshoots%20Kmshoots",
    },
    tiktok: {
      label: "Kmshoots Networks",
      href: "https://www.tiktok.com/search?q=Kmshoots%20Networks",
    },
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/business-marketing", label: "Business Marketing" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    id: "weddings",
    title: "Weddings & Engagements",
    description:
      "Cinematic coverage of your vows, portraits, and reception — timeless frames of the day you become forever.",
    icon: "Heart",
  },
  {
    id: "celebrations",
    title: "Baby Showers, Birthdays & Celebrations",
    description:
      "Joyful storytelling for life's milestones — candid laughter, styled details, and highlight reels worth rewatching.",
    icon: "Cake",
  },
  {
    id: "memorials",
    title: "Tombstone Unveiling & Memorials",
    description:
      "Respectful, dignified documentation that honours legacy with quiet elegance and care.",
    icon: "Flower2",
  },
  {
    id: "graduations",
    title: "Graduations",
    description:
      "Proud portraits and ceremony coverage that capture achievement, family pride, and new beginnings.",
    icon: "GraduationCap",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description:
      "Brand-aligned photography and video for launches, conferences, galas, and executive presence.",
    icon: "Briefcase",
  },
  {
    id: "cinema",
    title: "Professional Photoshoots & Cinema Videography",
    description:
      "Studio and on-location sessions with cinematic lighting, direction, and polished post-production.",
    icon: "Clapperboard",
  },
  {
    id: "marketing",
    title: "Business Marketing & Storytelling Content",
    description:
      "Scroll-stopping brand content — product films, founder stories, and social-ready campaigns that convert.",
    icon: "Megaphone",
  },
] as const;

export const EVENT_TYPES = SERVICES.map((s) => s.title);

export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(
    customMessage ?? CONTACT.whatsapp.message,
  );
  return `https://wa.me/${CONTACT.whatsapp.number}?text=${text}`;
}
