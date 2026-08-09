# Allfit One landing page

Marketing site for the Allfit One ecosystem, with Spanish as the default language and English as an alternate language on the same static route. The public product story connects **Allfit Space** and **Allfit Studio** while keeping Space marked as coming soon.

## Stack

- Next.js 16 App Router and React 19
- Tailwind CSS 4
- `@allfitone/react@0.7.0`, pinned exactly
- Playwright and axe for interaction, accessibility, and visual regression tests

The landing remains an independent repository. It consumes released Design System packages and does not link to the Design System workspace.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. If that port is occupied, pass a free port to Next.js instead of stopping another process.

## Brand assets

React views render canonical brand components directly from `@allfitone/react/brand`. Framework-facing public SVG files are generated from `@allfitone/brand@0.2.0`:

```bash
npm run sync:brand
npm run check:brand
```

Do not edit files managed by `public/brand/reusable/.allfitone-brand-assets.json` manually.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright runs against the production server. Install Chromium once when needed:

```bash
npx playwright install chromium
```

Windows is the canonical platform for approved snapshots. Regenerate them intentionally with:

```bash
npm run test:e2e:update
```

CI validates brand synchronization, lint, TypeScript, the production build, interactions, axe, and canonical Windows screenshots.
