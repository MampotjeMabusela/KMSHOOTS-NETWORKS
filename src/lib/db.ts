import { promises as fs } from "fs";
import path from "path";
import type { BookingInput, ContactInput } from "./validations";

/** On Vercel the app filesystem is read-only; use /tmp for ephemeral lead storage. */
const DATA_DIR =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "kmshoots-data")
    : path.join(process.cwd(), "data");

export type BookingRecord = BookingInput & {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "booked";
};

export type ContactRecord = ContactInput & {
  id: string;
  createdAt: string;
};

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as T;
    return parsed;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

function createId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function saveBooking(
  input: BookingInput,
): Promise<BookingRecord> {
  const bookings = await readJson<BookingRecord[]>("bookings.json", []);
  const record: BookingRecord = {
    ...input,
    id: createId("bk"),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  bookings.unshift(record);
  await writeJson("bookings.json", bookings);
  return record;
}

export async function saveContact(
  input: ContactInput,
): Promise<ContactRecord> {
  const contacts = await readJson<ContactRecord[]>("contacts.json", []);
  const record: ContactRecord = {
    ...input,
    id: createId("ct"),
    createdAt: new Date().toISOString(),
  };
  contacts.unshift(record);
  await writeJson("contacts.json", contacts);
  return record;
}
