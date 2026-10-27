import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PortfolioTeaser } from "@/components/PortfolioTeaser";
import { AboutPreview } from "@/components/AboutPreview";
import { MarketingCTA } from "@/components/MarketingCTA";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <Services />
      <PortfolioTeaser />
      <AboutPreview />
      <MarketingCTA />
      <ContactSection showForm={false} />
    </div>
  );
}
