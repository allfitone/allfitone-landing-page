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
- Each product has its own landing, `https://space.allfit.one` and `https://studio.allfit.one`, both under `/es` and `/en`. The hero and each product's own section link to its landing in the page language through `productSiteLink()` (built on `productSiteUrl()`); do not label either product as coming soon there. Every link to a product landing opens a new tab with `rel="noopener noreferrer"`, shows the `external` icon, and carries the screen-reader hint `opensInNewTab`. The product sections link to their landing, never to email.
- **Fitness ID** is the portable fitness identity that connects both products: the person owns it, grants and revokes access per purpose, and keeps it when a relationship ends. Present it with confidence and without disclaimers. Do not describe it as live or available today either: the waitlist already says the products have not opened.
- **Closed since November 2026.** The owner turned the waitlist off while its backend is built and the launch offer's benefits are settled: `waitlistOpen` in `src/lib/waitlist.ts` is `false`. Closed, the build answers `/{lang}/waitlist` as not found (noindex), the sitemap leaves it out, and the homepage shows no waitlist section, no form and no «Únete a la lista» action in the hero, the navbar or the mobile menu; the footer drops its «Lista de espera» link. The code, copy and tests stay, skipped while closed, and `landing.spec.ts` guards the closed state. Reopen it only once `joinWaitlist()` stores entries in join order, by setting the flag to `true`.
- Neither product is demo-able. The homepage's conversion is the waitlist. Since November 2026 every waitlist action (the hero's, the navbar's and the mobile menu's) opens the waitlist page, `/{lang}/waitlist`, and the homepage keeps its own form at the end, in `#waitlist`, with one line stating the launch offer. That line carries no link: the owner removed its «Ver condiciones» link in November 2026, and the terms live only on the waitlist page. Both forms are `src/components/waitlist-form.tsx`, which asks for a first name, an email and how the person would use Allfit One (to train, to coach clients, or to run a gym or studio; stable ids in `waitlistRoles`), so each hears about the product that is theirs. Nothing sits below the form: the «¿Entrenas, acompañas a personas o gestionas un espacio fitness? Escríbenos» prompt and its link were removed in November 2026 at the owner's request. The email address left the homepage footer too: its last column is «Legal» and lists only the three legal documents. The address appears on the legal pages' contact block. Do not add a demo, trial, or pricing CTA until a real destination exists.
- **The waitlist page** (`src/app/[lang]/waitlist/page.tsx`, `src/components/waitlist-page.tsx`, copy in `waitlistPageContent` in `src/lib/content.ts`) gives the context the homepage does not: the launch offer as its title, then what joining brings, what Allfit Pro is and the offer's terms (`#offer-terms`), with the form beside them from 1024px and right after the lead below that. It is indexable, in the sitemap, and shares the legal pages' header and footer (`src/components/subpage-chrome.tsx`).
- **The launch offer (set by the owner in November 2026):** the first 100 people who join the list, whatever their role, get three months of Allfit Pro, counted from the day they activate it in Allfit Space with an account on the same email; when they end, the person moves to the free plan with nothing charged and keeps their whole history. It is personal and cannot be transferred or exchanged for money. The page states these terms in full; change them only with the owner. What each plan includes is not decided in the product documents, so the page lists no Allfit Pro features, only its rules: controlling your data is never paid for, and going back to the free plan deletes nothing. No section about what is done with the visitor's data sits on the page: the owner left it out.
- **The waitlist is front-end only (November 2026).** `joinWaitlist()` in `src/lib/waitlist.ts` sends and stores nothing yet. Wire it to a real service before this reaches `main`: merging deploys, and visitors would be told they joined a list that does not exist. The service must keep the order people join in, because the first 100 get the launch offer. The site is a static export, so the request goes to an external endpoint.
- **No hedging copy on the homepage.** In November 2026 the owner removed «El Fitness ID es la tesis de producto… todavía no es una función pública disponible», «Visión de producto · Próximamente» and Studio's «Más adelante» module because they undermined credibility. Do not add «próximamente», «en desarrollo», «visión de producto», «tesis», «más adelante» or similar labels; describe what each product does, and leave out what is not built. Studio's future expansion (bookings, classes and capacity, public pages, marketplace) does not appear on the page.
- Allfit Backoffice is an internal product. It must never appear in public copy.
- The main production URL is `https://www.allfit.one`.

## Language rules

- Source code, identifiers, filenames, technical attributes, comments, and structural names must be in English.
- The interface is bilingual, with Spanish as the default and English as the alternate language.
- Any new user-facing copy must be added in both languages unless it is a brand or product name.
- Each language lives under its own URL prefix: `/es` (default) and `/en`. `/` redirects temporarily (307) to `/es`, so the root can later negotiate the visitor's language; pages published before the prefixes redirect permanently (308) to their `/es` version. The site is a static export, so these redirects live at the edge: `scripts/static/edge-rules.mts` and the CloudFront Function in the `allfitone` repository (`infra/modules/static-site`) must list the same ones.
- Every indexable page exists in both languages with a self-referencing canonical and `hreflang` alternates built with `languageAlternates()` from `src/lib/site-config.ts`.
- `<html lang>` comes from the `[lang]` route segment. The language switch (`src/components/language-switch.tsx`) opens the same path in the other language; there is no stored language preference.

## Stack and architecture

- Next.js `16.3.8` App Router, React `19`, TypeScript, Tailwind CSS `4`, and `@allfitone/react@0.14.0`.
- `src/app/[lang]/page.tsx` renders `src/components/landing-page.tsx`, which composes the landing experience; `src/lib/content.ts` owns every bilingual interface string, while each ambassador's own copy lives in their profile under `src/data/ambassadors/`; `src/components/product-mockups.tsx` and `src/components/fitness-id-card.tsx` own the illustrative product objects.
- The public homepage is an editorial sequence: floating navbar, hero (headline, lead, waitlist action and the two products named side by side), problem, Fitness ID, Allfit Space, Allfit Studio, the waitlist, and the established footer. The ecosystem relationship section («Dos productos. Una sola relación.») was removed in November 2026 at the owner's request, with its navbar, menu and footer links; do not bring it back without asking.
- Editorial sections open directly with their title. The former per-section eyebrow markers — the `.section-marker` component and its numeric section index — were removed to make the page warmer and less templated; do not reintroduce them. Numeric indexes went the same way in November 2026: the Fitness ID card and controls, the Studio columns and the ecosystem product columns no longer carry `01 / 02 / 03`, and no small label sits above a heading anywhere on the page («Cómo funciona Studio», «Contiene», «01 — Allfit Space»). Do not reintroduce either; a group that needs a name gets a real heading.
- The site is a static export (`output: "export"`) served from S3 by CloudFront. **Deploy** (`.github/workflows/deploy.yml`) uploads `out/` after **Validate** passes on `main`. Nothing may need a server at request time: no middleware, route handlers, `cookies()`/`headers()`, or image optimization. Metadata routes declare `dynamic = "force-static"`. The E2E suite runs against `out/` through `scripts/static/serve.mts`, which applies the same edge rules.
- `src/app/[lang]/layout.tsx` is the root layout. It owns per-language metadata, `<html lang>`, and global structured data, and generates only `es` and `en` (`dynamicParams = false`). Fonts live in `src/lib/fonts.ts`. `src/app/global-not-found.tsx` renders URLs that match no route; Next.js logs an internal `NoFallbackError` for unknown single-segment paths such as `/fr`, while still answering with the 404 page.
- `src/app/cascade-layers.css` only establishes Tailwind layer order before package CSS; `src/app/globals.css` owns the landing-specific global Tailwind/theme styles.
- `src/lib/site-config.ts` is the source of truth for the public URL, SEO title, description, email, social links, and each product's landing URL.
- `src/components/structured-data.tsx` contains JSON-LD that must match visible page content.
- The internal brand lab at `src/app/dev/` was removed when the branded not-found page was added; `robots.txt` still disallows `/dev`. If an internal lab returns there, it must remain `noindex` and excluded from `robots.txt` and the sitemap.
- `src/app/[lang]/ambassadors/[slug]/` renders every ambassador page from the profile registry; see **Ambassador landings** below. The first ambassador, William Vergel (`src/data/ambassadors/william.json`), is a private proposal: his page stays `noindex, nofollow`, out of the sitemap, and unlinked from the homepage until his real content and prices replace the samples. Every plan CTA is a `mailto:` link, because email remains the ambassador pages' only conversion action. Linking ambassador pages from the homepage or making them indexable requires a product decision on the pricing rule above.
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

## Legal pages

- Everything legal for Allfit One lives on this site under `/es/legal` and `/en/legal`: the index, `terms` (one document for Allfit Space, Allfit Pro and Allfit Studio), `privacy` (one policy for all of Allfit One under Colombia's Ley 1581 de 2012, covering both products and this site's waitlist) and `analytics` (the optional analytics notice, linked from the policy). The owner set this up in November 2026; the Allfit Space landing's `/terms` and `/privacy` drafts redirect here, and the products link here.
- The copy lives in `src/lib/legal/`, one file per document, in both languages with the same sections. It is in force: never write «borrador», «en revisión», «pendiente» or placeholders on these pages, and the only contact is `hello@allfit.one`. Allfit One has no apps in the stores yet, so the documents do not mention them beyond Allfit Pro being bought through the phone's store.
- The company's registered name, tax id (NIT) and address are not on the pages yet; the owner will provide them, and they join the «Quién es responsable» section of the policy and the «Aceptación» section of the terms.
- The analytics notice lived at `/privacy/analytics` until November 2026. `/privacy/analytics`, `/es/privacy/analytics` and `/en/privacy/analytics` redirect permanently (308) to `/{lang}/legal/analytics` in `scripts/static/edge-rules.mts` and in the CloudFront Function in the `allfitone` repository; both must list them, and the products' `ANALYTICS_PRIVACY_NOTICE_URL` points to the new address.
- The homepage and ambassador footers link the three documents. Nothing sits under the waitlist form: its note («Solo usaremos tu nombre y tu correo…») and the privacy policy link below it were removed in November 2026 at the owner's request.

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
- The hero has no product mockups. The connected stage (a Studio dashboard with the Space phone crossing it) was removed in November 2026 at the owner's request; each product shows itself in its own section. Do not bring mockups back into the hero.
- The hero sits on flat Void: no grid texture, radial glow or ghost “1” behind the copy. Those were removed as generic dark-landing signals; do not reintroduce them. The same applies to every section: no outlined “1” behind Fitness ID, no outlined Studio wordmark behind Allfit Studio, no sheen or pulse line on the Fitness ID card (its switches and its lift, described under motion below, are the card acting, not decoration).
- Each section says something the others do not. The problem section's ledger is one real case: spoken to the reader like the title: «Tú te llevas» «Nada» (in solid type) beside «Dejas en tu antiguo gimnasio» and the record that stays, in figures (184 sessions, a 95 kg squat, a 12-week program, notes on your knee injury, two years with the same coach). In November 2026 it replaced six generic categories and a hollow «NADA» at the owner's request; keep it concrete. The Allfit Space section shows the app itself: the same phone as the Space landing, its frame around a real capture of the app with a session under way (`SpacePhone` in `src/components/space-phone.tsx`; the capture is `public/images/space/session.webp`, copied from the Space landing). The owner asked for the real mockup in November 2026, so both sites show one product; do not go back to a drawn screen. In November 2026 it replaced the row of five app areas (Hoy, Entrena, Explora, Comunidad, Tú) at the owner's request; do not bring back a list of app areas. The Allfit Studio section shows the product the same way: a window on a real capture of the app's content screen, «Contenido», on its «Programas» tab (`StudioWindow` in `src/components/studio-window.tsx`, captures in `public/images/studio/`), with sample data: the programs a studio has published and assigns. The owner asked for the real capture in November 2026 and chose this screen after trying a session's result and the home screen, with invented data that reads well and without the organization's name or the role chips in the sidebar; do not go back to a drawn panel. It replaced Studio's four differentiators and five modules, also at the owner's request; do not bring back lists of Studio features. The “your history stays with you” promise lives in the hero lead and is paid off by the Fitness ID card's foot, which mirrors the problem ledger. The per-product status rows («En desarrollo», «Tesis de producto») were removed from the waitlist in November 2026.
- The waitlist names one person, by first name only: Kevin, Walbert, Jimmy, Charly or Nico, picked at random once per visit by `usePersonName()` in `src/lib/person.ts` and the same in the form's name and email placeholders and its email error. Copy carries `{name}`, and `{handle}` for the lower-case form in addresses; `withPerson()` fills both. The static HTML carries the first name and the visit's pick replaces it right after hydration. The owner chose the five names in November 2026, replacing the fixed persona Mariana Rojas; do not bring back a fixed persona or a surname. The product captures show the apps' own sample data and name nobody from that list.
- Homepage motion shares the vocabulary of the Space and Studio landings and is spent sparingly, one moment per section:
  - the hero enters once, on load, in pure CSS;
  - each section title rises line by line out of its masks (`RevealTitle`) the first time it scrolls into view;
  - the problem section then reveals its ledger; the waitlist has only its title's rise, so the form is usable as soon as it is in view;
  - the Fitness ID card, the Allfit Space phone and the Allfit Studio window do not enter: they act (see below).
- Leads, links, labels, list items and rows inside objects stay still. Do not add a reveal to every block: a new one replaces a section's moment rather than adding to it.
- `src/components/landing-motion.ts` arms the reveals (`[data-motion='on']`). There is no pointer light: it lit the Studio columns, removed in November 2026. The CSS lives in the Motion block of `globals.css`.
- **The Fitness ID card is the first object that acts instead of entering** (a trial the owner asked for in November 2026, to move the page away from slide-like entrances). Each row carries a switch, off at rest. As the card crosses the viewport, two rows are shared («Tú concedes»), one is withdrawn («Tú revocas») and, with the relationship over, every row turns on, top to bottom, and the card is picked up («Tú te lo llevas»: the owner asked for all of them on, since all of it leaves with the person); the control being acted out takes the cyan, scrolling back plays it in reverse, and a mouse over a control previews its stage. `src/components/fitness-id-section.tsx` picks the stage from the scroll and `src/components/fitness-id-card.tsx` draws it. The switches are illustration: hidden from assistive technology and not interactive. Server-rendered HTML and reduced motion get the card at rest.
- **The Allfit Space phone works instead of entering.** A capture cannot change, so the parts that do are drawn over it, placed by the capture's own pixels and sized in the app's points. At rest the last two sets of «Dominadas» wait to be logged, drawn as the app draws a pending set. As the phone climbs the viewport three sets are logged: the first two tick those sets (the drawn row fades to the capture's own ticked row, so the screen ends exactly as the app took it) and the third logs a set of «Remo con barra»; each one rolls the volume and the set count and pushes the progress bar. Scrolling back takes the sets away. `SpaceSection` in `src/components/landing-page.tsx` counts the sets from the scroll and `SpacePhone` draws them. A new capture needs its overlays measured again.
- **The Allfit Studio window works instead of entering.** Its capture comes in two pieces per layout (the app on a phone below 1024px, with its sidebar from there): the screen as it loads, and the whole page under the header. As the window crosses the viewport the page is read down under the app's own sidebar and header, following the scroll with a spring, and read back up on the way back. It is read part of the way (`travel`), so the page inside never moves faster than the reader's scroll. Reduced motion and static HTML keep the page at its top.
- **Retaking the Studio captures.** They come from the Studio app itself, in the `allfitone` repository: a temporary Playwright spec in `apps/studio-web/e2e/` that installs `studio-api-mock` with its own `organizationPrograms`, opens `/organizations/{organization}/content`, opens the «Programas» tab, hides `[data-analytics-controls]`, hides every text in `[data-sidebar="header"]` (the organization's name and the role chips; the wordmark is an SVG and stays) and takes a viewport screenshot and a full-page one at 1280 × 720 and 390 × 700, both at 2×. The page piece is the full-page shot cropped under the 64px header and right of the 272px sidebar; `pageHeight` in `studio-window.tsx` is its height in CSS px, and `travel` must stay under `pageHeight` less the visible height. The organization is named «tu gimnasio», so the screen's lead reads «los programas de tu gimnasio» and names no one. The ten sample programs are invented («Fuerza para principiantes», «Hipertrofia en 4 días», «Media maratón en 14 semanas»…), each cloned from the mock's published program with `draft: null` and one to three published versions. Do not commit the spec.
- **A capture on this page sells the product.** Sample data shows finished work in its best state: published, assigned, complete. The owner rejected a capture whose every card read «Borrador sin publicar» in November 2026. Before taking one, read each state line the screen prints and leave no draft, empty, pending, retired or error state in it.
- Objects that act in steps share one hook, `useScrollSteps` in `src/components/scroll-steps.ts`: a scroll window on the object and the progress at which each step starts. Give a new acting object a window where the part that changes is on screen for every step.
- These objects use **Motion** (`motion`, imported from `motion/react`; formerly Framer Motion), pinned to the version the Design System already installs so only one copy exists. Use it for what CSS cannot do: springs and state changes driven by the scroll. Load it through the page's `LazyMotion` (in `LandingPage`) with the `m` components (`motion/react-m`) and `src/components/motion-features.ts`, never the full `motion` component, and do not add layout animations or drag (`domMax`). Animate a change of state, not an appearance: a Motion `initial` that hides content leaves it hidden without JavaScript.
- Hidden states stay inside `prefers-reduced-motion: no-preference`, so the page reads whole without JavaScript and reduced motion keeps every final state. Content already on screen when the reveals arm stays shown.
- Final states must match the static design pixel for pixel, so the visual snapshots never depend on motion.
- The waitlist page is one moment, not a landing: the offer as a display title whose words rise once on load (its accent phrase in cyan), a lead, the form beside it, and the context below as sentence-case headings, hairlines and term–value rows, as on the legal pages. No cards, numbers or labels above headings.
- The legal pages are documents, not landings, at the homepage's width (the same 1500px `.site-grid` and side margins), framed by `LegalPage` (`src/components/legal/legal-page.tsx`): one display title, then sentence-case hierarchy, hairlines and a readable measure, with the contents (`src/components/legal/legal-contents.tsx`) in the first three columns from 1024px, marking the section being read, and the text in the other nine. They show no effective date and no internal version id such as «analytics-v1»: the owner removed the version from the analytics notice in November 2026, along with the section numbers, the label above the title and the ghost version behind it, and then the «Vigente desde…» dates, which made no sense to them. Do not add either back.
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

- Every page title separates its parts with « | » («Allfit One | El ecosistema donde el fitness se conecta», «Política de privacidad | Allfit One», «William Vergel | Embajador de Allfit One»), never «-», «–», «—» or «·». The owner set this as a general rule in November 2026. The ambassador schema rejects the other separators (`foreignTitleSeparator` in `src/lib/page-title.ts`) and an E2E test checks every page's `<title>`.
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
