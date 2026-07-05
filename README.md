# vibe-scaffold

Minimal semantic boilerplate for vibe coding. Bun · TypeScript · Next.js (App Router)
· Vercel AI SDK · reducer state · hand-written CSS. No Tailwind, no Radix, no utility
classes — semantic HTML styled directly, native elements doing native things.

## Quick start

```bash
bun install
cp .env.example .env.local     # add ANTHROPIC_API_KEY for the chat route
bun dev
```

Open `http://localhost:3000` — the home page is the Hummingbird design system
portfolio: full-height snap-scroll screens and a full-bleed photo slider, in
the identity's borderless, monochrome manner. `/design-system` documents the
whole system: every token ramp as swatches, live palette customization via
oklch sliders, and every component with working examples. The written spec
lives in `docs/hummingbird-design-system.md`.

## What's inside

```
src/
├── app/
│   ├── layout.tsx            # root layout — receives the @panel slot
│   ├── page.tsx              # portfolio landing (carousel + principles)
│   ├── @panel/               # ★ parallel route slot (state-inspector aside)
│   │   ├── default.tsx
│   │   └── page.tsx
│   ├── api/chat/route.ts     # ★ AI SDK streaming endpoint (Claude)
│   ├── design-system/        # living design system documentation
│   └── globals.css
├── components/
│   ├── primitives/           # single-element components (Button, Input, Dialog…)
│   ├── composites/           # combinations (Card, SearchField, Chat)
│   └── layouts/              # landmarks (Header, Panel, Footer)
├── lib/                      # ★ ALL non-view code lives here
│   ├── state/                # global reducer + actions + context + hooks
│   └── classNames.ts
└── styles/
    ├── tokens.css            # ★ the entire theme — edit this file only
    ├── base.css              # semantic element defaults
    └── components.css        # variants + structural selectors
```

## The design system, in three sentences

Every theme decision is a custom property in `tokens.css` — one neutral ramp, brand
colors as customizable oklch channel triplets with nine-step variant ramps, one
scale, squared corners. `base.css` styles semantic elements directly so plain HTML
already looks right. `components.css` adds variants through selectors that mirror
the markup (`button.primary`, `article.card > header`), never utility classes.

Theming is `data-theme` on `<html>` (`light` — the default — / `dark` / `system`),
driven by the global reducer; the same reducer carries live palette overrides that
land as inline custom properties.

## Global state

`src/lib/state` — a typed `useReducer` with a discriminated action union and action
creators, exposed via context:

```tsx
const { theme, panelOpen } = useAppState()
const dispatch = useDispatch()
dispatch(setTheme('dark'))
dispatch(pushNotice('saved'))
```

Extend in three steps: add to the `AppAction` union → handle in `reducer.ts` →
export a creator from `actions.ts`.

## Parallel routes

`src/app/layout.tsx` takes a second slot prop, `panel`, rendered from `src/app/@panel`.
The demo panel is a state inspector toggled from the header. Give any route its own
panel by adding `@panel/<route>/page.tsx`.

## AI SDK

`POST /api/chat` streams Claude with `streamText` + `toUIMessageStreamResponse`; the
`Chat` composite consumes it through `useChat`. Swap the model or provider in one
line inside `route.ts`.

## Deploying

**Vercel** — import the repo, set `ANTHROPIC_API_KEY`, done. Full server runtime.

**GitHub Pages** — push to `main`; the included workflow builds a static export
(`bun run build:pages`) with `basePath = /<repo>` and publishes `./out`. API routes
don't exist on static hosts, so the build script parks `src/app/api` and the chat UI
shows a graceful notice instead.

## Linting

Flat config extending [`@tuomashatakka/eslint-config`](https://www.npmjs.com/package/@tuomashatakka/eslint-config):

```bash
bun run lint
bun run typecheck
```

## Conventions

See `CLAUDE.md` — it doubles as the instruction file for AI coding agents and the
architectural contract for humans.
