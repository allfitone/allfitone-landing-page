# Allfit One — Product

## Document purpose

This document is the product source of truth for Allfit One. It explains the ecosystem, the role of each product, their audiences, how they connect, what is currently defined, and which decisions remain open.

It should guide product, design, engineering, content, sales, and marketing. Update it when the product strategy changes; the landing page must not become the only place where product decisions are documented.

## Brand

**Name:** Allfit One

**Tagline:** All the fitness in one place.

**Website:** https://www.allfit.one

Allfit One is a fitness ecosystem that connects people, professionals, organizations, training, operations, and progress. It should not be positioned only as a software company, a “fitness tech company,” or gym-management software. Technology is the means; the connected fitness experience is the proposition.

## Vision

Create the place from which a person can live their fitness life and the system from which professionals and organizations can make that experience possible.

Allfit One should reduce fragmentation without forcing every audience into the same interface. A person and a business share infrastructure, identity, permissions, and relevant data, but each uses a product designed for their own goals.

## Product architecture

```text
ALLFIT ONE

├── Allfit Space
│   Personal fitness product
│
└── Allfit Studio
    Product for professionals and organizations
```

### Allfit One

The parent ecosystem and brand. It owns the shared identity, principles, infrastructure, and long-term portfolio.

### Allfit Space

The personal fitness product. It is designed for people who train independently, work with a professional, belong to a gym or studio, practice strength or endurance disciplines, or want to begin training.

Its long-term proposition is:

> Everything a person needs to live fitness.

The App is broader than a hybrid-athlete tracker. It should eventually connect training, planning, progress, professionals, gyms, memberships, bookings, experiences, community, and commerce around one portable identity.

The product is not yet publicly released. Its final commercial name, release scope, business model, and availability are open decisions. Public communication must label it as coming soon and must not present long-term capabilities as available.

### Allfit Studio

The administrative and operational product for independent coaches, gyms, studios, boxes, sports academies, high-performance centers, and other fitness organizations.

Its proposition is:

> Everything a professional or organization needs to offer fitness.

Allfit Studio is centered on the management panel. It organizes clients, members, teams, training, schedules, bookings, memberships, payments, progress, and operational information. A public business page may exist as an item or module inside OS; it is not a separate product or one of several equal “layers.”

Allfit Studio does not include a separate client PWA as its product proposition. The personal training and progress experience belongs in Allfit Space. OS professionals and organizations connect with people through the shared ecosystem and permissions model.

## Product relationship

The competitive advantage is not having two disconnected applications. It is the flow between them:

| Allfit Space | Direction | Allfit Studio |
| --- | --- | --- |
| A person trains | ← | A professional programs |
| A person books | ← | An organization publishes availability |
| A person buys or joins | ← | A business offers services or memberships |
| A person records results | → | A professional analyzes authorized results |
| A person controls their history | ↔ | An organization receives necessary access |

Shared infrastructure may eventually include identity, permissions, payments, marketplace data, memberships, bookings, and authorized training history.

## Fitness ID

Fitness ID is the long-term identity concept for Allfit Space. A person's goals, training history, progress, relationships, memberships, bookings, achievements, preferences, and authorized wearable data should remain portable when they change coach, gym, location, or discipline.

The person—not a coach or organization—controls the identity and decides what to share. Before implementation, define consent, granular permissions, retention, export, deletion, encryption, and the boundary between fitness information and sensitive health data.

Fitness ID is a product thesis, not a currently available public feature.

## Target audiences

### Allfit Space

- People who train independently.
- People who want to start training.
- Strength, running, endurance, and hybrid athletes.
- Clients of independent coaches.
- Members of gyms, studios, boxes, or sports centers.
- People looking for fitness services, classes, programs, or experiences.

### Allfit Studio

- Independent coaches and personal trainers.
- Gyms and fitness centers.
- Studios, boxes, sports academies, and high-performance centers.
- Training brands and small teams coordinating work across spreadsheets, messaging apps, and disconnected tools.
- In later stages, adjacent professionals such as nutritionists and physiotherapists when their workflows are explicitly defined.

## Problems

### Problems for people

- Training history, plans, progress, memberships, bookings, and professional relationships are fragmented.
- Data often belongs to the current tool, coach, or gym rather than traveling with the person.
- Products commonly assume one discipline or one way of training.
- People must move between unrelated products to train, find help, join a facility, or understand progress.

### Problems for professionals and organizations

- Clients, programming, schedules, memberships, payments, and progress are coordinated across tools that do not share context.
- Repetitive operational work reduces the time available for coaching and service.
- Custom software is expensive, slow, and difficult to maintain.
- Business data and the person's training experience often become disconnected.
- Marketplace information can drift when availability, prices, and memberships are maintained separately from real operations.

## Value propositions

### Allfit One

One ecosystem for the different ways fitness is lived and offered.

### Allfit Space

Train independently or with a professional and carry your progress with you.

### Allfit Studio

Manage clients, training, schedules, memberships, and progress from one administrative system.

## Product principles

1. **Connected by default** — Information should flow between products when the person has authorized it.
2. **The person controls their identity** — A relationship with a professional or organization does not transfer ownership of personal history.
3. **Context over module overload** — The App should adapt to goals, discipline, experience, and relationships instead of exposing every future capability at once.
4. **Operational clarity** — OS should make daily work easier before adding enterprise complexity.
5. **Fitness language, not software language** — Interfaces should use concepts people and professionals already understand.
6. **Progress must be visible** — Training activity should produce understandable evidence of adherence and improvement.
7. **AI is a layer, not a destination** — Intelligence should support planning, adaptation, analysis, and operations instead of becoming an isolated chatbot.
8. **Product truth over vision claims** — Public communication must distinguish released capability, near-term scope, and long-term direction.

## Allfit Studio scope

### Administrative panel

- Client and member management.
- Team members, roles, and locations when defined.
- Training plans, routines, and programming.
- Schedule, classes, sessions, and bookings.
- Memberships and payments.
- Progress and activity review.
- Operational and business metrics.
- Profiles, services, pricing, and availability used by the connected ecosystem.

### Public presence item

- Business and brand presentation.
- Services, plans, schedules, or locations when configured.
- Lead or contact capture.
- Public information synchronized with the operation where possible.

The public page is an OS item or module. It must not be described as an independent product.

### Connection with Allfit Space

- Professionals assign training to authorized people.
- Organizations connect memberships, schedules, bookings, or services.
- People send completed activity and progress back according to permissions.
- OS does not provide a separate client PWA as a substitute for Allfit Space.

### Initial setup

Allfit Studio may include configuration support so a business can begin operating sooner. The exact boundaries of setup, migration, integrations, custom domains, white-label behavior, and dedicated support must be defined during commercialization.

## Allfit Space scope

### Phase 1 — Training core

- Personal fitness profile.
- Strength routines and workout logging.
- Calendar and progress.
- Programs.
- Basic connection with Allfit Studio.
- A coach assigning routines.
- A linked gym or membership where supported.

The initial proposition is:

> Train on your own or with a professional and keep all your progress in one place.

### Long-term navigation model

- **Today** — The immediate answer to what the person should do today.
- **Train** — Training, logging, planning, and discipline-specific workflows.
- **Explore** — Discovery of professionals, organizations, programs, events, and services.
- **Community** — Real training relationships, clubs, challenges, achievements, and shared activity.
- **You** — Fitness ID, history, progress, memberships, relationships, integrations, and privacy.

These areas are a long-term information architecture, not the release checklist.

### Deferred capabilities

- Broad marketplace and in-app payments.
- Complex social feed.
- Multisport support beyond the validated core.
- Adaptive AI planning and recovery recommendations.
- Wearable and health-platform integrations.
- Nutrition, commerce, events, physical products, and connected equipment.

## Commercial model

### Allfit Studio

The current reference proposal is a recurring subscription that scales with active clients, team members, or locations. Previous public pricing is no longer shown on the parent landing and requires a complete billing specification before it becomes canonical.

Define active-client calculation, proration, taxes, failed payments, cancellations, reactivation, limits, messaging costs, payment processing, and enterprise exceptions before implementation.

### Allfit Space

The long-term direction may combine a useful free training experience with paid analytics, planning, intelligence, specialized tools, and premium programs. No public pricing or final entitlement model is approved.

### Marketplace

Commissions for services, bookings, programs, events, or payments are a later business-model direction. They are not current landing-page claims.

## Current landing-page job

The parent landing currently has five jobs:

1. Establish Allfit One as the parent ecosystem.
2. Name the fragmentation problem before presenting any product.
3. Introduce Fitness ID as the product thesis that connects both sides.
4. Present Allfit Space and Allfit Studio with equal visual hierarchy.
5. Open a real conversation by email while both products are labeled as coming soon.

The page is a numbered editorial sequence: navbar, connected hero, `01` problem, `02` Fitness ID, `03` Allfit Space, `04` Allfit Studio, `05` ecosystem relationship, `06` current status and contact, and the footer. It does not explain pricing or FAQs.

Neither product is demo-able yet, so the page must not offer a demo. Fitness ID appears as a thesis and is explicitly labeled as not publicly available. Bookings, classes, public pages, and marketplace appear only under the Studio "on the way" label because they are future expansion, not V1.

## Current calls to action

- Navigate to the Fitness ID, Allfit Space, Allfit Studio, and ecosystem sections.
- Write to `hello@allfitone.com`.

Neither product has a waitlist or demo CTA until a real destination exists.

## Success metrics

### Ecosystem landing

- Qualified inbound emails from people, coaches, and organizations.
- Engagement with the Fitness ID section and both product anchors.
- Language selection and device-level completion of the hero.
- Organic impressions and qualified branded traffic.

### Allfit Studio

- Time to first configured client.
- Percentage of organizations that configure their operation and public information.
- Percentage that create and assign a first training plan.
- Active businesses, active clients, booking usage, membership activity, and retention.

### Allfit Space

The proposed north-star metric is weekly fitness sessions completed through Allfit One. Supporting measures may include active weeks per person, plan completion, retention, active professional relationships, and connected organizations.

Targets and instrumentation are not yet defined.

## Product status

- The current landing is an early brand and commercial-positioning surface.
- Both Allfit Space and Allfit Studio are presented as coming soon. There is no public demo.
- Fitness ID is presented on the landing as the product thesis and explicitly labeled as not publicly available.
- Marketplace, intelligence, broad integrations, bookings, public pages, and connected-gym capabilities are future directions.
- The internal `/dev` route is a brand lab and must remain `noindex`.

## Non-goals for the current phase

- Positioning Allfit One only as gym-management software.
- Presenting Allfit Studio as a public page, dashboard, and client PWA bundle.
- Presenting Allfit Space only as a hybrid-athlete product.
- Claiming marketplace, AI, wearable, nutrition, community, or commerce capabilities as released.
- Building a complex social feed, general store, medical system, or support for every sport initially.
- Publishing a waitlist or conversion action that has no real destination.

## Open decisions

- Release criteria and MVP boundaries for both products.
- Shared account, organization, role, location, and permission model.
- Fitness ID consent, ownership, export, deletion, encryption, and retention policies.
- Relationship between organization branding and the central Allfit Space experience.
- Pricing and billing specifications for Allfit Studio.
- Free and paid entitlement model for Allfit Space.
- Marketplace timing, provider verification, payments, refunds, and commissions.
- AI safety, explanation, professional oversight, and medical boundaries.
- Supported integrations, countries, currencies, and languages.
- Native application versus progressive web strategy for Allfit Space.
- Analytics events and numeric targets.

## Decision rule

When a feature, campaign, or design direction is proposed, evaluate it against four questions:

1. Does it make fitness more connected for the audience it serves?
2. Does it preserve the distinct role of the App and OS?
3. Does the person retain appropriate control over their identity and data?
4. Can the promise be demonstrated by the current product or clearly labeled as future direction?

If the answer to any question is no, the proposal needs revision.
