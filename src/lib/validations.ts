import { z } from "zod";
import { EVENT_TYPES } from "./constants";

const eventTypeSchema = z
  .string()
  .trim()
  .min(1, "Select an event type")
  .refine((value) => (EVENT_TYPES as readonly string[]).includes(value), {
    message: "Select a valid event type",
  });

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  eventType: eventTypeSchema,
  date: z.string().trim().min(1, "Select a preferred date"),
  location: z.string().trim().min(2, "Enter a preferred location"),
  vision: z.string().trim().max(2000, "Keep notes under 2000 characters").optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, "Enter a subject"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;
