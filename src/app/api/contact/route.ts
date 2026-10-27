import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { saveContact } from "@/lib/db";
import { sendContactEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

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

    const record = await saveContact(parsed.data);
    const email = await sendContactEmails(record);

    console.info("[api/contact] saved", {
      id: record.id,
      subject: record.subject,
      emailSent: email.sent,
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      emailSent: email.sent,
      emailNote: email.reason,
    });
  } catch (error) {
    console.error("[api/contact] failed", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send message right now" },
      { status: 500 },
    );
  }
}
