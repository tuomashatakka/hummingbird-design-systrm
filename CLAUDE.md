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
   Keep the `@layer base, components;` order.
6. **Global state changes go through the reducer.** Add to the `AppAction`
   union in `src/lib/state/types.ts`, handle in `reducer.ts`, export a
   creator from `actions.ts`. Components dispatch creators, never object
   literals.
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
cd packages/hummingbird && npm publish
```

`files` ships `dist/` (bunchee JS + `.d.ts`) and `styles/` (raw CSS + fonts). The
`exports` map exposes `.`, `./state`, `./styles.css`, `./tokens.css`, `./base.css`,
`./components.css`, and `./fonts/*`.

## Deployment (docs site)

- **Vercel**: import repo, root at `apps/web`, set `ANTHROPIC_API_KEY`, ship. API routes
  + streaming work.
- **GitHub Pages**: push to `main` — `.github/workflows/deploy-pages.yml` builds the
  package then runs `build:pages`, which parks `apps/web/src/app/api` (static hosts have
  no server) and exports with `basePath = /<repo>` to `apps/web/out`. The Chat composite
  degrades gracefully.
