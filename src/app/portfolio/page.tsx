import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore weddings, events, portraits, corporate, and cinema storytelling from KMSHOOTS NETWORKS.",
};

export default function PortfolioPage() {
  return (
    <div className="page-enter pt-20 sm:pt-24">
      <Portfolio />
    </div>
  );
}
