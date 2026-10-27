import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";
import { saveBooking } from "@/lib/db";
import { sendBookingEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const record = await saveBooking(parsed.data);
    const email = await sendBookingEmails(record);

    console.info("[api/book] saved", {
      id: record.id,
      eventType: record.eventType,
      emailSent: email.sent,
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      emailSent: email.sent,
      emailNote: email.reason,
    });
  } catch (error) {
    console.error("[api/book] failed", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save booking right now" },
      { status: 500 },
    );
  }
}
