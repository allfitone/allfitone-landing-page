<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Allfit One project guide

## Product and brand

- The brand name is **Allfit One**, always with a space. Never write `AllfitOne` in user-facing copy.
- The tagline is exactly **“All the fitness in one place.”** Preserve its lowercase wording and final period in metadata and sentence-case contexts. Existing display treatments may render it in uppercase.
- Allfit One is an ecosystem focused on fitness, not a company that should be marketed simply as a “fitness tech company.”
- **Allfit Studio** is the administrative product for coaches, gyms, sports centers, studios, and training brands to manage clients, training, schedules, memberships, payments, and progress. Its public page is an item inside Studio, not a separate product. Do not describe a client PWA as part of Studio.
- **Allfit Space** is the personal product. It will serve people who train independently or with professionals, including strength, endurance, and hybrid athletes, gym members, and beginners.
- Allfit Space and Allfit Studio are equal products within the parent ecosystem. Do not reduce Allfit One to either product or to gym-management software.
- Each product has its own landing, `https://space.allfit.one` and `https://studio.allfit.one`, both under `/es` and `/en`. The hero links each product to its landing in the page language through `productSiteUrl()`; do not label either product as coming soon there.
- **Fitness ID** is the portable fitness identity that connects both products: the person owns it, grants and revokes access per purpose, and keeps it when a relationship ends. It is a product thesis, so the landing must keep labeling it as not publicly available.
- Neither product is demo-able. Do not add a demo, trial, waitlist, or pricing CTA until a real destination exists. Email is the only conversion action.
- Studio capabilities that are future expansion rather than V1 — bookings, classes and capacity, public pages, marketplace — may only appear under an explicit "on the way" label.
- Allfit Backoffice is an internal product. It must never appear in public copy.
- The main production URL is `https://www.allfit.one`.

## Language rules

- Source code, identifiers, filenames, technical attributes, comments, and structural names must be in English.
- The interface is bilingual, with Spanish as the default and English as the alternate language.
- Any new user-facing copy must be added in both languages unless it is a brand or product name.
- Each language lives under its own URL prefix: `/es` (default) and `/en`. `/` redirects temporarily (307) to `/es`, so the root can later negotiate the visitor's language; pages published before the prefixes redirect permanently to their `/es` version in `next.config.ts`.
- Every indexable page exists in both languages with a self-referencing canonical and `hreflang` alternates built with `languageAlternates()` from `src/lib/site-config.ts`.
- `<html lang>` comes from the `[lang]` route segment. The language switch (`src/components/language-switch.tsx`) opens the same path in the other language; there is no stored language preference.

## Stack and architecture

- Next.js `16.3.8` App Router, React `19`, TypeScript, Tailwind CSS `4`, and `@allfitone/react@0.14.0`.
- `src/app/[lang]/page.tsx` renders `src/components/landing-page.tsx`, which composes the landing experience; `src/lib/content.ts` owns every bilingual interface string, while each ambassador's own copy lives in their profile under `src/data/ambassadors/`; `src/components/product-mockups.tsx` and `src/components/fitness-id-card.tsx` own the illustrative product objects.
- The public homepage is an editorial sequence: floating navbar, connected two-product hero, problem, Fitness ID, Allfit Space, Allfit Studio, ecosystem relationship, current status and contact (with a closing email call to action), and the established footer.
- Editorial sections open directly with their title. The former per-section eyebrow markers — the `.section-marker` component and its numeric section index — were removed to make the page warmer and less templated; do not reintroduce them. Numeric indexes inside components (Fitness ID card and controls, Studio differentiators, ecosystem product columns) stay.
- `src/app/[lang]/layout.tsx` is the root layout. It owns per-language metadata, `<html lang>`, and global structured data, and generates only `es` and `en` (`dynamicParams = false`). Fonts live in `src/lib/fonts.ts`. `src/app/global-not-found.tsx` renders URLs that match no route; Next.js logs an internal `NoFallbackError` for unknown single-segment paths such as `/fr`, while still answering with the 404 page.
- `src/app/cascade-layers.css` only establishes Tailwind layer order before package CSS; `src/app/globals.css` owns the landing-specific global Tailwind/theme styles.
- `src/lib/site-config.ts` is the source of truth for the public URL, SEO title, description, email, social links, and each product's landing URL.
- `src/components/structured-data.tsx` contains JSON-LD that must match visible page content.
- The internal brand lab at `src/app/dev/` was removed when the branded not-found page was added; `robots.txt` still disallows `/dev`. If an internal lab returns there, it must remain `noindex` and excluded from `robots.txt` and the sitemap.
- `src/app/[lang]/ambassadors/[slug]/` renders every ambassador page from the profile registry; see **Ambassador landings** below. The first ambassador, William Vergel (`src/data/ambassadors/william.json`), is a private proposal: his page stays `noindex, nofollow`, out of the sitemap, and unlinked from the homepage until his real content and prices replace the samples. Every plan CTA is a `mailto:` link, because email remains the only conversion action. Linking ambassador pages from the homepage or making them indexable requires a product decision on the pricing rule above.
- The social preview image lives in `public/social/` and every page declares it through `shareImage()` in `src/lib/site-config.ts`. Metadata file conventions are not used for it: a page that sets its own `openGraph` replaces the inherited image, and the alt text must follow the page language.

## Ambassador landings

- Ambassador pages are data-driven. One route (`src/app/[lang]/ambassadors/[slug]/page.tsx`) and one template (`src/components/ambassadors/`) render every profile; never copy a page, CSS rule, or E2E spec for an individual ambassador. `docs/ambassadors/README.md` documents the system and the procedure.
- Each profile is `src/data/ambassadors/<slug>.json`, validated against `src/lib/ambassadors/schema.ts` when the site builds and by `npm run ambassador:check`. `src/data/ambassadors/index.ts` is generated; regenerate it with `npm run ambassador:check -- --write` instead of editing it.
- Add an ambassador with `npm run ambassador:new -- <intake.json>`; never by copying a `page.tsx`. New profiles start as `draft`.
- `draft` and `review` profiles render only under `next dev`. Because anything in `public/` is reachable by URL once deployed, `next.config.ts` fails every production build while a profile is unpublished or a file under `public/ambassadors/` belongs to no published profile (`src/lib/ambassadors/release.ts`); never bypass that check. Published is not indexable: every ambassador page stays `noindex, nofollow` and out of the sitemap until an explicit SEO and product decision, and `noindex` is not access control.
- Intake files and original photos stay outside the repository or in the git-ignored `ambassador-intake/` folder; only approved, published profiles and their web photos are committed.
- Preserve the `william` slug and the legacy `/ambassadors/william` redirect. Do not add an `/ambassadors` index without a product decision.
- Ambassador copy is bilingual with the same structure in both languages; shared template copy lives in `ambassadorPageContent` in `src/lib/content.ts`. Never invent biographies, certifications, testimonials, figures, or prices: missing copy stays empty and pending, which only `draft` accepts.
- Plans are keyed by stable `id`, priced in whole COP, and compared with an explicit `basePlanId`; never couple copy and numbers by array position.
- Photo framing (`focusMobile`, `insetDesktop`) reaches the CSS as variables, never as per-person selectors. The hero photo must be vertical or square (ideally 4:5), because a horizontal one sits behind the name on desktop. The edge masks were tuned on William's plain backdrop, so every new photo needs confirmed publication rights and a visual review of cropping and masks at 320 px, tablet, and desktop.
- Keep `mailto:hello@allfit.one` as the only conversion path: no checkout, payments, WhatsApp, demo, trial, or waitlist.
- After changing a profile or the shared template, run `npm run ambassador:check` together with the verification commands below.

## Visual direction

- The design should feel premium, athletic, precise, and recognizably Allfit One—not like a generic AI-generated SaaS landing page.
- Use the existing palette as the source of truth:
  - Black blue: `#030713`
  - Primary cyan: `#55EFFB`
  - Light cyan: `#68EEF4`
  - Mid turquoise: `#60D1D6`
  - Dark turquoise: `#348E94`
- Display typography uses Barlow Condensed; body typography uses Manrope through `next/font`.
- Preserve the custom “1” mark and its geometry. Do not replace it with a conventional numeral or alter its proportions casually.
- Favor disciplined typography, spacing, alignment, and editorial structure. Avoid unnecessary badges, chips, floating metric cards, decorative gradients, excessive rounded containers, and scattered animations.
- Spend visual emphasis in one place per section. Remove decoration that competes with the content hierarchy.
- Material UI changes must be checked visually at desktop, tablet, and mobile widths. Use the `frontend-design` skill when it is available.

## Component and implementation rules

- Import Design System components from explicit `@allfitone/react/components/*` subpaths and icons from `@allfitone/react/icons`.
- Keep `@allfitone/react` pinned to an exact released version. Do not link this repository to the Design System workspace.
- Import the Design System styles once in the root layout in this order: `tokens.css`, `app.css`, `styles.css`, then `globals.css`.
- For links styled as buttons, use a plain `<a>` with `buttonVariants()` from the Design System.
- Synchronize framework-facing brand assets with `npm run sync:brand`; never hand-edit files managed by `public/brand/reusable/.allfitone-brand-assets.json`.
- Use semantic HTML, a single descriptive `<h1>`, logical heading order, visible keyboard focus, adequate tap targets, and accessible labels for icon-only links.
- External links opened in a new tab must include `rel="noopener noreferrer"`.
- Prefer semantic theme tokens and existing utilities over introducing isolated color values.
- Use `gap-*` for layout spacing and `size-*` when width and height are equal.
- Avoid adding client-side JavaScript for effects that CSS can handle.
- Preserve reduced-motion behavior for any new animation.

## SEO requirements

- Each page's canonical is its own language URL, such as `https://www.allfit.one/es`. The homepage's `x-default` alternate points to the root.
- Keep the homepage positioning broad enough to represent the parent ecosystem. Product-specific keywords belong in Allfit Studio copy and future dedicated routes.
- Preserve crawlable `robots.txt`, the canonical-only sitemap, large-image social metadata, and the Open Graph/Twitter assets.
- Keep Organization, WebSite, and the Allfit Space (`MobileApplication`) and Allfit Studio (`WebApplication`) structured data accurate and consistent with visible content. Each product entry reuses the `@id` its own landing declares (`https://space.allfit.one/#app`, `https://studio.allfit.one/#app`) and points to that landing through `productSiteUrl()`, so search engines treat the landing as the product's page; never describe a product with a `www.allfit.one` URL. Do not add FAQ or Offer data while those sections are absent, and never add ratings, reviews, availability, or claims that are not present and verifiable.
- The homepage must remain indexable. Internal `/dev` content must remain `noindex, nofollow`.
- Do not add speculative `llms.txt` without a concrete distribution plan.

## Local development safety

- Before starting the development server, inspect active listeners and choose a free port.
- Never terminate, replace, or reuse another active process merely to free a preferred port.
- Start background processes with hidden windows and write temporary logs outside the repository when possible. Browser profiles and runtime caches inside the repository can be scanned by Tailwind/Turbopack and cause failures.
- Confirm the selected URL returns HTTP `200`; a listening process alone is not sufficient verification.

## Verification

Run checks proportional to the change:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

- For metadata or SEO changes, inspect the rendered HTML and verify `/robots.txt`, `/sitemap.xml`, canonical tags, social tags, and JSON-LD.
- For UI changes, verify the actual rendered page and responsive behavior—not just compilation.
- Run `npm run build` for release-sensitive or routing/configuration changes when it can be done without disrupting an active development session.
- Do not report completion while the page returns a compilation overlay or HTTP `500`.

## Git hygiene

- Preserve unrelated user changes and stage only files that belong to the requested work.
- `.codex/`, browser profiles, screenshots, logs, and temporary export artifacts are local tooling output and must not be committed.
- Do not assume permission to create a PR or change branches when the user only asks for a commit or direct push.
