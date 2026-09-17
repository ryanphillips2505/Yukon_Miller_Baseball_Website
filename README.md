# Yukon Miller Baseball

Program site for Yukon High School baseball — Home of the Millers. Built to replace the live Wix site at [yukonbaseball.com](https://www.yukonbaseball.com) when Ryan is ready. Wix and DNS stay untouched until then.

## Run locally

```bash
npm install
npm run dev
```

Dev server defaults to **http://127.0.0.1:43217**.

```bash
npm run build
npm start
```

## What is live in this first slice

- Brand start is the Yukon Baseball primary mark (YM inside the Oklahoma outline)
- Home, schedule, roster, coaches, news, recruiting, camps, alumni, Home Run Club, fan info, facilities, records, media, and contact
- Real program copy from the current public site (staff names, fields, HRC officers, sponsorships, commit board, TCA store code)
- Empty states for schedule, roster, photos, camps, alumni, records, and media — no fake games or fake player photos

## Adding content later

Edit the typed files in `src/lib/`:

- `schedule.ts` — `games`
- `roster.ts` — `players`
- `coaches.ts` — optional `photo` paths under `/public/images`
- `commits.ts` — commit board names, schools, and baseball logos
- `news.ts` — articles and commit announcements
- `support.ts` — HRC and sponsorships

Drop images in `public/images/` and point the `photo` fields at them.
