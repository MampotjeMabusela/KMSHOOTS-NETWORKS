"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { EVENT_TYPES } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

type FormState = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  vision: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  date: "",
  location: "",
  vision: "",
};

export function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeBooking]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrors({});
      setMessage("");
    }
  }, [isOpen]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        issues?: Record<string, string[]>;
        id?: string;
      };

      if (!res.ok || !data.ok) {
        setErrors(data.issues ?? {});
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or WhatsApp us.");
    }
  }

  function field(
    key: keyof FormState,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4 sm:pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:pt-[max(1rem,env(safe-area-inset-top,0px))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close booking form"
            onClick={closeBooking}
          />

          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 max-h-[min(92svh,92dvh)] w-full max-w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-white/10 bg-ink-elevated shadow-2xl sm:max-w-lg sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-white/8 bg-ink-elevated/95 px-4 py-4 backdrop-blur sm:gap-4 sm:px-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Book your shoot
                </p>
                <h2
                  id="booking-title"
                  className="font-display text-2xl text-cream"
                >
                  Tell us your vision
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                className="rounded-full border border-white/10 p-2 text-cream/70 transition hover:border-gold/40 hover:text-gold"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-gold" />
                <h3 className="mt-4 font-display text-2xl text-cream">
                  Enquiry received
                </h3>
                <p className="mt-2 max-w-sm text-sm text-cream/65">
                  Thank you — our team will confirm availability and reach out
                  shortly. Capture. Create. Remember.
                </p>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="safe-bottom space-y-4 px-4 py-5 sm:px-6"
              >
                <Field
                  label="Client name"
                  error={errors.name?.[0]}
                >
                  <input
                    required
                    value={form.name}
                    onChange={(e) => field("name", e.target.value)}
                    className="field-input"
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" error={errors.phone?.[0]}>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => field("phone", e.target.value)}
                      className="field-input"
                      placeholder="06X XXX XXXX"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.[0]}>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => field("email", e.target.value)}
                      className="field-input"
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Event type" error={errors.eventType?.[0]}>
                  <select
                    required
                    value={form.eventType}
                    onChange={(e) => field("eventType", e.target.value)}
                    className="field-input"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Preferred date" error={errors.date?.[0]}>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => field("date", e.target.value)}
                      className="field-input"
                    />
                  </Field>
                  <Field label="Location" error={errors.location?.[0]}>
                    <input
                      required
                      value={form.location}
                      onChange={(e) => field("location", e.target.value)}
                      className="field-input"
                      placeholder="Pretoria / venue"
                    />
                  </Field>
                </div>

                <Field label="Special requests / vision" error={errors.vision?.[0]}>
                  <textarea
                    value={form.vision}
                    onChange={(e) => field("vision", e.target.value)}
                    className="field-input min-h-[100px] resize-y"
                    placeholder="Mood, must-have shots, guest count…"
                  />
                </Field>

                {status === "error" && message && (
                  <p className="rounded-xl border border-brand-red/40 bg-brand-red/10 px-3 py-2 text-sm text-red-200">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Submit enquiry"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-cream/55">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
