import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { CONTACT } from "@/lib/constants";
import { PAGE_HEROES } from "@/lib/media";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${CONTACT.phones[0].label} or email us to book your shoot in Pretoria / Gauteng.`,
};

export default function ContactPage() {
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Contact"
        title="Let's create something unforgettable"
        description="Based in Pretoria / Gauteng — available for shoots across the region and beyond."
        image={PAGE_HEROES.contact}
      />
      <ContactSection showMap showForm hideIntro />
    </div>
  );
}
