/**
 * Each photo is assigned once site-wide — never reused across pages/sections.
 *
 * Page heroes (5): home, services, about, business-marketing, contact
 * Portfolio film frames (17): /portfolio only — grouped by category
 */

export const PAGE_HEROES = {
  home: {
    src: "/images/hd/08-weddings-aisle.jpg",
    alt: "Bride and groom celebrating down the aisle — K.M. Shoots wedding coverage",
  },
  services: {
    src: "/images/hd/17-events-cultural.jpg",
    alt: "Colourful cultural event coverage — K.M. Shoots services",
  },
  about: {
    src: "/images/hd/15-corporate-office.jpg",
    alt: "K.M. Shoots Networks in the studio office",
  },
  business: {
    src: "/images/hd/01-corporate-guard-dusk.jpg",
    alt: "Corporate brand photography with K.M. Shoots creative mark",
  },
  contact: {
    src: "/images/hd/02-corporate-guard-studio.jpg",
    alt: "Studio corporate portrait — contact KMSHOOTS NETWORKS",
  },
} as const;

export const PORTFOLIO_FILTERS = [
  "All",
  "Weddings",
  "Events",
  "Portraits",
  "Corporate",
  "Cinema",
] as const;

export type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number];

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioFilter, "All">;
  src: string;
  alt: string;
};

/** Film-frame gallery — exclusive to the Portfolio page (no hero reuse) */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Weddings
  {
    id: "wedding-couple",
    title: "Forever Frame",
    category: "Weddings",
    src: "/images/hd/11-weddings-couple.jpg",
    alt: "Bride and groom portrait on their wedding day",
  },
  // Portraits
  {
    id: "school-portrait",
    title: "Campus Portrait",
    category: "Portraits",
    src: "/images/hd/03-portrait-school.jpg",
    alt: "Smiling student portrait outdoors",
  },
  {
    id: "urban-portrait",
    title: "Urban Editorial",
    category: "Portraits",
    src: "/images/hd/04-portrait-hoodie.jpg",
    alt: "Outdoor editorial portrait in blue hoodie",
  },
  {
    id: "guest-portrait",
    title: "Event Portrait",
    category: "Portraits",
    src: "/images/hd/09-portraits-tan-suit.jpg",
    alt: "Formal event portrait in tan suit",
  },
  {
    id: "duo-field",
    title: "Field Duo",
    category: "Portraits",
    src: "/images/hd/13-portraits-duo-field.jpg",
    alt: "Two friends posing outdoors under blue sky",
  },
  {
    id: "sash-portrait",
    title: "Celebration Portrait",
    category: "Portraits",
    src: "/images/hd/14-portraits-girl-sash.jpg",
    alt: "Young girl in white dress with red sash",
  },
  {
    id: "yellow-wall",
    title: "Sunlit Portrait",
    category: "Portraits",
    src: "/images/hd/18-portraits-yellow-wall.jpg",
    alt: "Portrait against a bright yellow wall",
  },
  // Events
  {
    id: "celebration-studio",
    title: "Celebration Studio",
    category: "Events",
    src: "/images/hd/06-events-balloons.jpg",
    alt: "Studio celebration shoot with gold balloons",
  },
  {
    id: "field-production",
    title: "Field Production",
    category: "Events",
    src: "/images/hd/07-events-red-beret.jpg",
    alt: "Outdoor event coverage with red beret subject",
  },
  {
    id: "reception-moment",
    title: "Reception Moment",
    category: "Events",
    src: "/images/hd/12-events-candid.jpg",
    alt: "Candid celebration moment between guests",
  },
  {
    id: "stage-performance",
    title: "Crowd Performance",
    category: "Events",
    src: "/images/hd/16-events-performance.jpg",
    alt: "High-energy outdoor performance with young audience",
  },
  {
    id: "parade-pride",
    title: "Parade Pride",
    category: "Events",
    src: "/images/hd/19-events-orange-beret.jpg",
    alt: "Uniformed performer smiling at an outdoor parade",
  },
  {
    id: "drill-formation",
    title: "Drill Formation",
    category: "Events",
    src: "/images/hd/20-events-drill-team.jpg",
    alt: "Youth drill team marching in formation",
  },
  // Corporate
  {
    id: "brand-team",
    title: "Brand Team",
    category: "Corporate",
    src: "/images/hd/10-corporate-team.jpg",
    alt: "Professional dual portrait for brand storytelling",
  },
  // Cinema / storytelling
  {
    id: "story-reel",
    title: "Storytelling Frame",
    category: "Cinema",
    src: "/images/hd/05-cinema-camo-kids.jpg",
    alt: "Cinematic documentary moment with youth",
  },
  {
    id: "motion-dance",
    title: "Motion Frame",
    category: "Cinema",
    src: "/images/hd/21-cinema-dance.jpg",
    alt: "Dynamic dance performance captured mid-motion",
  },
  {
    id: "voice-stage",
    title: "On the Mic",
    category: "Cinema",
    src: "/images/hd/22-events-microphone.jpg",
    alt: "Speaker on microphone in a dim venue",
  },
];

export const PORTFOLIO_GROUPS: {
  category: Exclude<PortfolioFilter, "All">;
  label: string;
  blurb: string;
}[] = [
  {
    category: "Weddings",
    label: "Weddings",
    blurb: "Couple portraits and ceremony emotion — timeless keepsakes.",
  },
  {
    category: "Portraits",
    label: "Portraits",
    blurb: "Directed and natural portraits with light that flatters every story.",
  },
  {
    category: "Events",
    label: "Events",
    blurb: "Celebrations, culture days, and live moments kept vivid and true.",
  },
  {
    category: "Corporate",
    label: "Corporate",
    blurb: "Brand-ready people photography for businesses that want presence.",
  },
  {
    category: "Cinema",
    label: "Cinema / Storytelling",
    blurb: "Frames with motion, mood, and narrative pull — ready for reel and still.",
  },
];
