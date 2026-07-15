# hummingbird-design-system — agent conventions

Read this before touching code. These rules are the whole architecture.

This is a Bun-workspace monorepo:

- **`packages/hummingbird/`** — the published npm package `hummingbird-design-system`
  (components + CSS + state). Framework-agnostic: **no `next/*` imports here.**
- **`apps/web/`** — the Next.js documentation + portfolio site. It consumes the package
  via the workspace (`hummingbird-design-system`) and `transpilePackages`.

## Where things go

| What                                    | Where                                                      |
| --------------------------------------- | ---------------------------------------------------------- |
| Anything that renders a single element  | `packages/hummingbird/src/components/primitives/`          |
| Anything composed of primitives         | `packages/hummingbird/src/components/composites/`          |
| Layout helpers (Row, Grid, Overlay)     | `packages/hummingbird/src/components/layouts/`             |
| Page skeleton / landmark elements       | `packages/hummingbird/src/components/layouts/landmarks/`   |
| Everything that is NOT view/layout      | `packages/hummingbird/src/lib/`                            |
| Global state (reducer/actions/context)  | `packages/hummingbird/src/lib/state/`                      |
| Design tokens (the whole theme)         | `packages/hummingbird/styles/tokens.css`                   |
| Element defaults                        | `packages/hummingbird/styles/base.css`                     |
| Variants + structural CSS (nested)      | `packages/hummingbird/styles/components.css`               |
| Package barrels / entry points          | `packages/hummingbird/src/{index,state}.ts`                |
| Routes, slots, API handlers, Chat       | `apps/web/src/app/`, `apps/web/src/components/`            |

## Hard rules

1. **Semantic HTML first.** `<button>`, `<dialog>`, `<details>`, `<main>`, `<aside>`,
   proper heading hierarchy. Never `<div role="button">`.
2. **No utility classes. No Tailwind. No Radix. No inline styles.**
   Selectors mirror markup: `button.primary`, `article.card > header`,
   `aside[data-slot='panel']`. Attribute hooks (`data-*`, `aria-*`, `role`)
   are preferred over class soup.
3. **Minimal component interfaces.** Essential props only. No `className`,
   no `style`, no size/color/margin props — that is CSS's job.
4. **New colors/sizes/spacing go in `tokens.css` only.** If a hex value or
   px literal appears in a component or `components.css`, it's a bug.
5. **CSS is grouped with native nesting.** Each component is one nested block in
   `components.css` whose selectors mirror its markup (`button { &.primary { … } }`).
   Variants, states, and media queries always nest inside their base selector —
   never a flat `button:hover` or a detached `@media` at the top level. Values
   stay vertically aligned. Keep the `@layer base, components;` order (tokens
   stay unlayered). Docs-only chrome (specimens, TOC, token previews) styles
   live in `apps/web/src/app/globals.css`, not the package.
6. **The package ships no app state.** `src/lib/state/` holds only the generic
   `createStore(reducer, initialState)` factory; reducers, actions, and state
   shapes live in the consuming app (`apps/web/src/lib/state/`). App state
   changes go through that reducer — add to its `AppAction` union in
   `types.ts`, handle in `reducer.ts`, export a creator from `actions.ts`.
   Components dispatch creators, never object literals. Package components
   are controlled: they take props/callbacks, never import a store.
7. **Prefer native platform behavior** (dialog `showModal`, details `name`
   accordions, `:user-invalid`, the Popover API) over JS reimplementations.
8. **Server components by default**; add `'use client'` only for interactivity.
   bunchee preserves the directive per-module, keeping the package RSC-safe.
9. **The package stays framework-agnostic.** Components use plain `<a>`, plain
   `<img>`, and `{ src }` for images — no `next/link`, no `next/image`.

## Commands (run from the repo root)

```
bun install          # install the whole workspace
bun run dev          # build the package, then run the docs site (turbopack)
bun run build:pkg    # build the package only → packages/hummingbird/dist (bunchee)
bun run build        # build the package + the docs site
bun run build:pages  # static export of the docs site → apps/web/out
bun run lint         # @tuomashatakka/eslint-config, whole workspace
bun run typecheck    # strict tsc, every workspace
```

## Publishing the package

```
cd packages/hummingbird && npm publish   # unscoped → npmjs; needs --otp=<code> (2FA)
```

`files` ships `dist/` (bunchee JS + `.d.ts`) and `styles/` (raw CSS; no font files —
the stacks fall back to Poppins/Montserrat via a Google Fonts `@import` in
`tokens.css`). The `exports` map exposes `.`, `./state`, and `./styles` (the whole
stylesheet — the individual CSS files are internal). The styles entry is the pattern
key `./style*`: bunchee skips wildcard keys instead of warning about CSS entries, and
Node rejects empty `*` matches, so the star sits before the final `s`.

## Deployment (docs site)

- **Vercel**: import repo, root at `apps/web`, set `ANTHROPIC_API_KEY`, ship. API routes
  + streaming work.
- **GitHub Pages**: push to `main` — `.github/workflows/deploy-pages.yml` builds the
  package then runs `build:pages`, which parks `apps/web/src/app/api` (static hosts have
  no server) and exports with `basePath = /<repo>` to `apps/web/out`. The Chat composite
  degrades gracefully.
