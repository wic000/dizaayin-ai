# Optimall Design Telegram Mini App

Production-oriented Telegram Mini App for AI-generated commercial visuals focused on mobile sellers in Uzbekistan.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL / Supabase Postgres
- Supabase Storage
- Google AI Studio server-side integration

## Folder Structure

```text
app/
  api/
    admin/
    auth/
    cron/
    generations/
    premium-orders/
    profile/
    templates/
    upload/
  admin/
  create/
  history/
  premium/
  profile/
  templates/
  globals.css
  layout.tsx
  page.tsx
components/
  providers/
  ui/
  auth-guard.tsx
  generation-card.tsx
  home-page.tsx
  image-upload.tsx
  mobile-shell.tsx
  option-chips.tsx
  section-header.tsx
  stat-card.tsx
  telegram-back-button.tsx
  telegram-theme-sync.tsx
  template-card.tsx
hooks/
  use-telegram-webapp.ts
lib/
  auth/
  server/
  services/
  translations/
  validation/
  api.ts
  constants.ts
  prisma.ts
  seed-data.ts
  telegram.ts
  utils.ts
prisma/
  schema.prisma
  seed.ts
```

## Features

- Telegram Mini App startup with `window.Telegram.WebApp`
- Mobile-safe layout with safe-area handling and sticky bottom nav
- Home, Create, Templates, History, Premium Order, Profile, and Admin pages
- Server-side Telegram auth session creation
- Multi-language UI: Uzbek, Russian, English
- Prompt template system
- Prompt builder for commercial design generation
- Image upload validation and Supabase Storage integration
- Generation history with rerun and download
- Premium order workflow routed to admin panel
- Admin dashboard for users, generations, premium orders, templates, settings, and announcements

## Install

1. Create a PostgreSQL database or Supabase Postgres project.
2. Create two public Supabase Storage buckets:
   - `design-uploads`
   - `design-results`
3. Copy `.env.example` to `.env.local` and fill in every variable.
4. Install dependencies:

```bash
npm install
```

## Local Run

1. Generate Prisma client:

```bash
npm run db:generate
```

2. Push schema to your database:

```bash
npm run db:push
```

3. Seed templates, settings, and announcements:

```bash
npm run db:seed
```

4. Start development:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

For local non-Telegram testing, the app can fall back to the `DEV_TELEGRAM_*` values in `.env.local`.

## Build

```bash
npm run build
npm run start
```

## Telegram Setup

1. Create a Telegram bot with BotFather.
2. Configure your Mini App URL to your deployed domain.
3. Add the same bot token to `TELEGRAM_BOT_TOKEN`.
4. Add your Telegram numeric IDs to `ADMIN_TELEGRAM_IDS` for admin access.

## Google AI Studio Notes

- All provider calls are server-side only.
- `GOOGLE_AI_STUDIO_API_KEY` is never exposed to the client.
- The provider implementation is isolated in [lib/services/ai/google-ai-studio.ts](./lib/services/ai/google-ai-studio.ts) for easy swapping later.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all environment variables from `.env.example`.
4. Set the Vercel project to use your Postgres database.
5. Run database deployment steps:

```bash
npm run db:push
npm run db:seed
```

6. Redeploy.

## Production Notes

- Admin APIs verify signed session cookies and admin Telegram IDs.
- Uploads are validated by count, MIME type, and file size.
- Generation API includes validation, basic rate limiting, timeout, and retry behavior.
- The app is intentionally mobile-first and optimized for Telegram in-app browsing.
