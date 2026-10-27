import assert from "node:assert/strict";
import { bookingSchema, contactSchema } from "./validations";

function run() {
  const booking = bookingSchema.safeParse({
    name: "Thabo Mokoena",
    phone: "0637257595",
    email: "thabo@example.com",
    eventType: "Weddings & Engagements",
    date: "2026-12-01",
    location: "Pretoria",
    vision: "Golden hour portraits",
  });
  assert.equal(booking.success, true);

  const badBooking = bookingSchema.safeParse({
    name: "A",
    phone: "123",
    email: "not-an-email",
    eventType: "Unknown",
    date: "",
    location: "",
  });
  assert.equal(badBooking.success, false);

  const contact = contactSchema.safeParse({
    name: "Boitumelo",
    email: "boi@example.com",
    subject: "Quote request",
    message: "Looking for corporate coverage next month.",
  });
  assert.equal(contact.success, true);

  const badContact = contactSchema.safeParse({
    name: "",
    email: "x",
    subject: "",
    message: "short",
  });
  assert.equal(badContact.success, false);

  console.log("validations.test.ts: all assertions passed");
}

run();
