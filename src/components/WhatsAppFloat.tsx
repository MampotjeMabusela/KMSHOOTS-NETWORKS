"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(37,211,102,0.5)] sm:bottom-7 sm:right-7"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 transition group-hover:rotate-[-8deg]" />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
