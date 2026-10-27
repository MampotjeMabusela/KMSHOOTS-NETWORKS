import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { MarketingCTA } from "@/components/MarketingCTA";
import { PAGE_HEROES } from "@/lib/media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Weddings, celebrations, memorials, graduations, corporate events, cinema videography, and business marketing.",
};

export default function ServicesPage() {
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Services"
        title="Crafted for every chapter"
        description="From intimate ceremonies to brand campaigns — cinematic photography, videography, and marketing storytelling under one lens."
        image={PAGE_HEROES.services}
      />
      <Services hideIntro />
      <MarketingCTA />
    </div>
  );
}
