# KMSHOOTS NETWORKS (PTY) LTD

Cinematic marketing site for a professional photography, videography, and business marketing agency based in Pretoria / Gauteng.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** + **Framer Motion**
- **Lucide React** icons
- **Route Handlers** for booking & contact (`/api/book`, `/api/contact`)
- **JSON file store** (`data/bookings.json`, `data/contacts.json`)
- **Resend** for email notifications (optional)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Enables confirmation emails (bookings still save without it) |
| `EMAIL_FROM` | Verified Resend from-address |
| `EMAIL_TO` | Studio inbox for new leads |

## Contact wired in the UI

- WhatsApp: `+27 63 725 7595` with pre-filled enquiry message
- Call: `063 725 7595` / `066 214 5479`
- Email: studio addresses via `mailto:`
- Map: Pretoria / Gauteng embed on Contact

## Deploy on Vercel

1. Import [MampotjeMabusela/KMSHOOTS-NETWORKS](https://github.com/MampotjeMabusela/KMSHOOTS-NETWORKS) in the Vercel dashboard.
2. Framework preset: **Next.js** (auto-detected).
3. Add env vars from `.env.example` (`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`) if you want email notifications.
4. Deploy.

Note: booking/contact JSON storage is ephemeral on Vercel (`/tmp`). Wire Resend (or a database) for production lead capture.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
