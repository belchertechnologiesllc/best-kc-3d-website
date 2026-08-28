# BEST-KC — Kansas City Wedding Design & Boutique Florals

"The Cutting Room" — a scroll-driven 3D web experience built with React
Three Fiber, GSAP ScrollTrigger, and Tailwind CSS.

## Stack

- Vite + React + TypeScript
- React Three Fiber + drei — the hero's brass-and-glass vitrine, live only
  on desktop/capable devices and lazy-loaded out of the main JS bundle
- GSAP + ScrollTrigger (CustomEase `settle`/`spring`) — the scroll-scrubbed
  camera dolly, five-stage bouquet build, and every scroll/hover reveal
- Tailwind CSS v4

## Mobile & low-power fallback

Below 768px, on devices reporting `deviceMemory < 4`, or without WebGL,
the hero swaps the live canvas for `MobileHeroFallback`: six pre-rendered
JPEG keyframes (`public/hero-frames/`) cross-faded by the same
scroll-driven `buildProgress` state the 3D scene reads, so the build still
advances with scroll at near-zero GPU/JS cost. Regenerate these frames
after any visual change to the vitrine/bouquet by loading the dev build
with `window.__FORCE_3D__ = true` injected before a mobile-viewport
capture (see git history for the capture script), scrolling through the
five stage boundaries, and screenshotting the canvas region.

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
any static host (Netlify, Vercel, Cloudflare Pages, S3+CDN, etc.) by
pointing the host at the build command (`npm run build`) and output
directory (`dist`). Update the canonical/OG URLs in `index.html` and
`public/robots.txt` / `public/sitemap.xml` if the production domain
differs from `best-kc.com`.
