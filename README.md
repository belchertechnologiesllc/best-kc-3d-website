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
- `localStorage` always; optionally synced to Firebase (Auth + Firestore,
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
want cloud sync in production, set the same env vars (below) in the
host's build environment, and add that production URL as an authorized
domain in Firebase (see step 5 below).

## Cloud sync (optional)

Without any setup, the app is fully functional on `localStorage` alone —
each browser/device has its own independent copy. To sync the same data
across devices, wire up a free Firebase project:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Build → Authentication → Get started**, then enable the **Email/Password**
   provider and turn on its **Email link (passwordless sign-in)** option.
3. **Build → Firestore Database → Create database** (production mode is
   fine — the security rules below lock it down).
4. In the Firestore **Rules** tab, paste in the contents of
   `firestore.rules` from this repo and publish. It restricts each
   `appState/{uid}` document to that same signed-in user.
5. **Project settings → General → Your apps → Add app → Web**, register
   the app, and copy the config values it shows you. While there, also
   add your dev/prod URLs (e.g. `localhost`, your production domain)
   under **Authentication → Settings → Authorized domains**.
6. Copy `.env.example` to `.env` and fill in `VITE_FIREBASE_API_KEY`,
   `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and
   `VITE_FIREBASE_APP_ID` from that config. Restart `npm run dev` after
   adding it.
7. Set the same variables in your static host's environment for
   production builds.

Once configured, a "Sync across devices" box appears in the nav bar —
enter an email, click through the sign-in link it emails you, and that
browser's data is pushed up. Signing in on another device/browser pulls
the same data down and keeps both in sync from then on.
