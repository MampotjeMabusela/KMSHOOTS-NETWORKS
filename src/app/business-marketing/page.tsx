import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BusinessMarketingContent } from "@/components/BusinessMarketingContent";
import { PAGE_HEROES } from "@/lib/media";

export const metadata: Metadata = {
  title: "Business Marketing",
  description:
    "Brand films, social storytelling, and conversion-minded visual content for South African businesses.",
};

export default function BusinessMarketingPage() {
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Business marketing"
        title="Storytelling content that grows your business"
        description="We help Pretoria and Gauteng brands look cinematic online — photography and video engineered for attention, trust, and conversion."
        image={PAGE_HEROES.business}
      />
      <BusinessMarketingContent />
    </div>
  );
}
