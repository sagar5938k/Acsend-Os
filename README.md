# ASCEND OS

**Build Yourself. Every Day.**

A personal Life Operating System PWA: habits with timers, a GPS running tracker, a nightly journal, goals, analytics, a permanent calendar, and a full XP/level/badge gamification layer — all stored offline-first in IndexedDB. No login, no backend, no account.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173` in your desktop browser first to sanity-check it. To test on your **phone** on the same Wi-Fi:

```bash
npm run dev -- --host
```

Then open the `http://<your-computer-ip>:5173` address shown in the terminal, on your phone's browser.

## 2. Install it as a real PWA on Android

A dev server won't let Chrome install it properly (PWAs generally require HTTPS). To get the real "Add to Home Screen" experience:

1. Build it: `npm run build` (outputs to `dist/`)
2. Deploy `dist/` to any static host with HTTPS — **Vercel**, **Netlify**, **Cloudflare Pages** or **GitHub Pages** all work and are free for this. Easiest path:
   ```bash
   npm install -g vercel
   vercel deploy --prod
   ```
3. Open the deployed HTTPS URL on your Android phone in Chrome.
4. Chrome will show an "Add to Home Screen" / install prompt (or use the ⋮ menu → "Install app").
5. Once installed, it opens full-screen with no browser chrome, has its own icon, and works offline after the first load.

## 3. What's real vs. what needs attention

This is a genuine, working codebase — not a mockup — but a few things are worth knowing before you treat it as your daily driver:

**Works as built:**
- Habit timers (start/pause/resume/complete), subtasks, notes, daily history — persisted to IndexedDB via Dexie.
- Running tracker using the real `navigator.geolocation.watchPosition` API: live distance (haversine), speed, pace, splits, calories, route points, saved permanently to run history with charts.
- Nightly journal, Goals/purpose page, Creation Meter logging, Creation vs Consumption chart.
- Daily scoring engine, streaks, XP/leveling (1–100), badges, lifetime dashboard, permanent calendar with day drill-down.
- Full offline support, JSON export/import, PWA manifest + service worker (via `vite-plugin-pwa`) for installability and offline caching.

**Real-world constraints, not code bugs:**
- **Background GPS tracking is a hard OS/browser limitation.** No web app — installed or not — can reliably track your run once the screen locks or you switch apps on Android. The tracker works great with the screen on and the app in the foreground, exactly as you described using it (phone in hand). True background tracking would require a native Android app (Kotlin + Foreground Service), which is a different project.
- **Step counting** uses a simple accelerometer-peak heuristic (`devicemotion`), since there's no real "pedometer API" on the web. It's a reasonable estimate, not lab-grade.
- **Weather** uses the free Open-Meteo API (no key needed) and requires location permission + internet; it fails silently if offline, which is intentional (it's a nice-to-have, not core).
- **Data lives only in this browser's IndexedDB.** If you clear site data, uninstall the PWA, or switch phones, that data is gone unless you've exported a backup — use Settings → Export regularly. The architecture (a single `exportAllData()`/`importAllData()` pair in `src/db/database.ts`) is intentionally simple so you can wire up Google Drive sync later by just uploading/downloading that JSON blob.
- **Icons are placeholders.** `public/icons/*.png` are simple generated stand-ins so the manifest is valid; swap in your real mountain-peak logo at 192×192, 512×512, and a maskable 512×512 before shipping.
- **Fonts**: the config references "Clash Display" / "General Sans" for the premium type pairing described in the brief — these aren't bundled (they're paid/licensed fonts). Add your own `@font-face` in `index.css` or swap the Tailwind `fontFamily` config to fonts you have rights to (e.g. self-host from Fontshare, which offers free equivalents).

## 4. Project structure

```
src/
  db/database.ts       Dexie schema, seed data, export/import
  types/                Shared TypeScript types
  lib/xp.ts             Pure scoring/leveling/streak/pace math (unit-testable)
  lib/aggregate.ts       Derives DayRecord + streak/XP from raw sessions
  components/           Layout, HabitCard, Timer
  pages/                Dashboard, Habits, DeepWork, Running, Journal,
                         Goals, Calendar, Analytics, Gamification, Settings
```

## 5. Where to go next

- Wire the reminder times in Settings to real notifications via the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) (requires a small backend to send pushes, even for local reminders on some browsers — or use `Notification` + `setTimeout`/service worker `periodicSync` for a lighter version).
- Add end-to-end encryption of the IndexedDB payload if you want the "secure local data encryption" from the original brief — e.g. encrypt the JSON blob with a passphrase-derived key (Web Crypto `SubtleCrypto`) before writing, decrypt on read.
- If background run-tracking matters enough to you, that's the point where I'd recommend scaffolding a native Android companion (Kotlin, or React Native/Expo with a foreground location service) instead of a PWA.
