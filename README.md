# Setcraft website

Marketing site for Setcraft, built with React, TypeScript, Vite and GSAP. The page follows a story-led structure: preloader, hero, ticker, Mochi, a pinned feature story, a scroll-revealed statement, languages, an "also in there" feature list, membership, FAQ, download and a large wordmark footer.

## Run

```sh
npm install
npm run dev
```

`npm run build` type-checks and writes `dist/`. `npm run preview` serves the build.

## Structure

- `src/components/mochi/Mochi.tsx` — Mochi, the AI coach, as an animated SVG. It's a direct port of the app's painter (`mobile/lib/features/onboarding/components/coach_mascot.dart`), with the same moods: listening, thinking, cheer and sleepy. Optional pointer-following eyes.
- `src/components/sections/` — one file per page section.
- `src/components/ui/` — phone frame, screen viewer dialog, store badges, brand, availability dialog.
- `src/data/content.ts` — screens, story steps, Mochi's chat script and in-app lines, the 10 languages (lines copied from the app's own translations), and FAQs.
- `src/config/site.ts` — store links, legal URLs, support email, navigation.
- `src/hooks/usePageMotion.ts` — GSAP intro, scroll reveals and the scroll-linked statement. Everything stays visible without it, and reduced motion turns it off.
- `src/styles/site.css` — tokens, base, header, phone, Mochi, dialogs. `src/styles/sections.css` — section layouts and responsive rules.
- `public/assets/app/` — real app captures with demonstration data, converted from `mobile/build/previews/`.

## Before publishing

- Add the real App Store / Google Play URLs in `src/config/site.ts`. Until then, the badges open an honest "coming soon" dialog.
- Prices are not shown. The membership card says that prices appear in the stores. Trial details follow `mobile/docs/membership-onboarding.md`.
- App screens are demonstration data, not user records. No ratings, testimonials or user counts are claimed.

Fonts: Inter and Nunito (Mochi's voice in the app). Both are served locally; their licenses are in `public/assets/`.
