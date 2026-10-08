## Scope

Redesign only the sections **below the hero** on `src/pages/landing/AiFirstGcc.tsx`. Hero (Wavy background, headline, CTAs, trust bar) and all section copy stay identical. Footer stays. This is a per-page editorial override of the global dark-navy theme - intentional for this LP.

## Visual language (inspired, not copied)

- **Canvas:** white throughout, generous whitespace, no full-width colored bands except one accent strip.
- **Typography:** body stays Inter. Add a serif accent face (`Instrument Serif`, Google Fonts, free) used **only on selected headline words** - e.g. *"AI-led transformation"*, *"12-week path"*, *"more than a staffing vendor"*, *"design, launch, and scale"*, *"how you operate"*. Italic serif inline within sans headings to create the reference's mixed-type cadence.
- **Cards:** large `rounded-[32px]` / `rounded-[40px]`, soft layered shadow `0 4px 16px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`. One dark card variant `bg-[#051A24]` text white per section grid for contrast.
- **Buttons:** pill `rounded-full px-7 py-3.5`. Primary = dark `bg-[#051A24]` text white with the reference's multi-layer + inset highlight shadow. Secondary = white with hairline shadow. Existing brand cyan `#0a93bd` retained as the accent/link color and on chips.
- **Eyebrows:** keep the existing `uppercase tracking-[0.25em]` micro-labels but switch color to neutral `#273C46` with a tiny cyan dot prefix.
- **Section rhythm:** alternating tight (max-w-2xl centered text) and wide (max-w-6xl grid) blocks; left-offset text (`md:ml-20`) on stacked rows like the reference Projects layout.
- **Motion:** keep existing `ScrollReveal` / `StaggerContainer` (framer-motion). Add a CSS `fade-in-up` for marquee items. Keep Lenis smooth scroll.

## Section-by-section redesign (content unchanged)

1. **WHAT WE DO** (`#what-we-do`)
   - Centered intro block (max-w-2xl), eyebrow + heading with serif accent on *"transformation"*.
   - 3 `CARDS` rendered as **rounded-[32px]** cards. Middle card uses dark `#051A24` variant (white text, cyan chip on dark). Image at top, content padded `pl-10 pr-10 pt-3 pb-10`. Bullets keep CheckCircle in cyan. Link becomes a small pill instead of inline arrow.

2. **NEW: Logo / Capability marquee** (insert between What We Do and Implementation)
   - Full-bleed infinite marquee of small monochrome **text tiles** (no images, zero asset reuse rule) showing things like `AI STRATEGY · DATA ENGINEERING · MLOPS · RESPONSIBLE AI · BOT · CAPTIVE · EOR · MICRO-GCC · LLMOPS · GOVERNANCE`. CSS `@keyframes marquee` translateX 0 to -50%, 40s linear, duplicated track. Subtle top/bottom hairline borders.

3. **IMPLEMENTATION** (`#implementation`)
   - Heading centered, serif accent on *"12-week path"*.
   - 4 `PHASES` rendered as a **horizontal timeline row** on md+: numbered circles connected by a thin dashed line, week chip + title + body stacked below each. Stacks vertically on mobile.
   - `BUILDING_BLOCKS` panel becomes a **rounded-[40px]** white card with hairline border, 2-col list, each row separated by a 1px divider; icon in a small cyan tinted square.

4. **WHY** (`#why`)
   - Two-column layout: left = heading + intro (serif accent on *"more than a staffing vendor"*). Right = the 4 `WHY` items as a single column with large serif numerals `01-04` in `Instrument Serif` italic at 64-80px, hairline dividers between rows. No cards.

5. **PLANNING TOOLS** (`#tools`)
   - Replace current cyan gradient + dot pattern with **white background**, just one dark `#051A24` rounded-[40px] container holding the 3 tool cards inside, so the contrast moment lives here instead. Tool cards inside become light cards on the dark surface. CTA stays primary pill.

6. **HOW WE ENGAGE** (`#engage`)
   - Editorial stacked list (not 3 cols): three rows each with left-offset (`md:ml-20`) text and a large serif number on the left, hairline divider between rows, generous py spacing - mirrors the reference's Projects stack.
   - Serif accent on *"design, launch, and scale"* in heading.

7. **TALENT PODS**
   - Header row: title left (serif accent on *"how you operate"*), small "4 pods" pill on the right.
   - 4 pods become an **auto-scrolling horizontal carousel** (3s interval, pause on hover, prev/next circular buttons `w-12 h-12 rounded-full border`), each card `rounded-[32px]` with icon, title, body, and pill "Explore pod".

8. **NEW: Final partner CTA strip** (above Footer)
   - Full-width white section, max-w-6xl, py-32. Centered serif headline *"Partner with us on your AI-first GCC."* Below: dark primary pill CTA "Speak to a GCC advisor" (existing `CAL_BOOKING_URL`) + secondary "Get the GCC Blueprint" (`/build-gcc-india`). Same content/destinations the page already uses - just a clean editorial closer matching the reference's Partner section energy. No mouse-trail GIFs (zero asset reuse).

## Technical notes

- Add `Instrument Serif` via `<link>` in `index.html` (or already-loaded Google font block) and a Tailwind utility `font-serif-display` mapped to it in `tailwind.config.ts`.
- Add shared CSS in `src/index.css`: `@keyframes marquee`, `.btn-shadow-primary`, `.btn-shadow-secondary` matching the reference's layered shadows.
- Extract two small components into `src/components/landing/ai-first-gcc/`:
  - `CapabilityMarquee.tsx`
  - `PodsCarousel.tsx`
- All other JSX changes happen inline in `AiFirstGcc.tsx`. No data arrays change. No new routes.
- Memory exceptions for this page (LP override): white background, 32-40px card radii, serif accent face. Will note in memory after build.

## Out of scope

- Hero section (untouched).
- All copy (untouched).
- Global theme, nav, footer, other LPs.