import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND, CONTACT, NAV_LINKS, getWhatsAppUrl } from "@/lib/constants";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14 13.5h2.5l.5-3H14V8.5c0-.8.2-1.5 1.5-1.5H17V4.1C16.4 4 15.5 4 14.6 4 12.1 4 10.5 5.5 10.5 8.2V10.5H8v3h2.5V20h3.5v-6.5z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.12v-3.4a6.22 6.22 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.95a8.2 8.2 0 0 0 4.76 1.52V7.02a4.84 4.84 0 0 1-1-.33z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              Professional photography, videography, and business marketing
              based in Pretoria / Gauteng.
            </p>
            <p className="mt-5 font-display text-lg italic text-gold/90">
              {BRAND.footerQuote}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/45">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/45">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {CONTACT.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 text-cream/70 transition hover:text-gold"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {phone.label}
                  </a>
                </li>
              ))}
              {CONTACT.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="break-all text-cream/70 transition hover:text-gold"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/45">
              Social
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={CONTACT.socials.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-cream/75 transition hover:border-gold/40 hover:text-gold"
              >
                <FacebookIcon className="h-4 w-4" />
                Facebook
              </a>
              <a
                href={CONTACT.socials.tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-cream/75 transition hover:border-gold/40 hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
                TikTok
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 px-3 py-2 text-sm text-[#25D366] transition hover:bg-[#25D366]/10"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-4 text-xs text-cream/40">
              FB: {CONTACT.socials.facebook.label}
              <br />
              TikTok: {CONTACT.socials.tiktok.label}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/8 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026{" "}
            <span className="text-cream/70">{BRAND.legalName}</span>. All rights
            reserved.
          </p>
          <p>{CONTACT.location}</p>
        </div>
      </div>
    </footer>
  );
}
