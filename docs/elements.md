# Element index

Every component exported from `hummingbird-design-system`, plus the CSS hooks
that are deliberately *not* wrapped in a component. One entry per export:
what it renders, its essential props, and when to reach for it.

This file is **hand-maintained**, same as the "Where things go" table in
`CLAUDE.md`. When you add, rename, or change the props of an exported
component, update this file and its `apps/web/src/app/design-system/registry.tsx`
entry in the same change — `registry.tsx` is the closest thing to a second
source of truth (it renders a live preview next to real code), so drafting
this file from a finished `registry.tsx` is the easiest way to keep both honest.

## Primitives

Anything that renders a single element. `packages/hummingbird/src/components/primitives/`.

| Component | Renders | Essential props | Use it for |
|---|---|---|---|
| `Button` | `button` | `variant, size, disabled, type, onClick` | The one clickable action element. `primary` / `ghost` / `error`, optional `small`. |
| `Input` | `input` | `type, name, placeholder, value, disabled, required, onChange` | Bare text control; validation rides on `:user-invalid`. Label it with `Field`. |
| `Textarea` | `textarea` | `name, placeholder, value, rows, disabled, required, onChange` | Multi-line input, vertically resizable. |
| `Select` | `select` | `options, name, value, disabled, required, onChange` | Native select fed an options array. |
| `Checkbox` | `label[data-check] > input[type=checkbox]` | `label, name, value, checked, disabled, onChange` | Self-labelling checkbox row. |
| `Radio` | `label[data-check] > input[type=radio]` | `label, name, value, checked, disabled, onChange` | Self-labelling radio row; group with a shared `name`. |
| `Switch` | `label[data-check] > input[role=switch]` | `label, name, checked, disabled, onChange` | A checkbox that reads as a toggle. |
| `Slider` | `input[type=range]` | `label, min, max, step, value, disabled, onChange` | Native range input. |
| `Heading` | `h1`…`h6` | `level, id` | Level-checked heading with an optional anchor id. |
| `Eyebrow` | `p[data-eyebrow]` | `variant` | A small-caps kicker label above a heading. `variant='flourish'` centers it between two hairline segments. |
| `Badge` | `span[data-badge]` | `variant` | Uppercase hairline chip — `accent` / `success` / `error` or neutral. |
| `Progress` | `progress` | `label, value, max` | Native progress; omit `value` for an indeterminate marching bar. |
| `Spinner` | `span[data-spinner]` | `label, size` | Pure-CSS loading spinner. Freezes under reduced motion. |
| `Skeleton` | `span[data-skeleton]` | `variant, lines` | Loading placeholder shapes with a shimmer sweep. |
| `Disclosure` | `details > summary` | `summary, children, open, name` | Native disclosure; a shared `name` makes an exclusive accordion. |
| `Dialog` | `dialog` | `open, onClose, title, footer, label, variant, modal, dismissible` | The one overlay surface. `variant='overlay'` gives the immersive full-scrim takeover. |
| `Popover` | `button[popovertarget] + [popover]` | `label, children, id?` | Native Popover API — browser owns dismiss and the top layer. |
| `Divider` | `hr[data-label]` | `label` | Horizontal rule with an optional centered eyebrow label. |
| `Icon` | `svg[data-icon]` | `name, label` | Hand-picked line-icon set at the system's hairline stroke. |
| `Mark` | `svg` | `label, animate` | The Hummingbird brand mark. `animate` plays a one-shot stroke-draw-in reveal. |
| `Medallion` | `span[data-medallion]` | `icon, label` | The one full-radius element — a circular disc reversing a line glyph. |
| `Grain` | `div[data-grain]` | — | Fixed, full-bleed procedural noise texture at 5% opacity. Mount once, near the root. Hidden under reduced motion. |

## Composites

Anything composed of primitives. `packages/hummingbird/src/components/composites/`.

| Component | Renders | Essential props | Use it for |
|---|---|---|---|
| `Card` | `article.card` | `title, footer, children` | Header/body/footer on a washed surface. |
| `Field` | `label[data-field]` | `label, hint, error, children` | Wraps a control with an implicit label association. Don't nest `Checkbox`/`Radio`/`Switch` in it — they self-label. |
| `Alert` | `aside[data-alert]` | `variant, title, children` | A callout on a hairline spine — `info`/`success` announce via `role=status`, `error` via `role=alert`. |
| `Tabs` | `[role=tablist] + panels` | `tabs, label` | ARIA tablist with roving tabindex. |
| `Breadcrumb` | `nav > ol` | `items` | A structured trail; the last item is the current page. |
| `SearchField` | `form[role=search]` | `placeholder, onSearch` | Input + submit in a search landmark. |
| `ButtonGroup` | `div[role=group][data-button-group]` | `label, children` | Fuses adjacent buttons into one strip. |
| `Carousel` | `section[data-component=carousel]` | `slides, label` | Native scroll-snap slide list with chevrons and dots. A slide with an `image` gets full-bleed photography under the identity's diagonal scrim, with scroll-linked parallax where the platform supports it. |
| `Meta` | `dl[data-meta]` | `items` | Label/value pairs on hairline rules — fewer, longer-form facts. |
| `Sheet` | `dl[data-sheet]` | `items` | Term/value pairs on a baseline grid, term as a fixed-width eyebrow column — denser than `Meta`, no hairline rule. Reach for `Sheet` with many short facts (a spec list, a colophon); reach for `Meta` with fewer, longer pairs. |
| `Notification` | `output[data-notifications]` | `notices, onDismiss, timeout` | Fixed, live-announced toast stack. Controlled — the consumer owns the queue. |
| `Lockup` | `span[data-lockup]` | `wordmark, variant` | Brand lockup — mark plus wordmark, primary or `inverse`. |

## Layouts

Layout helpers. `packages/hummingbird/src/components/layouts/`.

| Component | Renders | Essential props | Use it for |
|---|---|---|---|
| `Row` | `[data-layout='row']` | `align, wrap` | Horizontal stacking with the system gap. |
| `Grid` | `[data-layout='grid']` | `min, as` | Auto-filling grid, column floor from a token preset (`sm`/`md`/`lg`). `as='ul'` renders a semantic list — pass your own `<li>` children for a card grid. |
| `Wrap` | `[data-layout='wrap']` | — | Page-width container — clamps content to `--page-max` and centers it. |
| `Pillars` | `[data-layout='pillars']` | `items` | A row of icon-led feature columns — medallion, heading, body copy. |
| `Center` | `[data-layout='center']` | `axis` | Grid-based centering, `axis='both'` for dead-center. |

## Landmarks

Page skeleton / structural elements. `packages/hummingbird/src/components/layouts/landmarks/`.

| Component | Renders | Essential props | Use it for |
|---|---|---|---|
| `Header` | `body > header` | `brand, links (label, href, current), homeHref, actions` | Sticky page header — brand lockup, primary nav, an `actions` slot. Mark a link `current` to render `aria-current='page'`; the underline-grow CSS follows it, but computing *which* link is current (e.g. via `IntersectionObserver` scroll-spy) is app-level behavior — see the Patterns page. |
| `Panel` | `aside[data-slot='panel']` | `label, open, onClose, children` | Docked right-hand drawer. Controlled and always mounted so it can transition both ways. |
| `Footer` | `body > footer` | `children` | The colophon landmark. |

## Attribute hooks

Complete, styled CSS selectors that are deliberately **not** wrapped in a
component — because the shape is trivial enough that a wrapper would only
add an abstraction (`[data-layout='stack']`, `[data-layout='cluster']`), or
because every consumer already brings its own anchor/Link implementation and
the package ships only plain `<a>` (`a[data-button]`, `a[data-cta]`). Apply
the attribute directly to your own markup.

| Hook | Renders | Use it for |
|---|---|---|
| `a[data-button]` | Link styled as a button | `data-button='primary'` for the filled variant. |
| `a[data-cta]` | Bordered call-to-action link | Hero-style sections; see the homepage. |
| `ul[data-tags]` | Marker-less badge cluster | A tech-stack or tag list. |
| `ul[data-icon-list]` | Icon + text rows | A short feature/benefit list. |
| `ol[data-timeline]` | Dated entries on a hairline spine | A changelog or history list. |
| `header[data-section-head]` | Eyebrow + title + lede wrapper | A section opener that doesn't need `Eyebrow` and `Heading` composed by hand. |
| `[data-layout='stack']` | Vertical stack, system gap | Default vertical rhythm between siblings. |
| `[data-layout='cluster']` | Wrapping horizontal cluster | Inline groups of chips/buttons that should wrap. |
| `[data-layout='split']` | Two-column grid, collapses under 56rem | Prose beside a fact list (see the homepage About section). |
| `[data-layout='screens']` | Full-height snap-scroll sections | A one-page scroll-snap layout (see the homepage). |
| `section[data-hero]` | Centered hero block | Add `data-reveal='cinematic'` for the 8s blur-in envelope with staggered child reveals (see the homepage hero). |

## Package state

`packages/hummingbird/src/lib/state/` — a generic `createStore(reducer, initialState)`
factory only. It carries no app state itself; reducers, actions, and state
shapes live in the consuming app (`apps/web/src/lib/state/`). See `CLAUDE.md`
hard rule 6.
