# vibe-scaffold — agent conventions

Read this before touching code. These rules are the whole architecture.

## Where things go

| What                                   | Where                              |
| -------------------------------------- | ---------------------------------- |
| Anything that renders a single element | `src/components/primitives/`       |
| Anything composed of primitives        | `src/components/composites/`       |
| Page skeleton / landmark elements      | `src/components/layouts/`          |
| Everything that is NOT view/layout     | `src/lib/`                         |
| Global state (reducer/actions/context) | `src/lib/state/`                   |
| Routes, slots, API handlers            | `src/app/`                         |
| Design tokens (the whole theme)        | `src/styles/tokens.css`            |
| Element defaults                       | `src/styles/base.css`              |
| Variants + structural CSS              | `src/styles/components.css`        |

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
5. **Global state changes go through the reducer.** Add to the `AppAction`
   union in `src/lib/state/types.ts`, handle in `reducer.ts`, export a
   creator from `actions.ts`. Components dispatch creators, never object
   literals.
6. **Prefer native platform behavior** (dialog `showModal`, details `name`
   accordions, `:user-invalid`, popover) over JS reimplementations.
7. **Server components by default**; add `'use client'` only for interactivity.

## Commands

```
bun dev              # dev server (turbopack)
bun run build        # server build (Vercel target)
bun run build:pages  # static export → ./out (GitHub Pages target)
bun run lint         # @tuomashatakka/eslint-config
bun run typecheck    # strict tsc
```

## Deployment

- **Vercel**: import repo, set `ANTHROPIC_API_KEY`, ship. API routes + streaming work.
- **GitHub Pages**: push to `main` — `.github/workflows/deploy-pages.yml` runs
  `build:pages`, which parks `src/app/api` (static hosts have no server) and
  exports with `basePath = /<repo>`. The Chat composite degrades gracefully.
