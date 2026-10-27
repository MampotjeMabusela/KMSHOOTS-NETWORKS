import { Resend } from "resend";
import type { BookingInput, ContactInput } from "./validations";
import { BRAND } from "./constants";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function fromAddress(): string {
  return (
    process.env.EMAIL_FROM ??
    "KMSHOOTS NETWORKS <onboarding@resend.dev>"
  );
}

function toAddress(): string {
  return (
    process.env.EMAIL_TO ?? "isaackgothatsombonani28@gmail.com"
  );
}

export async function sendBookingEmails(
  booking: BookingInput & { id: string },
): Promise<{ sent: boolean; reason?: string }> {
  const resend = getResend();
  if (!resend) {
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  const teamHtml = `
    <h2>New booking enquiry — ${BRAND.name}</h2>
    <p><strong>ID:</strong> ${booking.id}</p>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Event:</strong> ${booking.eventType}</p>
    <p><strong>Date:</strong> ${booking.date}</p>
    <p><strong>Location:</strong> ${booking.location}</p>
    <p><strong>Vision:</strong> ${booking.vision || "—"}</p>
  `;

  const clientHtml = `
    <h2>Thank you, ${booking.name}!</h2>
    <p>We've received your enquiry for <strong>${booking.eventType}</strong>.</p>
    <p>Our team at ${BRAND.name} will contact you shortly to confirm details.</p>
    <p style="font-style:italic">${BRAND.tagline}</p>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: fromAddress(),
        to: toAddress(),
        replyTo: booking.email,
        subject: `New booking: ${booking.eventType} — ${booking.name}`,
        html: teamHtml,
      }),
      resend.emails.send({
        from: fromAddress(),
        to: booking.email,
        subject: `We received your enquiry — ${BRAND.name}`,
        html: clientHtml,
      }),
    ]);
    return { sent: true };
  } catch (error) {
    console.error("[email] booking send failed", error);
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "send failed",
    };
  }
}

export async function sendContactEmails(
  contact: ContactInput & { id: string },
): Promise<{ sent: boolean; reason?: string }> {
  const resend = getResend();
  if (!resend) {
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: fromAddress(),
        to: toAddress(),
        replyTo: contact.email,
        subject: `Contact: ${contact.subject} — ${contact.name}`,
        html: `
          <h2>New contact message</h2>
          <p><strong>ID:</strong> ${contact.id}</p>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || "—"}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p>${contact.message}</p>
        `,
      }),
      resend.emails.send({
        from: fromAddress(),
        to: contact.email,
        subject: `Thanks for reaching out — ${BRAND.name}`,
        html: `
          <p>Hi ${contact.name},</p>
          <p>We've received your message and will get back to you soon.</p>
          <p style="font-style:italic">${BRAND.footerQuote}</p>
        `,
      }),
    ]);
    return { sent: true };
  } catch (error) {
    console.error("[email] contact send failed", error);
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "send failed",
    };
  }
}
