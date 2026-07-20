/* eslint-disable @stylistic/jsx-one-expression-per-line */
import { Disclosure, Heading } from 'hummingbird-design-system'
import { Specimen } from 'Δ/components/Specimen'
import { Swatches } from 'Δ/components/docs/Swatches'
import { DialogDemo, PanelDemo } from '../demos'


const NEUTRAL_RAMP = [ 'paper', 'wash', 'accent-wash', 'line', 'ink-faint', 'ink-soft', 'ink' ]

const ramp = (family: string) =>
  [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ].map(step => `${family}-${step}`)

export const Principles = () =>
  <section>
    <Heading id='principles' level={ 2 }>Principles</Heading>

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
      <li>Hairline borders and whitespace separate surfaces; shadows are cast sparingly — and cast black, in both themes.</li>
      <li>Semantic HTML first; native platform behavior over JavaScript reimplementations.</li>
    </ul>
  </section>

export const Color = () =>
  <section>
    <Heading id='color' level={ 2 }>Color</Heading>
    <Heading level={ 3 }>Neutral ramp</Heading>

    <p>
      Six working surfaces from paper to ink (plus the accent wash between
      them), each declared once as a <code>light-dark()</code> pair —
      the theme attribute flips <code>color-scheme</code> and the whole ramp follows.
      This ramp is the brand.
    </p>

    <Swatches label='Neutral ramp' tokens={ NEUTRAL_RAMP } />

    <Heading level={ 3 }>
      Brand colors &amp; variants
    </Heading>

    <p>
      Each brand color ships as a nine-step ramp, 100 (near paper) to 900
      (near ink), derived in <code>tokens.css</code> with <code>color-mix()</code> so
      the variants stay correct in both themes and under customization.
      The accent defaults to chroma 0 — it is ink until you say otherwise.
    </p>

    <div data-layout='stack'>
      <Swatches label='Accent ramp' tokens={ ramp('color-accent') } />
      <Swatches label='error ramp' tokens={ ramp('color-error') } />
      <Swatches label='Success ramp' tokens={ ramp('color-success') } />
      <Swatches label='Success ramp' tokens={ ramp('color-info') } />
    </div>

    <Heading level={ 3 }>Ink on a brand fill</Heading>

    <p>
      Text sitting on an accent, error, or success fill never uses a theme
      color — it derives from the fill&apos;s own oklch lightness
      (
      <code>--on-accent</code>
      {' '}
      and friends, via relative color syntax, upgraded to
      {' '}
      <code>contrast-color()</code>
      {' '}
      where the platform has it). Slide the accent dark or light in the
      {' '}
      <a href='#theming'>customizer</a>
      {' '}
      and watch the primary button&apos;s type flip between near-white and
      near-black, in either theme.
    </p>
  </section>

export const Typography = () =>
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
      for subheadings. A monospace stack covers code. When the identity faces
      are not installed, the stacks fall back to Poppins and Montserrat,
      loaded from Google Fonts by
      {' '}
      <code>tokens.css</code>
      .
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

export const Spacing = () =>
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
      Layout attributes:
      {' '}
      <code>[data-layout=&apos;stack&apos;]</code>
      {' '}
      (vertical flow),
      {' '}
      <code>[data-layout=&apos;cluster&apos;]</code>
      {' '}
      (wrapping row), and
      {' '}
      <code>[data-layout=&apos;center&apos;]</code>
      {' '}
      (grid centering) — plus the Row, Grid, and Center components in the
      {' '}
      <a href='#layouts'>layouts section</a>
      .
    </p>
  </section>

const REVEAL_CODE = `<!-- staggered group: each child drifts in a beat later -->
<div data-reveal-group>
  <article>…</article>
  <article>…</article>
</div>

<!-- or pick a gesture per element -->
<div data-reveal='blur'>…</div>
<div data-reveal='scale'>…</div>
<div data-reveal='clip'>…</div>
<div data-reveal='pop'>…</div>`

const HOOKS_CODE = `<button data-motion='lift'>Lift</button>
<button data-motion='press'>Press</button>
<button data-motion='sheen'>Sheen</button>`

const OVERLAY_CODE = `// enter via @starting-style, leave via a discrete display
// transition — native top-layer, no animation library
<Dialog open={ open } onClose={ close }>…</Dialog>
<Panel  open={ open } onClose={ close }>…</Panel>

// the accordion animates its own height with interpolate-size
<Disclosure summary='Details'>…</Disclosure>`

export const Motion = () =>
  <section>
    <Heading id='motion' level={ 2 }>Motion</Heading>

    <p>
      Timing lives in tokens. <code>--snap</code> (200ms plus a standard ease)
      drives every hover, toggle, and slide; the <code>--immersive</code> reveal
      curve and an opt-in <code>--spring</code> overshoot carry the cinematic
      moments — all over a four-step duration scale from <code>--dur-fast</code>{' '}
      to <code>--dur-slower</code>. Overlays enter through <code>@starting-style</code>{' '}
      and leave through discrete <code>display</code> transitions; accordions
      animate height with <code>interpolate-size</code>. Two reusable primitives
      layer on top — <code>[data-reveal]</code> for scroll-driven entrances and{' '}
      <code>[data-motion]</code> for pointer micro-interactions — and{' '}
      <code>prefers-reduced-motion</code> collapses all of it to nothing.
    </p>

    <Heading level={ 3 }>Easing &amp; duration</Heading>

    <p>
      Three curves, side by side: <code>--snap</code> for UI, the{' '}
      <code>--immersive</code> ease-out-expo for reveals, and the{' '}
      <code>--spring</code> overshoot for playful accents.
    </p>

    <div data-ease-lab aria-hidden='true'>
      {[ 'snap', 'immersive', 'spring' ].map(ease =>
        <figure key={ ease } data-ease={ ease }>
          <figcaption>--{ease}</figcaption>
          <span data-track><span data-dot /></span>
        </figure>)}
    </div>

    <Heading level={ 3 }>Scroll reveals</Heading>

    <p>
      Add <code>[data-reveal]</code> to any element and it drifts in as it enters
      the viewport; a <code>[data-reveal-group]</code> parent staggers its
      children. Scroll the frame to replay.
    </p>

    <Specimen code={ REVEAL_CODE } lang='html'>
      <section data-motion-scroller aria-label='Scroll reveal demo'>
        <p data-motion-hint>Scroll ↓</p>

        <div data-reveal-group data-motion-grid>
          {[ 1, 2, 3, 4, 5, 6 ].map(n =>
            <div key={ n } data-reveal=''>{`0${n}`}</div>)}
        </div>

        <div data-motion-grid>
          {[ 'fade', 'scale', 'blur', 'clip', 'pop' ].map(variant =>
            <div key={ variant } data-reveal={ variant }>{variant}</div>)}
        </div>
      </section>
    </Specimen>

    <Heading level={ 3 }>Interaction hooks</Heading>

    <p>
      Drop <code>[data-motion]</code> on any control: <code>lift</code> rises on
      hover, <code>press</code> sinks on click, and <code>sheen</code> sweeps a
      monochrome highlight across.
    </p>

    <Specimen code={ HOOKS_CODE } lang='html'>
      <section data-motion-grid aria-label='Interaction hooks'>
        <button data-motion='lift' type='button'>Lift</button>
        <button data-motion='press' type='button'>Press</button>
        <button data-motion='sheen' type='button'>Sheen</button>
      </section>
    </Specimen>

    <Heading level={ 3 }>Overlays &amp; height</Heading>

    <p>
      The immersive work already shipping across the system: native top-layer
      overlays that transition in and out, and accordions that animate their own
      height — no JavaScript animation anywhere.
    </p>

    <Specimen code={ OVERLAY_CODE }>
      <DialogDemo />
      <PanelDemo />

      <Disclosure summary='Animated height (interpolate-size)'>
        <p>
          Opening and closing this disclosure animates its height from 0 to
          auto with <code>interpolate-size: allow-keywords</code> — a real
          keyword-to-length transition, native to the platform.
        </p>
      </Disclosure>
    </Specimen>
  </section>
