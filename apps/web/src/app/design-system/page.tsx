import type { Metadata } from 'next'
import { Breadcrumb, Heading } from 'hummingbird-design-system'
import { Toc } from 'Δ/components/Toc'
import { ThemeCustomizer } from 'Δ/components/docs/ThemeCustomizer'
import { BaseElements } from './base-elements'
import { AtAGlance, ComponentDoc } from './components/ComponentDoc'
import { COMPOSITES, LAYOUTS, PRIMITIVES } from './registry'
import { Color, Motion, Principles, Spacing, Typography } from './sections/foundations'
import { Patterns } from './sections/patterns'
import { TokensReference } from './sections/tokens'
import { SECTIONS } from './toc'


export const metadata: Metadata = {
  title:       'Design system — Hummingbird',
  description: 'The complete Hummingbird design system: tokens, color ramps, typography, and every component with live examples and code.',
}

export default function DesignSystemPage () {
  return <div data-layout='stack'>
    <Toc entries={ SECTIONS } />

    <section>
      <Breadcrumb
        items={ [
          { label: 'Home', href: '/' },
          { label: 'Design system' },
        ] } />

      <Heading level={ 1 }>Design system</Heading>

      <p>
        The complete Hummingbird system: identity, tokens, and every primitive,
        composite, and layout in the package — live, with the code that
        produced each example. Every visual decision below resolves to the
        package&apos;s
        {' '}
        <code>styles/tokens.css</code>
        ; edit that file (or slide the customizer) and watch everything follow.
      </p>
    </section>

    <Principles />
    <Color />
    <Typography />
    <Spacing />
    <Motion />
    <TokensReference />

    <section>
      <Heading id='theming' level={ 2 }>Theming</Heading>

      <p>
        Every brand color is an oklch lightness / chroma / hue triplet.
        The sliders write those channels through this site&apos;s store onto
        {' '}
        <code>&lt;html&gt;</code>
        , overriding both light and dark defaults until reset. Watch the
        ramps and every accent surface follow in real time — including the
        on-brand ink flipping when you cross the lightness threshold.
      </p>

      <ThemeCustomizer />
    </section>

    <BaseElements />

    <section>
      <Heading id='primitives' level={ 2 }>Primitives</Heading>
      <p>Everything that renders a single element.</p>
      <AtAGlance entries={ PRIMITIVES } />
      {PRIMITIVES.map(entry => <ComponentDoc key={ entry.name } entry={ entry } />)}
    </section>

    <section>
      <Heading id='composites' level={ 2 }>Composites</Heading>
      <p>Everything composed of primitives.</p>
      <AtAGlance entries={ COMPOSITES } />
      {COMPOSITES.map(entry => <ComponentDoc key={ entry.name } entry={ entry } />)}
    </section>

    <section>
      <Heading id='layouts' level={ 2 }>Layouts &amp; landmarks</Heading>

      <p>
        Layout helpers arrange; landmarks frame the page. Header, Footer, and
        Panel are all framing this page right now.
      </p>

      <AtAGlance entries={ LAYOUTS } />
      {LAYOUTS.map(entry => <ComponentDoc key={ entry.name } entry={ entry } />)}
    </section>

    <Patterns />

    <section>
      <Heading id='state' level={ 2 }>State</Heading>

      <p>
        The package ships exactly one state export:
        {' '}
        <code>createStore(reducer, initialState)</code>
        {' '}
        — a typed factory with no predefined actions or state shape. This
        site&apos;s theme, palette, panel, and notices all live in its own
        store, built with it.
        {' '}
        <a href='/design-system/state'>Read the full guide with examples →</a>
      </p>
    </section>
  </div>
}
