# Typography and card design system

Single source of truth for type and card styling across the whole site.
Defined in two files only:

- `tailwind.config.ts` — the type scale (`theme.extend.fontSize`)
- `src/index.css` — design tokens (`:root`), semantic `.type-*` classes,
  the `.card` family, `.eyebrow`, buttons and section rhythm

Do not introduce page-level font sizes, card shapes or section paddings.
If something is missing here, add it here.

## Type scale

Every step carries its own line-height and letter-spacing, so a size class on
its own already produces correct rhythm. An explicit `leading-*` / `tracking-*`
utility still wins (Tailwind emits those after `fontSize`).

| Class          | Size            | Role                                     |
| -------------- | --------------- | ---------------------------------------- |
| `text-2xs`     | 12px            | eyebrow, micro label, badge              |
| `text-xs`      | 13px            | caption, table cell, source note, meta   |
| `text-sm`      | 15px            | small body, card body, buttons, nav      |
| `text-base`    | 17px            | body (matches the `<body>` size)         |
| `text-lg`      | 19px            | lede / intro paragraph                   |
| `text-xl`      | 21px            | card title / h4                          |
| `text-2xl`     | 24px            | h3 (compact)                             |
| `text-3xl`     | 28px            | h3                                       |
| `text-4xl`     | 32px            | h2 (static)                              |
| `text-5xl`..`9xl` | 40 → 72px    | landing-page display type; 72px is the ceiling |

Fluid semantic steps (use these for real headings):

| Class                          | Range      | Role     |
| ------------------------------ | ---------- | -------- |
| `text-hero-sm md:text-hero`    | 36 → 72px  | H1       |
| `text-display-sm md:text-display` | 28 → 46px | H2      |

The two pairs are tuned so the mobile and desktop clamps meet exactly at the
`md` breakpoint (768px): there is no size jump when the breakpoint flips.

### Semantic classes

Prefer these in new markup — they compose the scale above:

`.type-h1` `.type-h2` `.type-h3` `.type-h4` `.type-lede` `.type-body`
`.type-small` `.type-caption` `.type-label` `.type-button` `.type-nav`

They set size/rhythm only. Colour stays on `text-heading`, `text-body`,
`text-body-muted`.

### Eyebrow

One spec site-wide: `.eyebrow` — 12px, `0.16em` tracking, uppercase, weight 500.
Where an eyebrow needs a different colour, use
`text-2xs tracking-[0.16em] uppercase <colour-class>`.

### `text-heading` is a COLOUR, not a size

`heading` was removed from `theme.fontSize`. It used to generate a 24px
`.text-heading` utility that collided with the `.text-heading` colour utility
in `index.css` and, being emitted later, silently overrode `text-display-sm`
on ~280 H2s. Never add a `fontSize` key whose name matches a colour utility.

## Card system

One card shape everywhere. Tokens live on `:root`:

```
--card-radius: 1rem        /* 16px, i.e. rounded-2xl */
--card-border: rgba(14,19,32,0.07)
--card-shadow: 0 1px 2px rgba(14,19,32,0.04)
--card-pad: 1.5rem         /* 24px, 28px from md up */
```

Classes: `.card`, `.card-compact`, `.card-lg`, `.card-flush`, `.card-on-dark`,
plus `.card-title` / `.card-body` for the interior.

In existing Tailwind markup the equivalent is:

```
rounded-2xl border border-black/[0.06] bg-white p-6 md:p-7
```

Rules:

- One radius for cards: `rounded-2xl`. No `rounded-xl` / `rounded-3xl` cards.
- One border: `border-black/[0.06]`. No coloured card borders.
- No coloured top strips, coloured left rules or per-page accent blocks.
- No heavy shadows or gradients on card surfaces.
- Padding is `p-6 md:p-7` (compact `p-5 md:p-6`, feature `p-8 md:p-10`).

## Section rhythm

Two rhythms only:

- standard — `py-20 md:py-28` (or the `.section` class)
- tight — `py-14 md:py-20` (or `.section-sm`)

## Fonts

Inter (self-hosted via `next/font` in `pages/_app.tsx`) is the single family
for the whole site — UI, body and headings. `Instrument Serif` is loaded for
one decorative italic accent on `/lp/ai-first-gcc` only (`.font-serif-display`);
it is not part of the system and should not spread to other pages.
