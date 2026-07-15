---
version: 0.1.0
status: foundation
name: Allfit One Design System
description: The visual and interaction system for the Allfit One ecosystem and its products.
themes:
  default: dark
  light: editorial
colors:
  void: "#030713"
  panel: "#071923"
  chalk: "#EAFFFF"
  cyan-primary: "#55EFFB"
  cyan-light: "#68EEF4"
  turquoise: "#60D1D6"
  turquoise-dark: "#348E94"
  destructive: "#E54444"
  dark:
    background-primary: "{colors.void}"
    background-secondary: "{colors.panel}"
    foreground-primary: "{colors.chalk}"
    foreground-secondary: "rgba(234, 255, 255, 0.60)"
    foreground-tertiary: "rgba(234, 255, 255, 0.40)"
    border-subtle: "rgba(234, 255, 255, 0.10)"
    border-strong: "rgba(85, 239, 251, 0.35)"
    accent: "{colors.cyan-primary}"
    accent-hover: "{colors.cyan-light}"
  light:
    background-primary: "{colors.chalk}"
    background-secondary: "#DDF7F8"
    foreground-primary: "{colors.void}"
    foreground-secondary: "rgba(3, 7, 19, 0.60)"
    foreground-tertiary: "rgba(3, 7, 19, 0.42)"
    border-subtle: "rgba(3, 7, 19, 0.15)"
    border-strong: "rgba(52, 142, 148, 0.48)"
    accent: "{colors.turquoise-dark}"
    accent-hover: "#236F75"
typography:
  display-hero:
    fontFamily: Barlow Condensed
    fontSize: "clamp(4.5rem, 12.2vw, 12.5rem)"
    fontWeight: 700
    lineHeight: 0.68
    letterSpacing: "-0.065em"
    textTransform: uppercase
  display-section:
    fontFamily: Barlow Condensed
    fontSize: "clamp(3.8rem, 7vw, 7.8rem)"
    fontWeight: 650
    lineHeight: 0.83
    letterSpacing: "-0.05em"
    textTransform: uppercase
  display-card:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
    textTransform: uppercase
  heading-32:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  heading-24:
    fontFamily: Barlow Condensed
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  copy-18:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
  copy-16:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 28px
  copy-14:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 24px
  label-12:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 700
    lineHeight: 16px
    letterSpacing: "0.14em"
    textTransform: uppercase
  eyebrow-9:
    fontFamily: Manrope
    fontSize: 9px
    fontWeight: 800
    lineHeight: 12px
    letterSpacing: "0.20em"
    textTransform: uppercase
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  7: 28px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  20: 80px
  24: 96px
  32: 128px
  base: 4px
layout:
  columns: 12
  maxWidth: 1500px
  gutterMobile: 20px
  gutterTablet: 28px
  gutterDesktop: 28px
  pagePaddingMobile: 20px
  pagePaddingDesktop: 32px
  breakpoints:
    sm: 640px
    md: 768px
    lg: 1024px
    xl: 1280px
    2xl: 1536px
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
motion:
  instant: 0ms
  fast: 150ms
  standard: 240ms
  deliberate: 400ms
  easing-standard: "cubic-bezier(0.22, 1, 0.36, 1)"
  easing-linear: linear
components:
  button-primary:
    backgroundColor: "{colors.cyan-primary}"
    textColor: "{colors.void}"
    typography: "{typography.label-12}"
    rounded: "{rounded.full}"
    height: 48px
    padding: "0 24px"
  button-secondary-dark:
    backgroundColor: transparent
    textColor: "{colors.chalk}"
    borderColor: "{colors.dark.border-subtle}"
    typography: "{typography.label-12}"
    rounded: "{rounded.full}"
    height: 48px
    padding: "0 24px"
  button-secondary-light:
    backgroundColor: transparent
    textColor: "{colors.void}"
    borderColor: "{colors.light.border-subtle}"
    typography: "{typography.label-12}"
    rounded: "{rounded.full}"
    height: 48px
    padding: "0 24px"
  input-dark:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.chalk}"
    borderColor: "{colors.dark.border-subtle}"
    typography: "{typography.copy-14}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 16px"
---

# Allfit One Design System

## Overview

This document is the visual source of truth for Allfit One. It defines the reusable foundations for the parent brand, the public website, Allfit OS, and future products in the ecosystem. Product intent and commercial decisions live in [PRODUCT.md](./PRODUCT.md); this document governs how those decisions should look, feel, move, and communicate.

Allfit One should feel premium, athletic, exact, and connected. Its visual character comes from disciplined typography, decisive contrast, structural grids, and the custom “1” mark—not from generic fitness photography, decorative dashboards, or familiar SaaS patterns.

The system has two visual modes:

- **Dark mode** is the primary brand expression. It is immersive, high-contrast, and used for the ecosystem, hero moments, product launches, and premium presentation.
- **Editorial light mode** creates pacing and clarity for explanatory content. It is not a conventional white application theme; it uses the cool `chalk` surface and dark ink-like typography.

The parent brand must always remain broader than Allfit OS. Product-specific screens may become more functional and restrained, but they should inherit the same typography, color logic, geometry, and voice.

## Principles

### One dominant signal

Every section or view should have one clear visual priority. It may be a headline, a product action, a metric, or the “1” mark. Supporting elements must reinforce that signal instead of competing with it.

### Athletic through tension

The brand should communicate movement through compression, scale, diagonal geometry, contrast, and directional composition. Do not substitute sports clichés, aggressive textures, or constant animation for actual visual tension.

### Connected, not crowded

Use alignment, shared edges, dividers, and continuity between sections to express the ecosystem. Connection should come from composition and information architecture, not from filling every empty area.

### Precision over decoration

Spacing, type, alignment, and optical balance carry the design. Decorative effects must have a specific role. If removing an effect does not reduce meaning or hierarchy, remove it.

### Product truth over spectacle

The experience may be bold, but it must not imply features, results, integrations, or availability that the product cannot demonstrate. Marketing expression and product reality should reinforce each other.

## Colors

The palette is intentionally narrow. Cyan is the brand's active energy; black blue creates depth; cool off-white makes editorial sections feel bright without becoming generic.

### Core palette

| Token | Value | Role |
| --- | --- | --- |
| `void` | `#030713` | Primary background, strongest text on light surfaces |
| `panel` | `#071923` | Secondary dark surface, cards, overlays |
| `chalk` | `#EAFFFF` | Primary light surface and primary text on dark surfaces |
| `cyan-primary` | `#55EFFB` | Brand accent, primary actions, focus, key emphasis |
| `cyan-light` | `#68EEF4` | Hover state and controlled highlight |
| `turquoise` | `#60D1D6` | Supporting data and secondary accent |
| `turquoise-dark` | `#348E94` | Text and icons on light surfaces, strong borders |
| `destructive` | `#E54444` | Errors and destructive actions only |

### Color hierarchy

On dark surfaces:

- Use `chalk` for primary content.
- Use `chalk` at 60% opacity for supporting copy and at 40% for metadata.
- Use white or `chalk` at 10–15% opacity for structure and dividers.
- Use `cyan-primary` for the primary action or the most important phrase, not for every interactive element.

On light surfaces:

- Use `void` for primary content.
- Use `void` at 60% opacity for supporting copy and at 42% for metadata.
- Use `void` at 12–16% opacity for dividers.
- Use `turquoise-dark` for readable accent text and icons. Reserve bright cyan for larger fills or decorative accents that maintain sufficient contrast.

### Color behavior

- A view should normally have one dominant surface and, at most, one accent surface.
- Use transparency to create hierarchy inside a theme; do not invent additional grays.
- Do not use cyan for long body copy on dark backgrounds.
- Do not use color alone to communicate status. Pair it with an icon, label, or structural change.
- Gradients are exceptional. If used, they should create atmospheric depth from existing palette colors, never rainbow decoration or glossy button effects.

## Typography

Typography is the primary expressive device in the Allfit One system.

### Families

- **Barlow Condensed** is the display face. Use it for major headlines, section titles, product moments, strong numbers, and the wordmark. Its condensed construction creates athletic tension and allows dramatic scale.
- **Manrope** is the reading and interface face. Use it for body copy, navigation, labels, controls, tables, forms, and supporting information.
- Use a system monospace only when alignment of technical or tabular values materially improves comprehension. It is not a brand voice.

### Display type

Display text is typically uppercase, tightly tracked, and compact in line height. Large type may use outlined or accent treatments, but the underlying text must remain legible and accessible.

- Keep headlines short enough to preserve deliberate line breaks.
- Use one weight per display composition whenever possible.
- Tight tracking must be adjusted optically at each responsive size; do not assume the desktop value works on mobile.
- Outlined text is a secondary layer, never the only treatment for essential information.
- Do not place decorative rules through letters or reduce legibility to manufacture energy.

### Body and interface type

Body text uses sentence case, comfortable line height, and restrained width.

- Keep general reading lines near 55–75 characters.
- Use `copy-14` for compact explanations, `copy-16` for standard body copy, and `copy-18` for editorial introductions.
- Use uppercase tracked labels sparingly for navigation, eyebrows, and compact metadata.
- Avoid using condensed display type for paragraphs, form values, or dense operational UI.
- Use no more than three clear type levels within a compact component.

## Logo & Brand Mark

The Allfit One identity combines the custom “1” mark with the `ALLFIT ONE` wordmark. The mark is a proprietary angular form derived from a forward-leaning numeral and must not be replaced with a font glyph.

### Construction

- Preserve the exact SVG path and aspect ratio of the approved mark.
- The containing plate may use the established slanted quadrilateral geometry.
- Center the mark optically, not only mathematically. Its upper mass and diagonal lower point require visual compensation.
- Keep the mark free of internal lines, shadows, bevels, or additional symbols.
- Do not redraw the “1,” round its corners, change its lean, or add the conventional hooked top of a numeral.

### Color

- Primary lockup: cyan plate or mark with `void` contrast.
- Single-color lockups may use `chalk`, `void`, or `cyan-primary` according to the surface.
- Social avatars use a square canvas with a flat `void` background and no rounded background baked into the asset. Platforms may apply their own crop.
- Maintain enough clear space for the mark to remain recognizable at small sizes.

### Naming

Write the brand as **Allfit One**, always with a space. The display wordmark may render `ALLFIT ONE`, but filenames, metadata, alt text, and prose must preserve the correct name. Never write `AllfitOne` in user-facing content.

## Layout

The layout system uses a 12-column grid with a maximum content width of 1500px. The grid is structural: major text blocks, dividers, cards, and calls to action should share edges across sections.

### Grid

- Mobile page padding: 20px.
- Desktop page padding: 32px.
- Mobile column gap: 20px.
- Tablet and desktop column gap: 28px.
- Maximum content width: 1500px.
- Do not allow wide display type, tables, or fixed-width decorations to create horizontal overflow.

### Spacing

Spacing follows a 4px base scale. Prefer these relationships:

- 8–12px between tightly related elements.
- 16–24px within a component group.
- 32–48px between content groups.
- 64–96px between major regions.
- 96–128px for desktop section padding when the content benefits from editorial breathing room.

Large empty areas are intentional only when they strengthen hierarchy or pacing. Empty space should feel composed, not abandoned.

### Responsive behavior

- Design mobile and tablet compositions explicitly; do not treat them as scaled-down desktop layouts.
- Preserve message hierarchy before preserving exact desktop geometry.
- Collapse columns in reading order and maintain the relationship between labels, titles, copy, and actions.
- Large headlines must be re-typeset with intentional line breaks and adjusted tracking.
- Primary actions should be reachable and at least 44px high.
- Navigation becomes a full-screen menu below the desktop breakpoint. The open and close controls must remain visible, labeled, and keyboard accessible.
- Decorative brand geometry may crop or simplify on smaller screens but must never obscure content.

## Elevation & Depth

Depth comes from tonal separation, borders, and atmospheric light before shadow.

- **Inline surfaces:** no shadow; use a subtle divider or surface shift.
- **Raised navigation:** `0 18px 55px rgba(3, 7, 19, 0.24)` with controlled backdrop blur.
- **Popover:** `0 16px 40px rgba(3, 7, 19, 0.32)` plus a subtle border.
- **Modal:** `0 28px 80px rgba(3, 7, 19, 0.48)` plus an opaque-enough surface for readability.
- **Product device or hero object:** a larger directional shadow is allowed when the object is the section's dominant signal.

Do not apply glow to every cyan element. Glow is atmospheric, not a substitute for contrast. Avoid layered glass cards unless transparency explains spatial hierarchy.

## Motion

Motion should express state, direction, or continuity. It should never be present only to make the page feel “dynamic.”

- Use `0ms` when feedback is already clear.
- Use approximately `150ms` for hover, focus, and compact state changes.
- Use approximately `240ms` for menus, disclosures, and local transitions.
- Use up to `400ms` for large section reveals or full-screen navigation.
- Use the standard easing `cubic-bezier(0.22, 1, 0.36, 1)` for responsive deceleration.
- Keep loops rare. Continuous floating, pulsing, or rotating effects are not default brand behavior.
- Honor `prefers-reduced-motion` by removing nonessential transforms and reducing transitions to effectively instant feedback.

Scroll animation must not delay access to content or cause layout shifts. Functional product UI should feel faster and quieter than marketing surfaces.

## Shapes

Allfit One combines sharp editorial structure with selectively rounded interactive elements.

- Use 4–8px radii for fields and compact controls.
- Use 12–16px radii for product panels and cards.
- Use 24px only for large, intentionally soft surfaces.
- Use full pills for primary calls to action, language selectors, status indicators, and circular icon controls.
- Do not turn every text label into a pill.
- Do not mix several radius families in one compact view.

The diagonal geometry of the “1” mark is a brand signature. Echo it selectively in crops, section transitions, or directional details; do not force it into every component.

## Iconography & Imagery

### Icons

- Use Lucide as the default functional icon set.
- Use a consistent stroke weight and optical size within each context.
- Icons support labels; they should not replace unfamiliar actions without an accessible name.
- Custom social marks and the brand mark may use dedicated SVG paths.
- Avoid mixing filled, outlined, illustrated, and three-dimensional icon styles in one experience.

### Photography

Photography is optional, not foundational. Allfit One must remain recognizable without athlete imagery.

When photography is used:

- Prefer directional, sculptural, high-contrast portraits or real training environments.
- Show effort, focus, movement, or human connection rather than generic smiling stock scenes.
- Compose the subject with the grid and planned copy area in mind.
- Keep grading cool and controlled so skin, equipment, and cyan accents remain credible.
- Do not cover the subject with floating metrics or decorative cards.
- Avoid clichéd neon gyms, impossible bodies, and imagery that implies a product audience more narrowly than intended.

### Product imagery

- Use real product UI when available.
- Conceptual UI must be labeled internally and must not imply released functionality.
- Present screens at a readable scale and crop around the story being explained.
- Do not use device mockups merely to fill space.

## Components

Component tokens in the frontmatter define the default construction. Components should inherit semantic colors and typography rather than setting isolated values.

### Buttons and links

- One primary action per view or section receives the solid cyan treatment.
- Secondary actions use text, a subtle border, or a directional icon.
- Labels should describe the destination or action: `Discover Allfit OS`, `Request a demo`, `View pricing`.
- Avoid generic labels such as `Learn more`, `Submit`, `OK`, or `Click here` when a specific action is available.
- Button height is 48px by default and 56px for a major conversion action.
- Icon-only controls must be at least 44px square and have an accessible label.

Links styled as buttons must remain anchors. In this Base UI project, use a plain `<a>` with `buttonVariants()` rather than rendering an anchor through a native button primitive.

### Cards and panels

- A card must group information or establish interaction—not decorate empty space.
- Prefer shared dividers and grid-aligned regions for editorial comparisons.
- Product panels may use `panel`, subtle borders, and 12–16px radii.
- Avoid floating statistic cards over people, excessive glassmorphism, identical three-card feature rows, and collections of disconnected tiles.
- Avoid equal visual weight across all cards when the content has a real priority.

### Forms

- Place labels above fields and keep helper or error text adjacent to the relevant input.
- Preserve visible focus, hover, disabled, loading, success, and error states.
- Use native semantics and appropriate input types.
- Error copy explains what happened and how to recover.
- Do not rely on placeholder text as the only label.

### Navigation

- The desktop navigation may float above content with top breathing room and no full-width bottom rule.
- Sticky navigation must not cover anchored section headings.
- The mobile and tablet menu occupies the full viewport and prevents background interaction while open.
- Language selection remains available in both collapsed and expanded states.
- The current language changes the document language and every interface string, not only navigation labels.

### Data and operational UI

Allfit OS interfaces should use the same foundations with lower visual intensity:

- Prioritize scanability, stable layout, and task completion over marketing drama.
- Use Manrope for dense controls and data; reserve Barlow Condensed for page titles and major metrics.
- Use cyan to communicate selection, focus, and the main action—not as a constant table fill.
- Use tabular numerals for aligned prices, dates, sets, repetitions, time, and progress values.
- Keep charts legible without color and provide text equivalents for critical values.

## Voice & Content

Copy is part of the design. Allfit One speaks with precision, confidence, and an understanding of real fitness work.

### Brand voice

- Direct, composed, and specific.
- Ambitious without hype.
- Athletic without shouting.
- Human without forced informality.
- Product-aware without reducing the brand to software terminology.

### Language system

- Spanish is the default interface language; English is the complete alternate language.
- Add new user-facing copy in both languages at the same time.
- Source code, identifiers, filenames, technical attributes, comments, and structural names remain in English.
- Keep product and brand names unchanged between languages.
- Keep the exact tagline: **All the fitness in one place.** It always includes the final period. Display treatments may render it in uppercase.
- Synchronize the HTML `lang` attribute with the selected language.

### Writing rules

- Use sentence case for body copy and sentence-like controls.
- Uppercase is a visual treatment for short labels and display headlines, not a writing default.
- Name actions with an explicit verb and object.
- Prefer concrete fitness language: clients, sessions, plans, routines, load, adherence, bookings, progress.
- Explain benefits through a workflow or outcome the product supports; avoid empty superlatives such as “revolutionary,” “ultimate,” or “game-changing.”
- Never describe Allfit One only as a “fitness tech company” or only as gym-management software.
- Distinguish released capabilities, proposals, and future products clearly.

## Accessibility

Accessibility is a system requirement, not a final review step.

- Meet WCAG 2.2 AA contrast: 4.5:1 for normal text and 3:1 for large text and essential interface graphics.
- Bright cyan on `void` is the preferred high-contrast brand pairing. Verify smaller turquoise text on light surfaces independently.
- Every interactive element needs a visible `:focus-visible` state. Never remove the outline without a strong replacement.
- Do not communicate meaning with color, position, or motion alone.
- Maintain one descriptive `h1` and a logical heading hierarchy.
- Preserve native elements and semantics before adding ARIA.
- Provide descriptive alternative text for meaningful images and empty alternative text for decorative images.
- Label icon-only social and navigation links.
- Support keyboard operation for menus, disclosures, dialogs, language controls, and forms.
- Respect zoom, text resizing, reduced motion, and high-contrast preferences.
- Keep touch targets at least 44 by 44px wherever possible.

## Product Expressions

### Allfit One ecosystem

The parent brand uses the broadest and most expressive form of the system: large editorial typography, the custom mark, dark immersive surfaces, and language about connection across fitness. It must leave room for business products and athlete products to coexist.

### Allfit OS

Allfit OS uses the same identity with greater operational clarity. Marketing may use bold editorial compositions; the application itself should be calmer, denser, and more systematic. Its visual story connects three layers: public presence, operations, and client experience.

### Future athlete product

The athlete experience may increase the sense of pace, performance, and training data, but it must remain recognizably Allfit One. Until its scope is defined, do not establish a separate palette, logo, or product language as if it were final.

### Internal brand lab

The `/dev` route is a working environment for mark, lockup, palette, and asset exploration. It is not a public design-system site, must remain `noindex`, and may contain explorations that are not approved standards. Only patterns documented here or explicitly approved should be treated as canonical.

## Do's and Don'ts

### Do

- Use the grid to create connection across sections.
- Spend emphasis on one dominant signal at a time.
- Let typography and spacing carry the premium feeling.
- Use cyan deliberately for action, focus, and identity.
- Check optical alignment, especially for the “1” mark and condensed headlines.
- Verify every material UI change on mobile, tablet, and desktop.
- Keep the bilingual experiences complete and equivalent.
- Keep promises consistent with the current product state.

### Don't

- Do not build a generic dark SaaS landing page with a neon accent.
- Do not add decorative badges, “early access” chips, or labels without a real information need.
- Do not place floating metric cards over athlete photography.
- Do not default to three identical feature cards when a stronger editorial structure is possible.
- Do not overuse pills, rounded containers, glass effects, gradients, or glows.
- Do not scatter animation across unrelated elements.
- Do not redraw or casually modify the custom “1” mark.
- Do not collapse Allfit One into Allfit OS in messaging or metadata.
- Do not publish English-only or Spanish-only additions to a bilingual surface.

## Design Review Checklist

Before approving a new page, component, or campaign, verify:

1. **Brand:** Is the name written as Allfit One, and is the approved mark used without geometry changes?
2. **Hierarchy:** Is there one dominant signal, with supporting content clearly ranked?
3. **Product architecture:** Is the distinction between Allfit One, Allfit OS, and future products clear?
4. **Grid:** Do titles, copy, actions, dividers, and media share intentional edges?
5. **Typography:** Are Barlow Condensed and Manrope used for their intended roles with optical spacing at each breakpoint?
6. **Color:** Does cyan retain meaning, and do all essential pairings meet contrast requirements?
7. **Restraint:** Can any badge, card, gradient, glow, radius, or animation be removed without losing meaning?
8. **Responsive design:** Does the composition work at mobile, tablet, laptop, and wide desktop widths without overflow or accidental gaps?
9. **Interaction:** Are hover, focus, active, disabled, loading, and reduced-motion behaviors complete where relevant?
10. **Accessibility:** Are semantics, heading order, labels, targets, keyboard behavior, and alternatives correct?
11. **Language:** Is all user-facing content complete in Spanish and English, with Spanish as default?
12. **Truth:** Does every claim reflect current, demonstrable product capability or clearly identified future intent?

## Governance

This file defines approved foundations, not every possible composition. When a new pattern becomes recurring, document its purpose and tokens here before multiplying one-off variants.

- Update `DESIGN.md` when brand foundations, tokens, or system-wide behavior change.
- Update `PRODUCT.md` when audience, positioning, scope, pricing, or product architecture changes.
- Keep implementation tokens in `src/app/globals.css` aligned with the canonical values in this file.
- Treat `/dev` as an exploration space; promotion from experiment to standard requires an explicit decision and a corresponding documentation update.
- Prefer a small coherent system over a large catalog of weakly related components.
