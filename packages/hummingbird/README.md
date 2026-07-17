# hummingbird-design-system

A monochrome, semantic-HTML design system — customizable **oklch** tokens, native
elements, zero utility classes. Ships **React components** and the **raw CSS** (tokens,
base element styles, component variants).

Reconstructed from the Hummingbird Design studio's November 2015 identity: true greys
only, squared corners, letterspaced uppercase display type, colour arriving only as
photographic tint — or as your own live oklch customization.

## Install

```bash
npm i hummingbird-design-system
# peer deps: react, react-dom (^19)
```

## Use it

Import the stylesheet once at the root of your app, then use the components:

```tsx
import 'hummingbird-design-system/styles'
import { Button, Card, Row, Grid, Spinner } from 'hummingbird-design-system'

export default function App () {
  return (
    <Card title='Hello'>
      <p>Semantic HTML, styled directly — no className, no utility soup.</p>
      <Row>
        <Button variant='primary'>Primary</Button>
        <Button variant='ghost'>Ghost</Button>
      </Row>
    </Card>
  )
}
```

### Exports map

| Import (`hummingbird-design-system…`) | What you get                                             |
| ------------------------------------- | -------------------------------------------------------- |
| `.`                                    | every primitive, composite, and layout component         |
| `./state`                              | `createStore(reducer, initialState)` — a typed store factory |
| `./styles`                             | the whole stylesheet — tokens, base defaults, components |

One stylesheet import covers everything: it declares `@layer base, components;` and
pulls in the tokens, the semantic element defaults, and the component CSS in the right
order.

### Fonts

No font files ship with the package. The identity's faces — Sofia Pro, Novecento Sans
Wide, TeX Gyre Adventor — render when installed locally; otherwise the stacks fall back
to **Poppins** (for Sofia Pro) and **Montserrat** (for Novecento and the wordmark face),
loaded automatically through a Google Fonts `@import` inside the stylesheet. Self-host
those two families and the `@import` becomes a no-op.

## The system in three ideas

1. **The markup is the API.** Selectors mirror semantic markup — `button.primary`,
   `article.card > header`, `aside[data-slot='panel']`. No utility classes, no Tailwind,
   no Radix, no inline styles. Components take essential props only (no `className`, no
   `style`, no size/colour/margin props — that is CSS's job).
2. **One token file.** Every visual decision resolves to a custom property in
   `tokens.css`. Brand colours are **oklch channel triplets** (`--color-accent-l/-c/-h`) with
   nine-step `color-mix` ramps; the accent defaults to chroma 0, so it *is* ink until you
   recolour it.
3. **Native first.** `<dialog>` with `showModal`, `<details name>` accordions, the
   native Popover API, scroll-snap sliders, `:user-invalid` validation. JavaScript only
   assists.

## Components

**Primitives** (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider,
Heading, Mark, Badge, Progress, Spinner, Skeleton, Divider, Disclosure, Dialog,
Popover, Icon, Medallion), **composites** (Card, Field, Alert, Tabs, Breadcrumb,
SearchField, ButtonGroup, Carousel, Meta, Notification, Lockup), and **layouts** —
landmarks (Header, Footer, Panel) plus the helpers **Row**, **Grid**, and **Center**.

Highlights:

- **Field** wraps its control in the label — implicit association, no `htmlFor`/`id`
  pairing. Don't nest the self-labelling controls (Checkbox/Radio/Switch) inside it.
- **Dialog** is the one overlay surface: a native `<dialog>` with `variant='overlay'`
  for immersive takeovers, `modal` (`showModal()` vs `show()`), and `dismissible`.
- **Header / Panel / Footer / Notification** are controlled and stateless — wire them
  to whatever state you use (see Theming & state below).
- **Spinner, Skeleton, Divider, ButtonGroup, Center** are CSS-first: the same looks
  work on plain HTML via `data-spinner`, `data-skeleton`, `hr[data-label]`,
  `data-button-group`, and `data-layout='center'`.
- Accordions animate natively (`interpolate-size` + `::details-content`), overlays
  enter/exit via `@starting-style`, and `progress:indeterminate` animates in every
  engine.

Server components by default; interactive pieces carry their own `'use client'`
directive, so the package is RSC-safe. Framework-agnostic: plain `<a>`, plain `<img>` —
no `next/*` anywhere.

### Theming & state

The package predefines **no state shape and no actions**. `…/state` exports one thing —
a typed store factory:

```tsx
import { createStore } from 'hummingbird-design-system/state'

const store = createStore(reducer, initialState)
// → { Provider, useStore, useSelector, useDispatch } — all typed from your reducer

export const { Provider, useStore, useDispatch } = store
```

Call it once at module scope and import the result from that one module everywhere
(each call creates its own context pair — a second call is a second store). The
`Provider` accepts an optional per-mount `initialState` override.

Theming is pure CSS: set `data-theme='light' | 'dark' | 'system'` on `<html>` — the
neutral ramp and shadows flip through `light-dark()` pairs steered by `color-scheme`.
Recolour by writing the `--color-accent-l/-c/-h` channels (inline on `<html>`, or in your own
stylesheet); text on brand fills derives from the fill itself via `--on-accent`, so any
lightness stays readable.

## Docs

Living documentation with a rendered specimen for every element:
<https://github.com/tuomashatakka/hummingbird-design-system>

## License

MIT © Tuomas Hatakka
