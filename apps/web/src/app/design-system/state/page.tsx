import type { Metadata } from 'next'
import { Breadcrumb, Heading } from 'hummingbird-design-system'
import { Specimen } from 'Δ/components/Specimen'
import { Toc } from 'Δ/components/Toc'
import { CaseStudyDemo, CounterDemo } from './demos'


export const metadata: Metadata = {
  title:       'State — Hummingbird Design System',
  description: 'The createStore factory: bring your own reducer and state shape, get a typed Provider and hooks. With live, working examples.',
}

const STATE_TOC = [
  { id: 'create', label: 'Creating a store' },
  { id: 'provider', label: 'Provider setup' },
  { id: 'dispatch', label: 'Reading & dispatching' },
  { id: 'effects', label: 'Side effects' },
  { id: 'case-study', label: 'Case study' },
  { id: 'recipes', label: 'Recipes' },
]

const CREATE = `import { createStore } from 'hummingbird-design-system/state'

interface CounterState { count: number }

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

const reducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset':     return { count: 0 }
    default:          return state
  }
}

export const counter = createStore(reducer, { count: 0 })
// → { Provider, useStore, useSelector, useDispatch } — all typed`

const PROVIDER = `// store.ts — call createStore ONCE, at module scope, and import the
// result from this one module everywhere. A second call is a second,
// disconnected store: the factory builds a fresh context pair per call.
'use client'

import { createStore } from 'hummingbird-design-system/state'
import { reducer } from './reducer'
import { initialState } from './types'

export const {
  Provider: AppStateProvider,
  useStore: useAppState,
  useDispatch,
} = createStore(reducer, initialState)

// layout.tsx (or your app root)
<AppStateProvider>
  <App />
</AppStateProvider>

// The Provider also takes a per-mount override, e.g. SSR-derived:
<AppStateProvider initialState={ stateFromCookies }>`

const DISPATCH = `const { count } = counter.useStore()          // the whole state
const doubled   = counter.useSelector(s => s.count * 2)
const dispatch  = counter.useDispatch()

dispatch({ type: 'increment' })

// Action creators keep dispatch sites honest — components never
// hand-write action object literals:
export const increment = (): CounterAction => ({ type: 'increment' })
dispatch(increment())`

const EFFECTS = `// This site syncs its store to the DOM with one tiny client component
// mounted inside the provider — the store itself stays pure.
export function ThemeApplier () {
  const { theme, palette } = useAppState()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [ theme ])

  useEffect(() => {
    // palette overrides land as inline custom properties on <html>,
    // where they win over both light and dark token defaults
    for (const color of BRAND_COLORS) { /* set --{color}-l/c/h */ }
  }, [ palette ])

  return null
}`

const CASE_STUDY = `// apps/web/src/lib/state — this site's whole store
export interface AppState {
  theme:     'light' | 'dark' | 'system'
  palette:   PaletteOverrides          // oklch channel overrides per brand color
  panelOpen: boolean
  notices:   Notice[]
}

export type AppAction =
  | { type: 'theme/set', theme: Theme }
  | { type: 'palette/set', color: BrandColor, channels: ColorChannels }
  | { type: 'palette/reset' }
  | { type: 'panel/toggle' }
  | { type: 'panel/set', open: boolean }
  | { type: 'notice/push', notice: Notice }
  | { type: 'notice/dismiss', id: string }`

const RECIPE_HEADER = `// Header: pass your own controls into the actions slot
const { theme } = useAppState()
const dispatch  = useDispatch()

<Header
  homeHref='/'
  links={ LINKS }
  actions={ <>
    <li><Button onClick={ () => dispatch(setTheme(next(theme))) }>theme: {theme}</Button></li>
    <li><Button onClick={ () => dispatch(togglePanel()) }>panel</Button></li>
  </> } />`

const RECIPE_PANEL = `// Panel: controlled visibility — stays mounted, CSS animates both ways
const { panelOpen } = useAppState()

<Panel
  label='State inspector'
  open={ panelOpen }
  onClose={ () => dispatch(setPanel(false)) }>
  …
</Panel>`

const RECIPE_NOTICES = `// Notification: the store owns the queue, the component renders it
const { notices } = useAppState()

<Notification
  notices={ notices }
  onDismiss={ id => dispatch(dismissNotice(id)) } />

// push from anywhere:
dispatch(pushNotice('Changes published.', 'success'))`

export default function StatePage () {
  return <div data-layout='stack'>
    <Toc entries={ STATE_TOC } />

    <section>
      <Breadcrumb
        items={ [
          { label: 'Home', href: '/' },
          { label: 'Design system', href: '/design-system' },
          { label: 'State' },
        ] } />

      <Heading level={ 1 }>State</Heading>

      <p>
        The package ships no state shape and no actions — just
        {' '}
        <code>createStore(reducer, initialState)</code>
        , a typed factory over
        {' '}
        <code>useReducer</code>
        {' '}
        and a pair of contexts. You bring the reducer and the state; it
        returns a
        {' '}
        <code>Provider</code>
        {' '}
        and hooks that share one store. Several independent stores can
        coexist — each call builds its own contexts.
      </p>
    </section>

    <section>
      <Heading id='create' level={ 2 }>Creating a store</Heading>

      <p>
        Define the state, a discriminated action union, and a pure reducer —
        the factory infers everything from the two arguments.
      </p>

      <Specimen code={ CREATE } note='The exact store behind the live counter below.' />
    </section>

    <section>
      <Heading id='provider' level={ 2 }>Provider setup</Heading>

      <p>
        Call the factory once, at module scope, and make that module the only
        import point. The
        {' '}
        <code>hummingbird-design-system/state</code>
        {' '}
        entry is a shim over the package root for the same reason — the
        factory must exist in exactly one bundle.
      </p>

      <Specimen code={ PROVIDER } />
    </section>

    <section>
      <Heading id='dispatch' level={ 2 }>Reading &amp; dispatching</Heading>

      <p>
        <code>useStore</code>
        {' '}
        returns the state,
        {' '}
        <code>useDispatch</code>
        {' '}
        the dispatcher;
        {' '}
        <code>useSelector</code>
        {' '}
        is ergonomic sugar (it does not skip re-renders). Try the counter —
        its store is created right on this page.
      </p>

      <Specimen code={ DISPATCH }>
        <CounterDemo />
      </Specimen>
    </section>

    <section>
      <Heading id='effects' level={ 2 }>Side effects</Heading>

      <p>
        The store is pure; effects live in small client components inside the
        provider. This site applies its theme and palette to the DOM that way.
      </p>

      <Specimen code={ EFFECTS } />
    </section>

    <section>
      <Heading id='case-study' level={ 2 }>Case study: this site</Heading>

      <p>
        Everything stateful on this site — theme, palette overrides, the
        right-hand panel, the toast queue — is one store built with the
        factory. The widgets below dispatch into it for real; watch the
        header, the panel, and the toasts react.
      </p>

      <Specimen code={ CASE_STUDY }>
        <CaseStudyDemo />
      </Specimen>
    </section>

    <section>
      <Heading id='recipes' level={ 2 }>Recipes: wiring the chrome</Heading>

      <p>
        The landmark components are controlled — they hold no state of their
        own. Three wiring recipes from this site&apos;s
        {' '}
        <code>SiteChrome</code>
        :
      </p>

      <Specimen code={ RECIPE_HEADER } note='Header — theme cycling through the actions slot.' />
      <Specimen code={ RECIPE_PANEL } note='Panel — controlled, animated, inert while closed.' />
      <Specimen code={ RECIPE_NOTICES } note='Notification — the queue lives in the store.' />
    </section>
  </div>
}
