# Hummingbird Design System

A monochrome design system reconstructed from the Hummingbird Design studio's
November 2015 identity style guide, implemented as semantic HTML + design
tokens. This document is the written spec; the living version — every
component rendered with live examples — is the `/design-system` page.

It ships as the npm package **`hummingbird-design-system`** (components + CSS +
fonts). The source lives in `packages/hummingbird/`; the documentation and
portfolio site that renders it lives in `apps/web/`.

```bash
npm i hummingbird-design-system
```

```tsx
import 'hummingbird-design-system/styles.css'
import { AppStateProvider } from 'hummingbird-design-system/state'
import { Button, Card } from 'hummingbird-design-system'
```

The `exports` map: `.` (components), `./state` (reducer + provider + hooks),
`./styles.css` (everything, with layer order), `./tokens.css`, `./base.css`,
`./components.css` (the individual layers), and `./fonts/*`.

## Principles

1. **Monochrome, by design.** The brand is true greys only. Color never
   arrives as a flat UI fill; it exists as photographic overlay tint — or,
   in this implementation, as user customization of the oklch channels.
2. **Squared. Always. Borderless by default.** `--radius` is a token set to
   `0`. Surfaces separate through whitespace and washes rather than boxes;
   when a line is unavoidable it is a hairline (`--hairline`, ~14% ink),
   not a border.
3. **The markup is the API.** Selectors mirror semantic markup
   (`button.primary`, `article.card > header`, `aside[data-slot='panel']`).
   No utility classes, no Tailwind, no Radix, no inline styles.
4. **Native first.** `<dialog>` with `showModal`, `<details name>` accordions,
   scroll-snap sliders, `:user-invalid` validation. JavaScript only assists.
5. **One token file.** Every visual decision resolves to a custom property in
   `src/styles/tokens.css`.

## Color

### Neutral ramp (light theme)

| Token         | Value               | Role                        |
| ------------- | ------------------- | --------------------------- |
| `--paper`     | `oklch(100% 0 0)`   | page background             |
| `--wash`      | `oklch(97% .004 85)`| raised / recessed surfaces  |
| `--line`      | `oklch(90% .006 85)`| hairline borders            |
| `--ink-faint` | `oklch(56% 0 0)`    | captions, disabled          |
| `--ink-soft`  | `oklch(40% 0 0)`    | body text                   |
| `--ink`       | `oklch(31% 0 0)`    | headings, strong borders    |

The dark theme flips the ramp (paper `22%` → ink `97%`); `data-theme` on
`<html>` selects `light` (default), `dark`, or `system`.

Photography carries the only real color: the overlay tints from the
identity kit ship as tokens (`--tint-blue`, `--tint-dark`, `--tint-clear`,
`--tint-magenta`, `--tint-wine`, `--tint-mist`), and photo slides sit under
a diagonal `--scrim` gradient with near-white type (`--on-photo`,
`--on-photo-soft`, `--on-photo-faint`) regardless of theme.

### Customizable brand colors

Every brand color is an **oklch channel triplet** — three custom properties
the rest of the system derives from:

```css
--accent-l: 40%;  --accent-c: 0;    --accent-h: 85;
--danger-l: 40%;  --danger-c: 0.11; --danger-h: 5;
--success-l: 50%; --success-c: 0.05; --success-h: 135;
```

- `--accent` defaults to **chroma 0** — the accent *is* ink until customized.
- `--accent-strong` (hover) derives from `--accent-l` via `calc()`, so it
  tracks customization and flips direction per theme.
- `--accent-wash` is `color-mix(in oklch, var(--accent) 12%, var(--paper))`.
- `danger` (wine) and `success` (moss) are not in the brand book — a
  monochrome identity has no error state — but keep its low-vibrancy feel.

The **ThemeCustomizer** composite edits the triplets at runtime: sliders
dispatch `palette/set` through the global reducer, and the provider writes
the channels as inline custom properties on `<html>` (winning over both
themes until `palette/reset`).

### Variant ramps

Each brand color ships as a nine-step ramp, `100` (near paper) → `900`
(near ink), with `500` the color itself:

```css
--accent-100 … --accent-900
--danger-100 … --danger-900
--success-100 … --success-900
```

Steps are derived in `tokens.css` with `color-mix(in oklch, …)` toward
`--paper` (tints) and `--ink` (shades), so every variant stays correct in
both themes and under customization. All ramps render as full swatch strips
on the `/design-system` page.

## Typography

| Face                    | Role                                   | Weights            |
| ----------------------- | -------------------------------------- | ------------------ |
| Novecento Sans Wide     | display, labels — uppercase, tracked   | 300, 400, 450–700  |
| Sofia Pro               | body — light                           | 200, 300, 400, 700 |
| Montserrat (Google)     | subheadings                            | 300, 400           |
| TeX Gyre Adventor       | the wordmark face (`--font-mark`)      | 400, 700           |
| ui-monospace stack      | code                                   | —                  |

Scale (`--text-*`): `xs` 11px eyebrow · `sm` 13px small print · `md` 16px
body · `lg` 22px h4 · `xl` 30px h3 · `2x` 36px h2 · `3x` 54px h1 ·
`4x` fluid hero (`clamp(3.375rem, 8vw, 5.5rem)`).

Rules: display type is never bolded for emphasis; body copy caps at
`--measure` (68ch); leading is `1.2` tight / `1.7` normal.

## Rhythm, shape, motion

- **Spacing** — 4/8 grid: `xs` 8 · `sm` 12 · `md` 24 · `lg` 48 · `xl` 96 (px).
- **Widths** — `--measure` 68ch · `--page-max` 80rem · `--panel-w` 20rem ·
  `--grid-min` 16rem (the `Grid` column floor; `data-min` presets override it).
- **Shape** — `--radius: 0`; the one exception is `--radius-full` (999px) for
  icon medallions. Borders are `--border-hair` (hairline), `--border` (`--line`),
  and `--border-strong` (`--ink`).
- **Elevation** — `--shadow-1` / `--shadow-2`, used *very* sparingly (soft cards
  and the recent-work grid lift on hover; nothing floats by default).
- **Motion** — `--snap` (200ms cubic-bezier) for hovers and toggles, plus
  the signature reveal curve `--immersive` (cubic-bezier(0.16, 1, 0.3, 1))
  for slide dots, nav underlines, toast entrance, and section reveals. All
  collapsed under `prefers-reduced-motion`.

## Component inventory

### Primitives — `packages/hummingbird/src/components/primitives/`

| Component  | Renders                              | Essential props                          |
| ---------- | ------------------------------------ | ---------------------------------------- |
| Button     | `button`                             | variant, size, disabled, type, onClick   |
| Input      | `input`                              | type, value, placeholder, required, onChange |
| Textarea   | `textarea`                           | value, rows, placeholder, onChange       |
| Select     | `select`                             | options, value, onChange                 |
| Checkbox   | `label > input[type=checkbox]`       | label, checked, onChange                 |
| Radio      | `label > input[type=radio]`          | label, name, value, checked, onChange    |
| Switch     | `input[role=switch]`                 | label, checked, onChange                 |
| Slider     | `input[type=range]`                  | label, min, max, step, value, onChange   |
| Heading    | `h1`–`h6`                            | level, id                                |
| Mark       | `svg` (brand mark, currentColor)     | label                                    |
| Badge      | `span[data-badge]`                   | variant                                  |
| Progress   | `progress`                           | label, value, max                        |
| Disclosure | `details/summary`                    | summary, open, name                      |
| Dialog     | `dialog` (showModal)                 | open, title, footer, onClose             |
| Popover    | `button[popovertarget]` + `[popover]`| label, id                                |
| Icon       | `svg[data-icon]` (Feather line set)  | name, label                              |
| Medallion  | `span[data-medallion] > Icon`        | icon, label                              |

`Popover` is the native Popover API — the browser owns open/close and light dismiss.
`Icon` covers the identity's affordances (user, umbrella, award, mail, phone, pin,
clock, arrow, close, menu) at the 1.6px hairline stroke; `Medallion` wraps one in the
one full-radius (`--radius-full`) element the system allows.

### Composites — `packages/hummingbird/src/components/composites/`

| Component       | Renders                                    | Essential props        |
| --------------- | ------------------------------------------ | ---------------------- |
| Card            | `article.card`                             | title, footer          |
| Field           | `div[data-field]`                          | label, htmlFor, hint, error |
| Alert           | `aside[data-alert]`                        | variant, title         |
| Tabs            | `[role=tablist]` + panels                  | tabs, label            |
| Breadcrumb      | `nav > ol`                                 | items                  |
| SearchField     | `form[role=search]`                        | placeholder, onSearch  |
| Carousel        | `section[aria-roledescription=carousel]`   | slides (image, content), label |
| Meta            | `dl[data-meta]`                            | items                  |
| Swatches        | `div[data-swatches]`                       | tokens, label          |
| ThemeCustomizer | `form[data-component=theme-customizer]`    | —                      |
| Notification    | `output[data-notifications]` (toasts)      | timeout                |
| Lockup          | `span[data-lockup]` (mark + wordmark)      | wordmark, variant      |
| FounderCard     | `article[data-founder]` (slate block)      | name, role, cta        |
| Pillars         | `ul[data-pillars]` (three-service strip)   | items                  |
| CapabilityStrip | `ul[data-capabilities]` (medallions)       | items                  |
| ArticleHero     | `section[data-article-hero]` (photo + tint)| title, image, tint, eyebrow, byline |
| ContactPanel    | `section[data-contact]` (form on slate)    | heading, lead, details, onSubmit |
| RecentWork      | `div[data-work]` (grid of figures)         | items, min             |

`Notification` renders the global reducer's `notices`; the brand composites
(`FounderCard`…`RecentWork`) reconstruct the identity's portfolio surfaces. The AI
`Chat` (`section[data-component=chat]`) lives in `apps/web` — it is the only piece with
AI-SDK dependencies, so it stays out of the package.

### Layouts — `packages/hummingbird/src/components/layouts/`

Landmarks live in the `layouts/landmarks/` subfolder; layout helpers sit alongside.

| Component | Renders                            | Essential props | Folder      |
| --------- | ---------------------------------- | --------------- | ----------- |
| Header    | `body > header` (sticky)           | brand, links    | landmarks/  |
| Footer    | `body > footer`                    | —               | landmarks/  |
| Panel     | `aside[data-slot='panel']`         | label           | landmarks/  |
| Row       | `[data-layout='row']`              | align, wrap     | layouts/    |
| Grid      | `[data-layout='grid']`             | min             | layouts/    |
| Overlay   | `[data-overlay]` (fixed takeover)  | open, label, onClose | layouts/ |

`Row` stacks children horizontally on the gap rhythm; `Grid` is an auto-filling grid
view whose column floor is a token preset (`--grid-min`); `Overlay` is a fixed,
full-viewport layer over an opaque scrim, dismissing on backdrop click / Escape.

## Portfolio surfaces

- **Screens** — `[data-layout='screens']` turns a page into full-height
  scroll-snap sections (the front page); sections drift in with a
  blur/translate reveal via CSS scroll-driven animations where supported.
- **Carousel** — a native scroll-snap slider. Slides with an `image` render
  it full-bleed under the diagonal scrim with near-white type; controls are
  hairline chevron squares and line-style dots that stretch when current.
- **Assets** — the identity kit's mountain photography and hummingbird
  mark/logo live in `src/assets/`.

## Theming & state

Global state lives in `src/lib/state/` (typed reducer + context):

- `theme` — `'light'` (default) | `'dark'` | `'system'`, mirrored to
  `data-theme` on `<html>`.
- `palette` — per-color `ColorChannels` overrides (`lightness`, `chroma`,
  `hue`), applied as inline `--{color}-l/c/h` properties. Empty means the
  token defaults rule.

Actions: `theme/set`, `palette/set`, `palette/reset`, plus panel and notice
actions. Components dispatch creators from `actions.ts`, never object
literals.

## File map

```
packages/hummingbird/
  styles/tokens.css        # the whole theme: channels, ramps, scale, rhythm, fonts
  styles/base.css          # semantic element defaults (incl. range slider)
  styles/components.css    # variants + structural CSS, grouped with native nesting
  styles/index.css         # declares layer order, @imports the three above
  styles/fonts/            # the identity's .otf faces
  src/components/…         # primitives / composites / layouts (see tables)
  src/lib/state/           # reducer, actions, provider (theme + palette + notices)
  src/{index,state}.ts     # the package entry points → the exports map

apps/web/
  src/app/page.tsx         # portfolio landing with the highlight carousel
  src/app/portfolio/       # full portfolio page assembled from the composites
  src/app/design-system/   # the living design system documentation
  src/components/Chat.tsx   # the AI chat (app-only; AI-SDK deps)
```
