"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:scale-[1.03] hover:shadow-[0_10px_36px_rgba(37,211,102,0.55)] sm:bottom-7 sm:right-7"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
