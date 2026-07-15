---
version: alpha
name: Allfit-One-design-analysis
description: A premium athletic design system built from compressed editorial typography, deep black-blue canvases, structural grids, and a single electric-cyan action signal. The custom forward-leaning “1” mark carries the identity while disciplined spacing, sharp dividers, and selective rounded controls keep the ecosystem precise rather than decorative.

colors:
  primary: "#55EFFB"
  primary-focus: "#68EEF4"
  primary-muted: "#60D1D6"
  primary-dark: "#348E94"
  ink: "#030713"
  body: "#EAFFFF"
  body-on-light: "#030713"
  body-muted: "rgba(234, 255, 255, 0.60)"
  body-subtle: "rgba(234, 255, 255, 0.40)"
  ink-muted-60: "rgba(3, 7, 19, 0.60)"
  ink-muted-42: "rgba(3, 7, 19, 0.42)"
  divider-dark: "rgba(234, 255, 255, 0.10)"
  divider-light: "rgba(3, 7, 19, 0.15)"
  canvas: "#030713"
  canvas-panel: "#071923"
  canvas-raised: "#0A2029"
  canvas-chalk: "#EAFFFF"
  canvas-chalk-secondary: "#DDF7F8"
  surface-cyan-translucent: "rgba(85, 239, 251, 0.06)"
  on-primary: "#030713"
  on-dark: "#EAFFFF"
  destructive: "#E54444"

typography:
  hero-display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(72px, 12.2vw, 200px)"
    fontWeight: 700
    lineHeight: 0.68
    letterSpacing: -0.065em
    textTransform: uppercase
  display-xl:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(61px, 7vw, 125px)"
    fontWeight: 650
    lineHeight: 0.83
    letterSpacing: -0.05em
    textTransform: uppercase
  display-lg:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: -0.035em
    textTransform: uppercase
  display-md:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.03em
    textTransform: uppercase
  display-sm:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.025em
    textTransform: uppercase
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.56
    letterSpacing: 0
  body-strong:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: -0.01em
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0
  body-compact:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.71
    letterSpacing: 0
  caption:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0.08em
  button:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 10px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.16em
    textTransform: uppercase
  eyebrow:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 9px
    fontWeight: 800
    lineHeight: 1.33
    letterSpacing: 0.20em
    textTransform: uppercase
  nav-link:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.16em
    textTransform: uppercase
  mono-index:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  device: 42px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  group: 40px
  region: 64px
  section: 96px
  section-large: 128px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 0 24px
    height: 48px
  button-primary-large:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 0 24px
    height: 56px
  button-secondary-dark:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    borderColor: "{colors.divider-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 0 24px
    height: 48px
  text-link-dark:
    backgroundColor: transparent
    textColor: "{colors.body-muted}"
    typography: "{typography.button}"
  text-link-light:
    backgroundColor: transparent
    textColor: "{colors.ink-muted-60}"
    typography: "{typography.button}"
  floating-navbar:
    backgroundColor: "rgba(3, 7, 19, 0.86)"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.lg}"
    height: 56px
    padding: 0 24px
  fullscreen-mobile-menu:
    backgroundColor: "rgba(3, 7, 19, 0.98)"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 112px 24px 28px
  editorial-section-dark:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
    padding: 128px 0
  editorial-section-light:
    backgroundColor: "{colors.canvas-chalk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 128px 0
  feature-column:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.divider-light}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.none}"
    padding: 32px 28px
  product-panel:
    backgroundColor: "{colors.canvas-panel}"
    textColor: "{colors.on-dark}"
    borderColor: "{colors.divider-dark}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.lg}"
    padding: 28px
  product-panel-featured:
    backgroundColor: "{colors.surface-cyan-translucent}"
    textColor: "{colors.on-dark}"
    borderColor: "rgba(85, 239, 251, 0.35)"
    typography: "{typography.body-compact}"
    rounded: "{rounded.lg}"
    padding: 28px
  pricing-panel:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    borderColor: "{colors.divider-dark}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.lg}"
    padding: 32px
  faq-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.divider-light}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.none}"
    padding: 24px 0
  language-selector:
    backgroundColor: transparent
    textColor: "{colors.body-subtle}"
    borderColor: "rgba(234, 255, 255, 0.15)"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 2px
  input-dark:
    backgroundColor: "{colors.canvas-panel}"
    textColor: "{colors.on-dark}"
    borderColor: "{colors.divider-dark}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.sm}"
    padding: 0 16px
    height: 48px
  device-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    borderColor: "{colors.canvas}"
    rounded: "{rounded.device}"
    padding: 8px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body-subtle}"
    typography: "{typography.caption}"
    padding: 80px 32px 28px
---

## Overview

Allfit One is a **typography-first fitness ecosystem expressed through athletic tension and technical precision**. The main experience alternates deep black-blue and cool chalk canvases, using enormous compressed headlines, disciplined grid alignment, fine dividers, and one electric-cyan action color. The interface does not depend on photography to feel athletic. Scale, compression, diagonals, and directional composition carry that energy.

The custom “1” is the identity anchor. Its forward lean creates speed without motion effects, while the surrounding UI stays controlled. Marketing surfaces can be expressive and oversized; Allfit OS product surfaces should lower the volume and prioritize operational clarity without losing the same palette, typography, geometry, or voice.

Allfit One is the parent ecosystem—not a synonym for Allfit OS and not merely a “fitness tech company.” Allfit OS is the first product for coaches, gyms, sports centers, studios, and training brands. A future product will serve hybrid athletes. The design system must be broad enough to connect these audiences without forcing every product into the same interface density.

**Key Characteristics:**

- Typography-first expression: Barlow Condensed creates the athletic voice; Manrope carries reading and interface work.
- Deep `#030713` canvas with a single `#55EFFB` interactive signal.
- Alternating dark and chalk sections create rhythm without ornamental separators.
- A 12-column, 1500px grid aligns titles, copy, actions, dividers, and product content.
- The custom forward-leaning “1” provides the signature diagonal geometry.
- Sharp editorial regions coexist with selective full-pill actions and restrained 16px product panels.
- Marketing is dramatic; operational UI is quieter, denser, and task-led.
- Spanish is the default interface language, with a complete English equivalent.
- Decorative badges, floating metric cards, generic SaaS tile grids, and constant animation are explicitly excluded.

## Colors

> **Source surfaces analyzed:** current landing page, responsive navigation, Allfit OS sections, pricing, FAQ, upcoming athlete product, footer, social preview assets, and the internal `/dev` brand lab. Explorations in `/dev` are not automatically approved tokens.

### Brand & Accent

- **Electric Cyan** (`{colors.primary}` — #55EFFB): The primary identity and action color. Use it for the main CTA, selected language, focus signal, key headline phrase, and small directional accents. A section should usually spend this emphasis once.
- **Focus Cyan** (`{colors.primary-focus}` — #68EEF4): The brighter focus and hover sibling. It is not a second accent and should not compete with Electric Cyan in the same state.
- **Supporting Turquoise** (`{colors.primary-muted}` — #60D1D6): Secondary visualization and supporting data color. Avoid using it for long body copy.
- **Dark Turquoise** (`{colors.primary-dark}` — #348E94): Readable accent on chalk surfaces, stronger separators, and secondary iconography.

### Surface

- **Void** (`{colors.canvas}` — #030713): The dominant Allfit One canvas. It is a blue-black rather than pure black, giving the cyan a controlled technical depth.
- **Panel** (`{colors.canvas-panel}` — #071923): The default raised dark surface for product cards, overlays, pricing regions, and input fields.
- **Raised Panel** (`{colors.canvas-raised}` — #0A2029): A small tonal step used when nested structure needs separation. Do not build a large gray scale around it.
- **Chalk** (`{colors.canvas-chalk}` — #EAFFFF): The editorial light canvas and primary text color on dark surfaces. Its cool cast keeps light sections inside the brand.
- **Secondary Chalk** (`{colors.canvas-chalk-secondary}` — #DDF7F8): A subtle adjacent surface for dense explanatory regions. Use only when a divider is insufficient.
- **Cyan Wash** (`{colors.surface-cyan-translucent}` — rgba(85, 239, 251, 0.06)): A featured product-panel fill. It must remain subtle enough that the border and content carry the hierarchy.

### Text

- **Dark Ink** (`{colors.ink}` — #030713): Primary text on light surfaces and the text color on cyan actions.
- **Chalk Body** (`{colors.body}` — #EAFFFF): Primary text on dark surfaces.
- **Muted Body** (`{colors.body-muted}` — 60% Chalk): Standard supporting copy on dark surfaces.
- **Subtle Body** (`{colors.body-subtle}` — 40% Chalk): Metadata, indexes, and low-priority labels on dark surfaces.
- **Muted Ink 60** (`{colors.ink-muted-60}`): Supporting copy on light surfaces.
- **Muted Ink 42** (`{colors.ink-muted-42}`): Metadata on light surfaces.

### Hairlines & Borders

- **Dark Divider** (`{colors.divider-dark}`): The default 1px structure line on dark surfaces. It should remain quiet until content alignment makes it visible.
- **Light Divider** (`{colors.divider-light}`): The default 1px structure line on chalk surfaces.
- Strong cyan borders are reserved for selection, focus, and the single featured panel. Do not outline every card in cyan.

### Brand Gradient

There is **no decorative brand gradient**. The hero may use low-opacity radial cyan atmosphere to create depth, but it must resolve into `{colors.canvas}` and never become a multicolor or glossy surface. Buttons remain flat. Product content must not depend on gradients for legibility.

## Typography

### Font Family

- **Display:** `Barlow Condensed, Arial Narrow, sans-serif`. The condensed proportions, heavy vertical strokes, and compact counters generate the athletic/editorial voice.
- **Body / UI:** `Manrope, system-ui, sans-serif`. Its open construction balances the compression of Barlow Condensed and remains legible in bilingual copy and operational UI.
- **Indexes / tabular utility:** system monospace. Use only for aligned numeric indexes, compact section numbering, and technical data where fixed width helps scanning.

Both brand fonts are loaded through `next/font`. Do not replace them with browser-default approximations in production assets.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
| --- | ---: | ---: | ---: | ---: | --- |
| `{typography.hero-display}` | 72–200px fluid | 700 | 0.68 | -0.065em | Homepage hero and rare ecosystem statements |
| `{typography.display-xl}` | 61–125px fluid | 650 | 0.83 | -0.05em | Major section titles |
| `{typography.display-lg}` | 56px | 600 | 0.92 | -0.035em | Product moments and large card titles |
| `{typography.display-md}` | 40px | 600 | 1.0 | -0.03em | Panel titles and pricing statements |
| `{typography.display-sm}` | 32px | 600 | 1.0 | -0.025em | FAQ rows and compact headings |
| `{typography.lead}` | 18px | 400 | 1.56 | 0 | Editorial introductions |
| `{typography.body-strong}` | 16px | 700 | 1.5 | -0.01em | Strong inline or compact product emphasis |
| `{typography.body}` | 16px | 400 | 1.75 | 0 | Standard long-form copy |
| `{typography.body-compact}` | 14px | 400 | 1.71 | 0 | Cards, supporting copy, operational UI |
| `{typography.caption}` | 12px | 600 | 1.33 | 0.08em | Compact metadata |
| `{typography.button}` | 10px | 800 | 1.0 | 0.16em | CTA labels |
| `{typography.eyebrow}` | 9px | 800 | 1.33 | 0.20em | Section labels and signals |
| `{typography.nav-link}` | 10px | 700 | 1.0 | 0.16em | Desktop navigation |
| `{typography.mono-index}` | 10px | 400 | 1.0 | 0 | Ordered indexes and tabular markers |

### Principles

- **Compression is the athletic signal.** Display headlines use condensed type, negative tracking, and short line height. Do not fake this by skewing or stretching type.
- **Display type is re-typeset at every breakpoint.** Desktop line breaks, tracking, and outline treatments are not simply scaled down for mobile.
- **Uppercase is a visual treatment.** It belongs to display headlines, eyebrows, and short controls—not paragraphs or long explanatory copy.
- **Outlined type is secondary.** It may create depth inside a hero, but essential meaning must remain available through solid text and accessible naming.
- **Body widths stay readable.** Standard copy should remain near 55–75 characters per line.
- **Weights are intentional.** Display uses 600–700; UI uses 400, 600, 700, or 800 according to role. Avoid mixing more than three weights in a compact composition.
- **Optical alignment beats numeric alignment.** Condensed headlines and the custom “1” require visual compensation because their mass is asymmetrical.

### Note on Font Substitutes

Barlow Condensed and Manrope are open-source and should be used directly. If an offline production tool cannot load them:

- Substitute `Arial Narrow` only for rough Barlow Condensed layout previews; it is not suitable for final brand assets.
- Substitute `system-ui` for Manrope in functional prototypes.
- Do not export final logos, social assets, or campaign art with substitute fonts.
- Recheck line breaks and optical spacing after the approved fonts are restored; both substitutes occupy different widths.

## Layout

### Spacing System

- **Base unit:** 4px. Structural spacing uses 8, 12, 16, 20, 24, 32, 40, 64, 96, and 128px.
- **Tight relationships:** `{spacing.xs}`–`{spacing.sm}` (8–12px) for icons, labels, and adjacent metadata.
- **Component groups:** `{spacing.md}`–`{spacing.xl}` (16–24px).
- **Content groups:** `{spacing.xxl}`–`{spacing.group}` (32–40px).
- **Regions:** `{spacing.region}` (64px).
- **Section padding:** `{spacing.section}` (96px) on compact pages and `{spacing.section-large}` (128px) on desktop editorial surfaces.
- **Mobile section padding:** generally 96px, reduced only when content density or viewport height requires it.

### Grid & Container

- **Columns:** 12.
- **Maximum content width:** 1500px.
- **Mobile page padding:** 20px.
- **Tablet and desktop page padding:** 32px.
- **Mobile column gap:** 20px.
- **Tablet and desktop column gap:** 28px.
- **Reading columns:** normally 4–8 grid columns depending on hierarchy; do not let body copy span the full container.
- **Editorial sections:** align eyebrow, headline, body, actions, dividers, and adjacent product content to shared grid edges.

### Whitespace Philosophy

Whitespace acts as controlled recovery between high-intensity typographic moments. The hero can be dense and compressed; explanatory sections should open up. Large empty regions are valid only when they strengthen pacing, focus, or optical balance. If an area looks accidental, fix the composition rather than filling it with a badge, illustration, or card.

## Elevation & Depth

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | No shadow; surface or divider only | Editorial sections, feature columns, FAQ, footer |
| Tonal | `{colors.canvas-panel}` or cyan wash plus 1px border | Product panels, pricing, inputs |
| Floating nav | `0 18px 55px rgba(3, 7, 19, 0.24)` plus controlled backdrop blur | Sticky desktop and mobile navbar |
| Popover | `0 16px 40px rgba(3, 7, 19, 0.32)` plus subtle border | Menus and local overlays |
| Modal | `0 28px 80px rgba(3, 7, 19, 0.48)` on an opaque panel | Dialogs and full attention states |
| Product object | Directional shadow chosen for the object and surface | Device or product image when it is the dominant signal |

**Shadow philosophy.** Hierarchy comes from scale, tonal surfaces, borders, and alignment before shadow. Cards do not receive a generic box shadow. Cyan glow is atmospheric and rare; it must not be attached to every accent element.

### Decorative Depth

- The hero may use a very low-opacity cyan radial field and grid texture to create spatial depth.
- The giant outline “1” may sit behind content at low contrast, but it cannot reduce readability or become a competing logo.
- Backdrop blur is functional on sticky navigation and overlays. It is not a default card treatment.
- Do not stack translucent glass panels over one another.
- Continuous floating animation is not part of the default system. If a product object moves, the section must have no competing motion.

## Shapes

### Border Radius Scale

| Token | Value | Use |
| --- | ---: | --- |
| `{rounded.none}` | 0px | Editorial regions, feature columns, section dividers |
| `{rounded.xs}` | 4px | Fine utility details |
| `{rounded.sm}` | 8px | Inputs and compact controls |
| `{rounded.md}` | 12px | Menus and compact product regions |
| `{rounded.lg}` | 16px | Product and pricing panels |
| `{rounded.xl}` | 24px | Rare large soft surfaces |
| `{rounded.device}` | 42px | Phone or wearable shells only |
| `{rounded.pill}` | 9999px | Primary CTAs, language selector, status controls |
| `{rounded.full}` | 9999px / 50% | Circular icon controls and avatars |

### Brand Geometry

- The custom “1” is a proprietary angular path, not a font glyph.
- Preserve its exact SVG path, forward lean, proportions, and pointed lower terminal.
- The containing plate uses the approved slanted quadrilateral geometry.
- Center the mark optically. Its top mass and long lower diagonal make mathematical centering appear incorrect.
- Keep the mark free of internal lines, bevels, extra hooks, shadows, and conventional numeral features.
- Use the diagonal language selectively in crops, directional dividers, and section transitions. Repeating it in every card weakens the signature.

### Photography Geometry

- Photography is optional. The identity must work without it.
- Hero photography, when used, should be full-bleed or integrated as one dominant object—not trapped inside a generic rounded card.
- Use directional, sculptural, high-contrast portraits or real training environments.
- Compose the subject with the grid and copy area before selecting a crop.
- Do not place floating metrics, badges, or translucent cards over a person.
- Product screenshots use readable crops and should show real UI when available.
- Social avatars use a square flat `{colors.canvas}` background with no rounded corners baked into the asset; the platform owns the crop.

## Components

### Top Navigation

**`floating-navbar`** — A sticky, centered navigation surface with breathing room above it. Background `rgba(3, 7, 19, 0.86)`, controlled backdrop blur, `{rounded.lg}` radius, and a restrained shadow. It contains the Allfit One lockup, centered section links, language selector, demo action, and menu trigger. It must not use a full-width bottom rule.

- Desktop section links use `{typography.nav-link}` and muted Chalk; the active or hovered link shifts to `{colors.primary}`.
- The brand name is always **Allfit One**, rendered as `ALLFIT ONE` only as a display treatment.
- Sticky offset must be reflected in `scroll-margin-top` for anchored sections.
- The navbar remains above the full-screen menu and must keep the close action visible.

**`fullscreen-mobile-menu`** — Replaces desktop navigation below the `lg` breakpoint. It occupies the entire dynamic viewport, blocks background interaction, and lists destinations in large Barlow Condensed type with numeric indexes. The primary conversion action remains visible near the bottom. Opening and closing must work with keyboard, pointer, and assistive technology.

### Buttons

**`button-primary`** — The primary conversion grammar. Background `{colors.primary}`, text `{colors.on-primary}`, `{typography.button}`, height 48px, full-pill radius, and 24px horizontal padding. Use once per section whenever possible.

- Default: `{colors.primary}`.
- Focus: a visible two-stage or high-contrast `{colors.primary-focus}` ring.
- Pressed: a subtle physical response such as a 1–2% scale change; never a dramatic bounce.
- Disabled: reduced contrast plus semantic disabled behavior, not opacity alone.

**`button-primary-large`** — The 56px version for the final conversion moment or a full-width mobile CTA.

**`button-secondary-dark`** — A transparent full-pill control with a quiet dark-surface border. Use only when the secondary action needs button weight. Otherwise prefer `{component.text-link-dark}`.

**`text-link-dark` / `text-link-light`** — Low-chrome directional actions. Pair the specific label with an arrow when movement or destination benefits from it. Avoid generic `Learn more`, `Submit`, `OK`, and `Click here` labels.

Links styled as buttons remain native anchors. In the current Base UI stack, use a plain `<a>` with `buttonVariants()` instead of rendering an anchor through a primitive that expects a native `<button>`.

### Editorial Sections

**`editorial-section-dark`** — Full-width `{colors.canvas}` region with Chalk typography. Used for ecosystem positioning, operational explanation, pricing, conversion, and footer transitions. The section itself stays rectangular and edge-to-edge.

**`editorial-section-light`** — Full-width `{colors.canvas-chalk}` region with Void typography. Used for explanations, comparisons, and FAQ content where reading clarity should temporarily lower the visual intensity.

**`feature-column`** — A grid-aligned content region separated by shared 1px dividers rather than a floating card. It combines a functional icon, numeric index, eyebrow, condensed title, and compact body copy. The shared structure is preferred to three identical rounded feature cards.

### Cards & Containers

**`product-panel`** — A 16px-radius dark panel for connected Allfit OS layers, operational content, and compact demonstrations. Background `{colors.canvas-panel}`, 1px `{colors.divider-dark}` border, and 28px padding. It should have a clear information job.

**`product-panel-featured`** — The single emphasized sibling. Uses the cyan wash and a stronger cyan border. Do not mark all cards as featured.

**`pricing-panel`** — A dark 16px-radius region with stronger numerical hierarchy. Pricing, inclusions, and scale information should remain aligned and scannable; avoid decorative price badges or fake scarcity.

**`device-shell`** — A 42px-radius physical frame for an actual mobile product surface. Use only when the device explains the athlete or client experience. Do not add a device mockup merely to fill a column.

### Language Selector

**`language-selector`** — A compact pill containing `ES` and `EN`. The selected language uses the cyan fill and Void text; the unselected language remains quiet but legible. Spanish is selected by default. Changing the selection updates every interface string and the document `lang` attribute.

### Inputs & Forms

**`input-dark`** — Background `{colors.canvas-panel}`, Chalk text, 1px dark divider, `{rounded.sm}`, 48px height, 16px horizontal padding. Labels sit above the field; placeholders never replace labels.

- Error states use `{colors.destructive}` with text explaining what happened and how to recover.
- Focus uses `{colors.primary-focus}` and remains visible against dark and light surfaces.
- Loading and success states must not depend only on color.
- Input types, autocomplete, names, and native semantics must reflect the data requested.

### FAQ

**`faq-row`** — A full-width disclosure row separated by hairlines. The question uses `{typography.display-sm}` and a compact numeric index. The expand control is structural, not a floating circular button. Native `<details>` and `<summary>` are preferred when their behavior meets requirements.

### Footer

**`footer`** — A dark, low-chrome conclusion. The Allfit One lockup and exact tagline appear above an oversized `ALLFIT ONE` word treatment. A quiet divider separates legal information and icon-only Instagram/TikTok links. Social links include accessible names but no adjacent username label. The footer does not introduce a new color or layout language.

### Allfit OS Operational UI

Allfit OS inherits the same system at a lower visual volume:

- Manrope carries dense controls, tables, filters, forms, and navigation.
- Barlow Condensed is reserved for page titles and major metrics.
- Cyan communicates focus, selection, and the primary action—not constant decoration.
- Tabular numerals align prices, dates, sets, repetitions, time, adherence, and progress.
- Charts remain understandable without color and expose important values as text.
- Stable layout and task completion take precedence over oversized marketing composition.

## Do's and Don'ts

### Do

- Use `{colors.primary}` for the most important action, focus, or phrase in a section.
- Build hierarchy with Barlow Condensed scale, Manrope readability, spacing, and aligned edges.
- Alternate `{component.editorial-section-dark}` and `{component.editorial-section-light}` to control pacing.
- Use `{component.feature-column}` when content benefits from shared structure rather than isolated cards.
- Preserve the exact custom “1” SVG and check its optical centering at every rendered size.
- Keep body lines near 55–75 characters and verify Spanish and English line breaks separately.
- Treat mobile and tablet as authored compositions, not reduced desktop layouts.
- Keep marketing expression bold and Allfit OS operational UI quieter.
- Pair every color signal with text, an icon, or a structural state.
- Verify contrast, keyboard access, touch targets, reduced motion, zoom, and heading order.

### Don't

- Don't build a generic dark SaaS landing page with neon accents and interchangeable feature cards.
- Don't add decorative chips, “early access” badges, or labels without a real information purpose.
- Don't place floating metric cards over athlete photography.
- Don't outline every panel in cyan or apply glow to every accent.
- Don't use gradients on buttons or as a default section background.
- Don't round full-width editorial sections.
- Don't use full pills for ordinary text labels.
- Don't scatter floating, pulsing, or scroll-reveal animation across unrelated elements.
- Don't redraw the “1” as a conventional numeral or alter its proportions casually.
- Don't write `AllfitOne`; the brand is **Allfit One**.
- Don't position Allfit One only as Allfit OS, gym-management software, or a “fitness tech company.”
- Don't add user-facing content in only one language.
- Don't describe future athlete capabilities as released product functionality.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | ---: | --- |
| Small phone | ≤ 374px | 20px gutters; compact hero line breaks; full-width primary actions; no decorative overflow |
| Phone | 375–639px | Single-column flow; hero at 62–80px; full-screen navigation; stacked footer metadata |
| Large phone | 640–767px | Actions may sit inline; two-column micro-layouts allowed; navigation remains full-screen |
| Tablet portrait | 768–1023px | 12-column grid retained; content commonly spans 5–7 columns; navbar still uses menu trigger |
| Laptop | 1024–1279px | Desktop navigation appears; three-column product structures; display scale increases |
| Desktop | 1280–1535px | Full editorial composition; 32px page padding; large display typography |
| Wide desktop | ≥ 1536px | Content locks at 1500px; margins absorb additional width; hero type caps at 200px |

The structural breakpoints that matter for implementation are the Tailwind defaults used by the project: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, and `2xl` 1536px. Component changes should follow content pressure rather than device names when a local breakpoint is justified.

### Touch Targets

- Minimum target: 44 × 44px.
- Primary actions: 48px default and 56px for major mobile conversion.
- Icon-only navigation and social controls require accessible labels.
- Adjacent compact targets need enough separation to prevent accidental activation.
- Desktop precision controls may appear visually smaller only when their hit area still meets the target.

### Collapsing Strategy

- **Navigation:** centered desktop row → full-screen mobile/tablet menu below 1024px. Language selection remains available in both states.
- **Hero:** multi-line, extreme-scale desktop statement → deliberately re-typeset mobile statement. Decorative geometry crops or fades before text is compromised.
- **Feature columns:** three shared columns → single vertical sequence with horizontal dividers.
- **Product panels:** three-column composition → one-column reading order; featured emphasis remains singular.
- **Pricing:** side-by-side commercial summary → stacked regions with the primary CTA near the decision content.
- **FAQ:** split title/content layout → title first, then full-width disclosure list.
- **Footer:** horizontal brand/tagline/legal alignment → stacked groups with icon-only social links preserved.

### Image Behavior

- Above-the-fold imagery loads eagerly only when present; the current hero does not require photography.
- Below-the-fold media uses responsive sources, explicit dimensions, and lazy loading.
- Art direction may change the crop at mobile; do not rely on `object-fit: cover` alone when the subject becomes poorly framed.
- Product UI stays readable at the chosen crop. If it cannot be read, show a focused detail instead of a full miniature screen.
- Decorative background marks may crop, simplify, or disappear before they create horizontal overflow.

### Motion Behavior

- Hover and compact state changes: approximately 150ms.
- Menus and disclosures: approximately 240ms.
- Full-screen navigation and large overlays: up to 400ms.
- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- `prefers-reduced-motion` removes nonessential transforms and reduces transitions to effectively instant feedback.

## Iteration Guide

1. Focus on one surface or component at a time and reference its YAML key directly, such as `{component.product-panel}` or `{typography.display-xl}`.
2. Start with hierarchy and grid alignment before changing color, radius, shadow, or animation.
3. Reuse `{token.refs}` in documentation and semantic CSS tokens in implementation; do not introduce isolated hex values.
4. Create a variant only when its role is distinct and recurring. A one-off visual difference is not automatically a component.
5. Spend cyan emphasis once per section. If several elements demand `{colors.primary}`, repair the hierarchy.
6. Keep the custom “1” geometry unchanged. Adjust its container or optical offset rather than editing the path.
7. Add Spanish and English copy together and test both for wrapping, density, and meaning.
8. Verify desktop, tablet, and mobile compositions visually after every material UI change.
9. Verify keyboard focus, semantic structure, contrast, touch targets, reduced motion, and overflow before approval.
10. Keep the parent ecosystem broad. Product-specific patterns may extend the system without redefining Allfit One around a single product.
11. Promote an experiment from `/dev` only after explicit approval and a corresponding update to this document.
12. When in doubt, remove decoration and strengthen type, spacing, or alignment.

## Known Gaps

- The Allfit OS application interface has not yet been fully designed; operational component specifications remain directional rather than exhaustive.
- Form validation, loading, success, empty, offline, and permission states need complete product-level patterns.
- A semantic data-visualization palette beyond the core cyan/turquoise family has not been approved.
- The destructive color exists as a practical implementation token, but warning, success, and informational state scales are not yet formalized.
- The commercial demo-request flow currently relies on email; a measurable form or scheduling experience has not been specified.
- The hybrid-athlete product name, information architecture, feature scope, and data visualization needs remain open.
- The relationship between native applications and progressive web experiences is not decided.
- Dark and light application themes for Allfit OS have not been approved; the documented light mode is an editorial marketing surface, not a complete product theme.
- Motion beyond navigation, disclosures, and isolated product presentation has not been standardized.
- Photography art direction is defined in principle, but no approved production library, crop set, or grading preset exists.
- The `/dev` route contains explorations and should not be treated as a public or canonical design-system catalog.
- Tokens in this document and `src/app/globals.css` are conceptually aligned, but automated token generation and drift validation are not yet implemented.
