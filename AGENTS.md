<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Allfit One project guide

## Product and brand

- The brand name is **Allfit One**, always with a space. Never write `AllfitOne` in user-facing copy.
- The tagline is exactly **“All the fitness in one place.”** Preserve its lowercase wording and final period in metadata and sentence-case contexts. Existing display treatments may render it in uppercase.
- Allfit One is an ecosystem focused on fitness, not a company that should be marketed simply as a “fitness tech company.”
- **Allfit OS** is the administrative product for coaches, gyms, sports centers, studios, and training brands to manage clients, training, schedules, memberships, payments, and progress. Its public page is an item inside OS, not a separate product. Do not describe a client PWA as part of OS.
- **Allfit Space** is the personal product. It will serve people who train independently or with professionals, including strength, endurance, and hybrid athletes, gym members, and beginners. Present it as coming soon until its release scope is approved.
- Allfit Space and Allfit OS are equal products within the parent ecosystem. Do not reduce Allfit One to either product or to gym-management software.
- The main production URL is `https://www.allfit.one`.

## Language rules

- Source code, identifiers, filenames, technical attributes, comments, and structural names must be in English.
- The interface is bilingual, with Spanish as the default and English as the alternate language.
- Any new user-facing copy must be added in both languages unless it is a brand or product name.
- Do not create separate `hreflang` URLs while both languages use the same client-side route.
- Keep the document language synchronized with the selected UI language.

## Stack and architecture

- Next.js `16.2.10` App Router, React `19`, TypeScript, Tailwind CSS `4`, shadcn/ui with Base UI primitives, and Lucide icons.
- `src/app/page.tsx` contains the bilingual landing experience.
- The public homepage uses a floating navbar, one connected two-product hero, dedicated product explanation sections, an ecosystem relationship section, and the established footer.
- `src/app/layout.tsx` owns root metadata, fonts, and global structured data.
- `src/app/globals.css` is the only global Tailwind/theme stylesheet.
- `src/lib/site-config.ts` is the source of truth for the public URL, SEO title, description, email, and social links.
- `src/components/structured-data.tsx` contains JSON-LD that must match visible page content.
- `src/app/dev/` is an internal brand lab. It must remain `noindex` and excluded from `robots.txt` and the sitemap.
- Static Open Graph and Twitter images live beside the root app route and use Next.js metadata file conventions.

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

- Check installed shadcn components before creating custom equivalents.
- This project uses shadcn with **Base UI**, not Radix. Confirm current component APIs before use.
- For links styled as buttons, use a plain `<a>` with `buttonVariants()`. Do not use `Button render={<a />}` with `nativeButton={false}` because it produces incorrect semantics and Base UI warnings.
- Use semantic HTML, a single descriptive `<h1>`, logical heading order, visible keyboard focus, adequate tap targets, and accessible labels for icon-only links.
- External links opened in a new tab must include `rel="noopener noreferrer"`.
- Prefer semantic theme tokens and existing utilities over introducing isolated color values.
- Use `gap-*` for layout spacing and `size-*` when width and height are equal.
- Avoid adding client-side JavaScript for effects that CSS can handle.
- Preserve reduced-motion behavior for any new animation.

## SEO requirements

- Keep the canonical URL pointed at `https://www.allfit.one`.
- Keep the homepage positioning broad enough to represent the parent ecosystem. Product-specific keywords belong in Allfit OS copy and future dedicated routes.
- Preserve crawlable `robots.txt`, the canonical-only sitemap, large-image social metadata, and the Open Graph/Twitter assets.
- Keep Organization, WebSite, and Allfit OS SoftwareApplication structured data accurate and consistent with visible content. Do not add FAQ or Offer data while those sections are absent, and never add ratings, reviews, availability, or claims that are not present and verifiable.
- The homepage must remain indexable. Internal `/dev` content must remain `noindex, nofollow`.
- Do not add speculative `llms.txt` or duplicate language URLs without a concrete distribution plan.

## Local development safety

- Before starting the development server, inspect active listeners and choose a free port.
- Never terminate, replace, or reuse another active process merely to free a preferred port.
- Start background processes with hidden windows and write temporary logs outside the repository when possible. Browser profiles and runtime caches inside the repository can be scanned by Tailwind/Turbopack and cause failures.
- Confirm the selected URL returns HTTP `200`; a listening process alone is not sufficient verification.

## Verification

Run checks proportional to the change:

```bash
npm run lint
npx tsc --noEmit
```

- For metadata or SEO changes, inspect the rendered HTML and verify `/robots.txt`, `/sitemap.xml`, canonical tags, social tags, and JSON-LD.
- For UI changes, verify the actual rendered page and responsive behavior—not just compilation.
- Run `npm run build` for release-sensitive or routing/configuration changes when it can be done without disrupting an active development session.
- Do not report completion while the page returns a compilation overlay or HTTP `500`.

## Git hygiene

- Preserve unrelated user changes and stage only files that belong to the requested work.
- `.codex/`, browser profiles, screenshots, logs, and temporary export artifacts are local tooling output and must not be committed.
- Do not assume permission to create a PR or change branches when the user only asks for a commit or direct push.
