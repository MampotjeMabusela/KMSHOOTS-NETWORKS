"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, getWhatsAppUrl } from "@/lib/constants";

type ContactSectionProps = {
  showMap?: boolean;
  showForm?: boolean;
  hideIntro?: boolean;
};

export function ContactSection({
  showMap = true,
  showForm = true,
  hideIntro = false,
}: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Unable to send message");
        return;
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please call or WhatsApp us.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideIntro && (
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
              Let&apos;s create something unforgettable
            </h2>
            <p className="mt-4 text-cream/65">
              Based in Pretoria / Gauteng — available for shoots across the
              region and beyond.
            </p>
          </div>
        )}

        <div className={`grid gap-8 lg:grid-cols-2 ${hideIntro ? "" : "mt-12"}`}>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/8 bg-ink/50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
                <Phone className="h-4 w-4 text-gold" />
                Phone
              </h3>
              <ul className="mt-4 space-y-2">
                {CONTACT.phones.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="text-lg text-cream transition hover:text-gold"
                    >
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={CONTACT.phones[0].href}
                  className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink md:hidden"
                >
                  Call now
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#25D366]/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#25D366]"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-ink/50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
                <Mail className="h-4 w-4 text-gold" />
                Email
              </h3>
              <ul className="mt-4 space-y-2">
                {CONTACT.emails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="break-all text-cream/85 transition hover:text-gold"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/8 bg-ink/50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
                <MapPin className="h-4 w-4 text-gold" />
                Location
              </h3>
              <p className="mt-4 text-cream/80">{CONTACT.location}</p>
            </div>
          </div>

          {showForm && (
            <div className="rounded-2xl border border-white/8 bg-ink/50 p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                  <p className="font-display text-2xl text-cream">Message sent</p>
                  <p className="mt-2 text-sm text-cream/60">
                    We&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-gold underline-offset-4 hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-cream/50">
                      Name
                    </span>
                    <input
                      name="name"
                      required
                      className="field-input"
                      placeholder="Your name"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-cream/50">
                        Email
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="field-input"
                        placeholder="you@email.com"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-cream/50">
                        Phone
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        className="field-input"
                        placeholder="Optional"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-cream/50">
                      Subject
                    </span>
                    <input
                      name="subject"
                      required
                      className="field-input"
                      placeholder="How can we help?"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-cream/50">
                      Message
                    </span>
                    <textarea
                      name="message"
                      required
                      className="field-input min-h-[120px] resize-y"
                      placeholder="Share a few details…"
                    />
                  </label>
                  {status === "error" && (
                    <p className="text-sm text-red-300">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {showMap && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
            <iframe
              title="KMSHOOTS NETWORKS — Pretoria / Gauteng"
              src="https://maps.google.com/maps?q=Pretoria%2C%20Gauteng%2C%20South%20Africa&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="h-[min(50vw,280px)] min-h-[220px] w-full max-w-full border-0 grayscale-[30%] contrast-[1.05] invert-[0.88] hue-rotate-180 sm:h-[400px] sm:min-h-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
