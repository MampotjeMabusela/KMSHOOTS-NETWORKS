"use client";

import type { ReactNode } from "react";
import { BookingProvider } from "@/context/BookingContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BookingModal } from "./BookingModal";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { AmbientLife } from "./AmbientLife";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <AmbientLife />
      <div className="relative z-10 flex min-h-full min-w-0 flex-col">
        <Navbar />
        <main className="min-w-0 flex-1">{children}</main>
        <Footer />
      </div>
      <BookingModal />
      <WhatsAppFloat />
    </BookingProvider>
  );
}
