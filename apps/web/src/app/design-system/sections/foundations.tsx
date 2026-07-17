/* eslint-disable @stylistic/jsx-one-expression-per-line */
import { Heading } from 'hummingbird-design-system'
import { Swatches } from 'Δ/components/docs/Swatches'


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

export const Motion = () =>
  <section>
    <Heading id='motion' level={ 2 }>Motion</Heading>

    <p>
      One easing token,
      {' '}
      <code>--snap</code>
      {' '}
      (200ms cubic-bezier), for every hover, toggle, and slide — plus the
      {' '}
      <code>--immersive</code>
      {' '}
      reveal curve for the panel. Overlays enter through
      {' '}
      <code>@starting-style</code>
      {' '}
      and leave through discrete
      {' '}
      <code>display</code>
      {' '}
      transitions; accordions animate their height with
      {' '}
      <code>interpolate-size</code>
      {' '}
      and
      {' '}
      <code>::details-content</code>
      .
      {' '}
      <code>prefers-reduced-motion</code>
      {' '}
      collapses all of it.
    </p>
  </section>
