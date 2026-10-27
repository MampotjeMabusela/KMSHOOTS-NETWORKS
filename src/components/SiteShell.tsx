"use client";

import type { ReactNode } from "react";
import { BookingProvider } from "@/context/BookingContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BookingModal } from "./BookingModal";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BookingModal />
      <WhatsAppFloat />
    </BookingProvider>
  );
}
