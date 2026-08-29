# TNPSC GS — வெற்றிப் பயணம்

Study companion for the [TNPSC GS](https://www.youtube.com/@tnpscgs) YouTube classroom: Samacheer Kalvi lessons, quizzes, exam alerts, a live upload feed from the channel, and Google AdSense slots.

Stack: React 19, TanStack Start, Vite, Tailwind v4, Nitro (Vercel preset).

## Requirements

- Node.js 22+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). Progress, saved lessons, quiz scores, and the AdSense publisher ID stay in the browser (`localStorage`).

```bash
npm run typecheck
npm run build
```

## Deploy on Vercel

This app already builds with Nitro’s Vercel preset (`.vercel/output`).

**From the Vercel dashboard**

1. Push this folder to a GitHub/GitLab repo
2. [Import the project](https://vercel.com/new)
3. Framework: Other (or leave auto)
4. Build command: `npm run build`
5. Node.js version: `22.x`
6. Deploy

**From the CLI**

```bash
npm i -g vercel
npx vercel
```

No database is required. Auth is unused on this site.

### Environment variables (optional)

| Name | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres URL. Skip it — the app falls back to PGLite. |
| `VITE_AUTH_ENABLED` | Set to `false` if you want the scaffolded auth stack fully off. |

Do not put secrets in `VITE_` variables; they ship to the browser.

## Google AdSense

Publisher `ca-pub-4969760229513434` and the four display units are already in `src/lib/adsense.ts` and `public/ads.txt`. After you deploy, add the Vercel domain in [AdSense → Sites](https://www.google.com/adsense/) and keep Auto ads on.

```
google.com, pub-4969760229513434, DIRECT, f08c47fec0942fa0
```

## Deploy on another host

Nitro is set to `preset: "vercel"` in `vite.config.ts`. For a Node server:

1. Change that preset to `"node-server"`
2. `npm run build`
3. Run the generated server (Nitro prints the start command)

For Netlify / Cloudflare, use the matching [Nitro preset](https://nitro.build/deploy).

## Project map

| Path | What it is |
| --- | --- |
| `src/routes/` | Pages (home, live uploads, lessons, quizzes, alerts, AdSense) |
| `src/lib/data.ts` | Channel, lessons, quizzes, alerts |
| `src/lib/youtube.server.ts` | Live YouTube upload feed |
| `src/lib/store.ts` | Saved / watched / scores |
| `src/lib/adsense.ts` | Publisher ID + slot config |
| `public/images/` | Lesson stills and brand art |
| `public/ads.txt` | Authorized Digital Sellers file |

YouTube and lesson data are already pointed at [@tnpscgs](https://www.youtube.com/@tnpscgs).
