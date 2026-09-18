# Commitment Decision System

A repeatable Capture → Score → Decide → Review tool for deciding what earns
the right to remain in your life, instead of re-litigating it from scratch
every time. Works fully offline on your browser's local storage; sign in
with just an email to sync the same data across devices (see Cloud sync
below).

## The system

1. **Inventory** (Page 1) — one line per commitment, business,
   responsibility, system, project, or recurring obligation. No decisions
   yet.
2. **Scorecard** (Page 2) — per item: purpose, hours/month, money produced
   or saved, mental load, family impact, strategic importance, the five
   scored questions (0–2 each), the three −2 penalties, and an adjusted
   score. Ends in a decision: KEEP / GROW / DELEGATE / SIMPLIFY / PAUSE /
   KILL. GROW is hard-capped at 5.
3. **Portfolio** (Page 3) — every item sorted into its six-box view. This
   is the real output of the exercise.
4. **Constraints** (Page 4) — the standing rules for the season: max
   active business bets, max volunteer leadership roles, max hours/month
   donated, minimum protected family time and exercise, the primary
   economic engine, three things explicitly not being pursued, and what
   "enough" looks like.
5. **Review** — a monthly, six-question, 30-minute check-in, logged with
   history. A new recurring commitment must replace an old one.

Recommended first pass: Session 1 (60 min, capture only), Session 2 (90
min, score and classify), Session 3 (60 min, prune at least three items).
After that it's a monthly review, not another project to maintain.

Each page is printable (`Cmd/Ctrl+P`) with the tab navigation hidden.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- `localStorage` always; optionally synced to Supabase (Postgres + auth,
  no server to run) when configured

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # tsc -b && vite build, outputs to dist/
npm run preview # serve the production build locally
```

## Deploy

`dist/` is a static build with no server-side requirements — deploy it to
any static host (Netlify, Vercel, Cloudflare Pages, S3+CDN, etc.). If you
want cloud sync in production, set the same two env vars (below) in the
host's build environment.

## Cloud sync (optional)

Without any setup, the app is fully functional on `localStorage` alone —
each browser/device has its own independent copy. To sync the same data
across devices, wire up a free Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql` from this repo — it
   creates one `app_state` table with row-level security so each user can
   only read/write their own row.
3. In **Authentication → Providers**, make sure **Email** is enabled with
   the magic-link (OTP) flow (it is by default).
4. In **Settings → API**, copy the **Project URL** and **anon public
   key**.
5. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`. Restart `npm run dev` after adding it.
6. Set the same two variables in your static host's environment for
   production builds.

Once configured, a "Sync across devices" box appears in the nav bar —
enter an email, click through the magic link it sends, and that
browser's data is pushed up. Signing in on another device/browser pulls
the same data down and keeps both in sync from then on.
