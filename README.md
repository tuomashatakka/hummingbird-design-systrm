# hummingbird-design-system

A monochrome, semantic-HTML design system — customizable **oklch** tokens, native
elements, zero utility classes. Ships **React components** and the **raw CSS** (tokens,
base element styles, component variants, and the identity's fonts).

Reconstructed from the Hummingbird Design studio's November 2015 identity: true greys
only, squared corners, letterspaced uppercase display type, colour arriving only as
photographic tint — or as your own live oklch customization.

This repository is a Bun-workspace monorepo:

```
packages/hummingbird   → the published package `hummingbird-design-system`
apps/web               → the living documentation + portfolio site (Next.js)
```

## Install

```bash
npm i hummingbird-design-system
# peer deps: react, react-dom (^19)
```

## Use it

Import the stylesheet once at the root of your app, then use the components:

```tsx
import 'hummingbird-design-system/styles.css'
import { AppStateProvider } from 'hummingbird-design-system/state'
import { Button, Card, Row, Grid, ArticleHero } from 'hummingbird-design-system'

export default function App () {
  return (
    <AppStateProvider>          {/* theming, palette, notices */}
      <Card title='Hello'>
        <p>Semantic HTML, styled directly — no className, no utility soup.</p>
        <Row>
          <Button variant='primary'>Primary</Button>
          <Button variant='ghost'>Ghost</Button>
        </Row>
      </Card>
    </AppStateProvider>
  )
}
```

### Exports map

| Import                                   | What you get                                          |
| ---------------------------------------- | ----------------------------------------------------- |
| `hummingbird-design-system`              | every primitive, composite, and layout component      |
| `hummingbird-design-system/state`        | the reducer, action creators, `AppStateProvider`, hooks |
| `hummingbird-design-system/styles.css`   | the whole stylesheet (declares layer order, `@import`s the rest) |
| `hummingbird-design-system/tokens.css`   | just the theme tokens (+ `@font-face`)                |
| `hummingbird-design-system/base.css`     | semantic element defaults                             |
| `hummingbird-design-system/components.css` | component variants + structural CSS                 |

The stylesheet declares `@layer base, components;` internally, so import order never
matters. To adopt only the theme (custom properties + fonts) without the component CSS,
import `tokens.css` alone.

## The system in three ideas

1. **The markup is the API.** Selectors mirror semantic markup — `button.primary`,
   `article.card > header`, `aside[data-slot='panel']`. No utility classes, no Tailwind,
   no Radix, no inline styles. Components take essential props only (no `className`, no
   `style`, no size/colour/margin props — that is CSS's job).
2. **One token file.** Every visual decision resolves to a custom property in
   `tokens.css`. Brand colours are **oklch channel triplets** (`--accent-l/-c/-h`) with
   nine-step `color-mix` ramps; the accent defaults to chroma 0, so it *is* ink until you
   recolour it. `--radius` is `0`; the sole exception is `--radius-full` for icon
   medallions.
3. **Native first.** `<dialog>` with `showModal`, `<details name>` accordions, the
   native Popover API, scroll-snap sliders, `:user-invalid` validation. JavaScript only
   assists.

## Components

Fourteen-plus **primitives** (Button, Input, Textarea, Select, Checkbox, Radio, Switch,
Slider, Heading, Mark, Badge, Progress, Disclosure, Dialog, **Popover**, **Icon**,
**Medallion**), **composites** (Card, Field, Alert, Tabs, Breadcrumb, SearchField,
Carousel, Meta, Swatches, ThemeCustomizer, **Notification**, **Lockup**, **FounderCard**,
**Pillars**, **CapabilityStrip**, **ArticleHero**, **ContactPanel**, **RecentWork**), and
**layouts** — landmarks in `layouts/landmarks/` (Header, Footer, Panel) plus the layout
helpers **Row** (horizontal stacking), **Grid** (responsive grid view), and **Overlay**
(fixed full-viewport takeover).

Every one is documented with a live example on the `/design-system` page; the written
spec lives in [`docs/hummingbird-design-system.md`](docs/hummingbird-design-system.md).

### Theming & state

`hummingbird-design-system/state` is a typed `useReducer` exposed through context:

```tsx
import { useAppState, useDispatch, setTheme, pushNotice } from 'hummingbird-design-system/state'

const { theme } = useAppState()
const dispatch  = useDispatch()
dispatch(setTheme('dark'))                 // mirrors data-theme on <html>
dispatch(pushNotice('Saved', 'success'))   // renders in <Notification />
```

`theme` is `'light'` (default) / `'dark'` / `'system'`; `palette` holds per-colour oklch
overrides applied as inline custom properties on `<html>`; `notices` back the
`Notification` toast region. Mount `<Notification />` once near the root.

## Develop

```bash
bun install                 # install the whole workspace
bun run build:pkg           # build the package → packages/hummingbird/dist (bunchee)
bun run dev                 # build the package, then run the docs site (localhost:3000)
bun run build               # build the package + the docs site
bun run build:pages         # static export of the docs site → apps/web/out
bun run lint                # @tuomashatakka/eslint-config
bun run typecheck           # strict tsc, every workspace
```

The docs app consumes the package through the Bun workspace and Next's
`transpilePackages`, so a `bun run build:pkg` refreshes what the site renders.

## Publish

```bash
cd packages/hummingbird
npm publish                 # ships dist/ + styles/ (CSS + fonts); see the exports map
```

## Deploy the docs site

- **Vercel** — import the repo, root the project at `apps/web`, set `ANTHROPIC_API_KEY`
  for the chat route, ship.
- **GitHub Pages** — push to `main`; `.github/workflows/deploy-pages.yml` builds the
  package, runs `build:pages` (static export with `basePath = /<repo>`), and publishes
  `apps/web/out`. The AI chat degrades gracefully where there is no server runtime.

## Conventions

See [`CLAUDE.md`](CLAUDE.md) — it doubles as the instruction file for AI coding agents and
the architectural contract for humans.
