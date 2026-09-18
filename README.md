# Commitment Decision System

A repeatable Capture → Score → Decide → Review tool for deciding what earns
the right to remain in your life, instead of re-litigating it from scratch
every time. Everything is entered and stays in your browser's local
storage — there is no server or account.

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
- No backend — state persists to `localStorage` in your browser only

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
any static host (Netlify, Vercel, Cloudflare Pages, S3+CDN, etc.). Because
all data lives in `localStorage`, each browser/device has its own
independent copy — there is no sync between devices.
