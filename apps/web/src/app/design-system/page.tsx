import type { Metadata } from 'next'
import bgClear from '@/assets/bg-mountain-clear.jpg'
import {
  Alert, Badge, Breadcrumb, Button, Card, Carousel, Disclosure, Heading, Mark,
  Meta, Progress, Swatches, Tabs, ThemeCustomizer,
} from '@tuomashatakka/hummingbird-design-system'
import { Chat } from '@/components/Chat'
import { DialogDemo, FormsDemo, SliderDemo } from './demos'
import { Inventory } from './inventory'
import { BrandComposites, LayoutHelpers, NewPrimitives, TokensReference } from './sections'


export const metadata: Metadata = {
  title:       'Design system — Hummingbird',
  description: 'The complete Hummingbird design system: tokens, color ramps, typography, and every component with live examples.',
}

const NEUTRAL_RAMP = [ 'paper', 'wash', 'accent-wash', 'line', 'ink-faint', 'ink-soft', 'ink' ]

const ramp = (family: string) =>
  [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ].map(step => `${family}-${step}`)

const CAROUSEL_DEMO = [
  {
    id:    'photo',
    image: bgClear,
    content:
  <>
    <Heading level={ 6 }>Photography</Heading>
    <p>A slide with an image renders it full-bleed under the identity&apos;s diagonal scrim.</p>
  </>,
  },
  { id: 'two', content: <p>Slide two — the track is a native scroll-snap list; swipe, scroll, or use the controls.</p> },
  { id: 'three', content: <p>Slide three — keyboard scrolling works out of the box.</p> },
]

export default function DesignSystemPage () {
  return <div data-layout='stack'>
    <section>
      <Breadcrumb
        items={ [
          { label: 'Home', href: '/' },
          { label: 'Design system' },
        ] } />

      <Heading level={ 1 }>Design system</Heading>

      <p>
        The complete Hummingbird system: identity, tokens, and every primitive,
        composite, and layout in the package — live. Every visual decision below
        resolves to
        {' '}
        <code>@tuomashatakka/hummingbird-design-system/tokens.css</code>
        ; edit that file (or slide the customizer) and watch everything follow.
      </p>
    </section>

    <section>
      <Heading level={ 2 }>Foundations</Heading>

      <p>
        Hummingbird is a monochrome identity reconstructed from the studio&apos;s
        November 2015 style guide. Its rules are few and strict:
      </p>

      <ul>
        <li>True greys only — color arrives as photographic tint or user customization, never as a flat brand fill.</li>

        <li>
          Squared corners, always.
          {' '}
          <code>--radius</code>
          {' '}
          is a token set to zero.
        </li>

        <li>Display type is uppercase Novecento Sans Wide, tracked wide, never bolded for emphasis.</li>
        <li>Hairline borders and whitespace separate surfaces; nothing floats on a shadow.</li>
        <li>Semantic HTML first; native platform behavior over JavaScript reimplementations.</li>
      </ul>
    </section>

    <section>
      <Heading id='color' level={ 2 }>Color</Heading>
      <Heading level={ 3 }>Neutral ramp</Heading>

      <p>
        Six working surfaces from paper to ink (plus the accent wash between
        them). This ramp is the brand.
      </p>

      <Swatches label='Neutral ramp' tokens={ NEUTRAL_RAMP } />
      <Heading level={ 3 }>Brand colors &amp; variants</Heading>

      <p>
        Each brand color ships as a nine-step ramp, 100 (near paper) to 900
        (near ink), derived in
        {' '}
        <code>tokens.css</code>
        {' '}
        with
        {' '}
        <code>color-mix()</code>
        {' '}
        so the variants stay correct in both themes and under customization.
        The accent defaults to chroma 0 — it is ink until you say otherwise.
      </p>

      <div data-layout='stack'>
        <Swatches label='Accent ramp' tokens={ ramp('accent') } />
        <Swatches label='Danger ramp' tokens={ ramp('danger') } />
        <Swatches label='Success ramp' tokens={ ramp('success') } />
      </div>

      <Heading level={ 3 }>Customize the palette</Heading>

      <p>
        Every brand color is an oklch lightness / chroma / hue triplet.
        The sliders write those channels through the global reducer onto
        {' '}
        <code>&lt;html&gt;</code>
        , overriding both light and dark defaults until reset. Watch the
        ramps above follow in real time.
      </p>

      <ThemeCustomizer />
    </section>

    <section>
      <Heading id='typography' level={ 2 }>Typography</Heading>

      <p>
        Three faces:
        {' '}
        <strong>Novecento Sans Wide</strong>
        {' '}
        for display and labels,
        {' '}
        <strong>Sofia Pro</strong>
        {' '}
        (light 300) for body copy, and
        {' '}
        <strong>Montserrat</strong>
        {' '}
        for subheadings. A monospace stack covers code.
      </p>

      <Heading level={ 1 }>Display / h1</Heading>
      <Heading level={ 2 }>Section / h2</Heading>
      <Heading level={ 3 }>Subsection / h3</Heading>
      <Heading level={ 4 }>Minor heading / h4</Heading>
      <Heading level={ 6 }>Eyebrow / h6</Heading>

      <p>
        Body copy caps at
        {' '}
        <code>--measure</code>
        {' '}
        (68ch) so lines stay readable. Links are underlined in a softened
        accent, like
        {' '}
        <a href='#color'>this one</a>
        .
      </p>

      <small>Small print sits one step down and one shade softer.</small>

      <blockquote>
        <p>Blockquotes carry a hairline rule and step back to the faint ink.</p>
      </blockquote>

      <p>
        Inline
        {' '}
        <code>code</code>
        , keyboard keys like
        {' '}
        <kbd>⌘K</kbd>
        , and block samples:
      </p>

      <pre>
        <code>{'bun dev   # start the dev server\nbun run build'}</code>
      </pre>
    </section>

    <section>
      <Heading id='spacing' level={ 2 }>Spacing &amp; shape</Heading>

      <p>
        A five-step rhythm on a 4/8 grid. Widths:
        {' '}
        <code>--measure</code>
        {' '}
        68ch,
        {' '}
        <code>--page-max</code>
        {' '}
        80rem,
        {' '}
        <code>--panel-w</code>
        {' '}
        20rem. Shape:
        {' '}
        <code>--radius: 0</code>
        {' '}
        and two borders — hairline
        {' '}
        <code>--line</code>
        {' '}
        and strong
        {' '}
        <code>--ink</code>
        .
      </p>

      <div data-space-scale>
        {[ 'xs', 'sm', 'md', 'lg', 'xl' ].map(step =>
          <figure key={ step } data-space={ step }>
            <div />
            <figcaption>--space-{step}</figcaption>
          </figure>)}
      </div>

      <p>
        Two layout helpers exist:
        {' '}
        <code>[data-layout=&apos;stack&apos;]</code>
        {' '}
        (vertical flow) and
        {' '}
        <code>[data-layout=&apos;cluster&apos;]</code>
        {' '}
        (wrapping row). That is the whole layout system.
      </p>
    </section>

    <section>
      <Heading id='motion' level={ 2 }>Motion</Heading>

      <p>
        One easing token,
        {' '}
        <code>--snap</code>
        {' '}
        (200ms cubic-bezier) — used for every hover, toggle, and slide.
        {' '}
        <code>prefers-reduced-motion</code>
        {' '}
        collapses all of it.
      </p>
    </section>

    <TokensReference />

    <section>
      <Heading id='primitives' level={ 2 }>Primitives</Heading>
      <Heading level={ 3 }>Button</Heading>

      <div data-layout='cluster'>
        <Button>Default</Button>
        <Button variant='primary'>Primary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='danger'>Danger</Button>
        <Button variant='primary' size='small'>Small</Button>
        <Button disabled>Disabled</Button>
      </div>

      <Heading level={ 3 }>Badge</Heading>

      <div data-layout='cluster'>
        <Badge>Neutral</Badge>
        <Badge variant='accent'>Accent</Badge>
        <Badge variant='success'>Success</Badge>
        <Badge variant='danger'>Danger</Badge>
      </div>

      <Heading level={ 3 }>Form controls</Heading>

      <p>
        Input, Textarea, Select, Checkbox, Radio, and Switch — shown here
        wrapped in the Field and SearchField composites. Validation styling
        rides on
        {' '}
        <code>:user-invalid</code>
        , not JavaScript.
      </p>

      <FormsDemo />
      <Heading level={ 3 }>Slider</Heading>

      <p>
        A native
        {' '}
        <code>input[type=&apos;range&apos;]</code>
        {' '}
        with a squared ink thumb on a hairline track. It also powers the theme
        customizer above.
      </p>

      <SliderDemo />
      <Heading level={ 3 }>Progress</Heading>

      <div data-layout='stack'>
        <Progress label='Upload progress' value={ 64 } />
        <Progress label='Loading' />
      </div>

      <Heading level={ 3 }>Disclosure</Heading>

      <div data-layout='stack'>
        <Disclosure name='ds-acc' summary='Disclosure (details/summary)'>
          <p>Open and close with the keyboard. Nothing imported, nothing polyfilled.</p>
        </Disclosure>

        <Disclosure name='ds-acc' summary='Accordion via the name attribute'>
          <p>
            These two share a
            <code>name</code>
            , so opening one closes the other — zero JS.
          </p>
        </Disclosure>
      </div>

      <Heading level={ 3 }>Dialog</Heading>
      <DialogDemo />
      <Heading level={ 3 }>Heading</Heading>

      <p>
        Renders
        {' '}
        <code>h1</code>
        –
        <code>h6</code>
        {' '}
        with an optional anchor id — every heading on this page uses it.
      </p>

      <Heading level={ 3 }>Mark</Heading>

      <p>
        The Hummingbird mark from the identity kit, inlined so it inherits
        {' '}
        <code>currentColor</code>
        {' '}
        — it sits in the header, the hero, and anywhere ink goes.
      </p>

      <span data-brand-mark=''>
        <Mark label='Hummingbird mark' />
      </span>

      <NewPrimitives />
    </section>

    <section>
      <Heading id='composites' level={ 2 }>Composites</Heading>
      <Heading level={ 3 }>Card</Heading>

      <div data-layout='cluster'>
        <Card title='Card title' footer={ <Button size='small'>Action</Button> }>
          <p>
            Header, body, and footer map to
            {' '}
            <code>article &gt; header / div / footer</code>
            .
          </p>
        </Card>
      </div>

      <Heading level={ 3 }>Alert</Heading>

      <div data-layout='stack'>
        <Alert title='Heads up'>
          <p>
            An informational callout. Uses
            {' '}
            <code>role=&quot;status&quot;</code>
            .
          </p>
        </Alert>

        <Alert variant='success' title='Saved'>
          <p>Your changes were written successfully.</p>
        </Alert>

        <Alert variant='danger' title='Something broke'>
          <p>
            A destructive callout announced via
            {' '}
            <code>role=&quot;alert&quot;</code>
            .
          </p>
        </Alert>
      </div>

      <Heading level={ 3 }>Tabs</Heading>

      <Tabs
        label='Documentation sections'
        tabs={ [
          { id: 'overview', label: 'Overview', content: <p>Arrow keys move between tabs; each panel is a labelled landmark.</p> },
          { id: 'install', label: 'Install', content: <p>Install dependencies with bun, then start the dev server.</p> },
          { id: 'deploy', label: 'Deploy', content: <p>Push to the default branch for GitHub Pages, or import to Vercel.</p> },
        ] } />

      <Heading level={ 3 }>Breadcrumb</Heading>

      <Breadcrumb
        items={ [
          { label: 'Home', href: '/' },
          { label: 'Design system', href: '/design-system' },
          { label: 'Composites' },
        ] } />

      <Heading level={ 3 }>Carousel</Heading>

      <p>
        The portfolio slider from the front page: a scroll-snap list with
        chevron controls and line dots. Give a slide an
        {' '}
        <code>image</code>
        {' '}
        and it renders full-bleed under the identity&apos;s diagonal scrim,
        with type switching to near-white.
      </p>

      <Carousel label='Carousel demo' slides={ CAROUSEL_DEMO } />
      <Heading level={ 3 }>Meta</Heading>

      <p>
        Label / value pairs on hairline rules — the identity&apos;s fact list.
      </p>

      <Meta
        items={ [
          { label: 'Location', value: 'Helsinki, Finland' },
          { label: 'Focus', value: 'Design systems · Creative coding' },
        ] } />

      <Heading level={ 3 }>Swatches &amp; ThemeCustomizer</Heading>

      <p>
        Both live in the
        {' '}
        <a href='#color'>color section</a>
        {' '}
        above: Swatches renders any token ramp as a captioned strip, and
        ThemeCustomizer edits the palette through the global reducer.
      </p>

      <BrandComposites />
      <Heading level={ 3 }>Chat</Heading>

      <p>
        Streams Claude through
        {' '}
        <code>apps/web/src/app/api/chat/route.ts</code>
        {' '}
        (Vercel AI SDK). Needs
        {' '}
        <code>ANTHROPIC_API_KEY</code>
        ; degrades gracefully on static hosts. Chat lives in the docs app, not
        the package — it is the only component with AI-SDK dependencies.
      </p>

      <Chat />
    </section>

    <section>
      <Heading id='layouts' level={ 2 }>Layouts</Heading>

      <p>
        Landmark components live in
        {' '}
        <code>layouts/landmarks/</code>
        ; layout helpers sit alongside them. Two landmarks frame this page right now.
      </p>

      <ul>
        <li>
          <strong>Header</strong>
          {' '}
          — sticky
          {' '}
          <code>body &gt; header</code>
          {' '}
          with wordmark, main nav, and the theme / panel controls.
        </li>

        <li>
          <strong>Footer</strong>
          {' '}
          —
          {' '}
          <code>body &gt; footer</code>
          {' '}
          colophon.
        </li>

        <li>
          <strong>Panel</strong>
          {' '}
          —
          {' '}
          <code>aside[data-slot=&apos;panel&apos;]</code>
          , a parallel-route drawer toggled from the header.
        </li>
      </ul>

      <LayoutHelpers />
    </section>

    <section>
      <Heading id='elements' level={ 2 }>Base elements</Heading>

      <p>
        Plain HTML is styled directly in
        {' '}
        <code>base.css</code>
        {' '}
        — tables, rules, quotes, and form scaffolding need no components at all.
      </p>

      <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Treatment</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <code>table</code>
            </td>

            <td>Hairline row rules, uppercase display-face headers</td>
          </tr>

          <tr>
            <td>
              <code>fieldset / legend</code>
            </td>

            <td>Hairline frame, eyebrow legend</td>
          </tr>

          <tr>
            <td>
              <code>blockquote</code>
            </td>

            <td>Rule on the inline start, faint ink</td>
          </tr>

          <tr>
            <td>
              <code>hr</code>
            </td>

            <td>Single hairline with generous margins</td>
          </tr>

          <tr>
            <td>
              <code>pre / code / kbd</code>
            </td>

            <td>Mono stack on the wash surface</td>
          </tr>

          <tr>
            <td>
              <code>dialog / details / progress</code>
            </td>

            <td>Native elements, tokens only</td>
          </tr>
        </tbody>
      </table>
    </section>

    <Inventory />
  </div>
}
