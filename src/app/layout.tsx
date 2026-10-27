import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} | Photography, Videography & Marketing`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.subtitle,
  keywords: [
    "photography Pretoria",
    "videography Gauteng",
    "wedding photographer",
    "business marketing content",
    "KMSHOOTS NETWORKS",
  ],
  openGraph: {
    title: BRAND.name,
    description: BRAND.tagline,
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZA"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-cream">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
