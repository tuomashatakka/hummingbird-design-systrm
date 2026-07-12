# @tuomashatakka/hummingbird-design-system

A monochrome, semantic-HTML design system — customizable **oklch** tokens, native
elements, zero utility classes. Ships **React components** and the **raw CSS** (tokens,
base element styles, component variants, and the identity's fonts).

Reconstructed from the Hummingbird Design studio's November 2015 identity: true greys
only, squared corners, letterspaced uppercase display type, colour arriving only as
photographic tint — or as your own live oklch customization.

## Install

```bash
npm i @tuomashatakka/hummingbird-design-system
# peer deps: react, react-dom (^19)
```

## Use it

Import the stylesheet once at the root of your app, then use the components:

```tsx
import '@tuomashatakka/hummingbird-design-system/styles.css'
import { AppStateProvider } from '@tuomashatakka/hummingbird-design-system/state'
import { Button, Card, Row, Grid, ArticleHero } from '@tuomashatakka/hummingbird-design-system'

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

| Import (`@tuomashatakka/hummingbird-design-system…`) | What you get                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| `.`                                                   | every primitive, composite, and layout component                 |
| `./state`                                             | the reducer, action creators, `AppStateProvider`, hooks          |
| `./styles.css`                                        | the whole stylesheet (declares layer order, `@import`s the rest) |
| `./tokens.css`                                        | just the theme tokens (+ `@font-face`)                           |
| `./base.css`                                          | semantic element defaults                                        |
| `./components.css`                                    | component variants + structural CSS                              |
| `./fonts/*`                                           | the raw font files                                               |

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
   recolour it.
3. **Native first.** `<dialog>` with `showModal`, `<details name>` accordions, the
   native Popover API, scroll-snap sliders, `:user-invalid` validation. JavaScript only
   assists.

## Components

**Primitives** (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider,
Heading, Mark, Badge, Progress, Disclosure, Dialog, Popover, Icon, Medallion),
**composites** (Card, Field, Alert, Tabs, Breadcrumb, SearchField, Carousel, Meta,
Swatches, ThemeCustomizer, Notification, Lockup, FounderCard, Pillars, CapabilityStrip,
ArticleHero, ContactPanel, RecentWork), and **layouts** — landmarks (Header, Footer,
Panel) plus the helpers **Row**, **Grid**, and **Overlay**.

Server components by default; interactive pieces carry their own `'use client'`
directive, so the package is RSC-safe. Framework-agnostic: plain `<a>`, plain `<img>` —
no `next/*` anywhere.

### Theming & state

`…/state` is a typed `useReducer` exposed through context:

```tsx
import { useAppState, useDispatch, setTheme, pushNotice } from '@tuomashatakka/hummingbird-design-system/state'

const { theme } = useAppState()
const dispatch  = useDispatch()
dispatch(setTheme('dark'))                 // mirrors data-theme on <html>
dispatch(pushNotice('Saved', 'success'))   // renders in <Notification />
```

`theme` is `'light'` (default) / `'dark'` / `'system'`; `palette` holds per-colour oklch
overrides applied as inline custom properties on `<html>`; `notices` back the
`Notification` toast region. Mount `<Notification />` once near the root.

## Docs

Living documentation with a rendered specimen for every element:
<https://github.com/tuomashatakka/hummingbird-design-system>

## License

MIT © Tuomas Hatakka
