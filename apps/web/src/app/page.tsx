import Link from 'next/link'
import bgBlue from 'Δ/assets/bg-mountain-blue.jpg'
import bgClear from 'Δ/assets/bg-mountain-clear.jpg'
import bgDark from 'Δ/assets/bg-mountain-dark.jpg'
import bgMagenta from 'Δ/assets/bg-mountain-magenta.jpg'
import { Badge, Carousel, Heading, Mark, Meta } from 'hummingbird-design-system'


const SLIDES = [
  {
    id:    'monochrome',
    image: bgClear,
    content:
  <>
    <Heading level={ 6 }>01 · Color</Heading>

    <Heading level={ 2 }>
      Monochrome,
      <br />
      by design
    </Heading>

    <p>
      True greys only — brightness 19 and 28. Color never arrives as a flat
      fill; it lives in photography like this, or in your hands through the
      oklch theme customizer.
    </p>

    <div data-layout='cluster'>
      <Badge>Identity</Badge>
      <Badge>Photography</Badge>
      <Badge>oklch</Badge>
    </div>

    <p>
      <Link href='/design-system#color'>See the palette</Link>
    </p>
  </>,
  },
  {
    id:    'typography',
    image: bgDark,
    content:
  <>
    <Heading level={ 6 }>02 · Typography</Heading>

    <Heading level={ 2 }>
      Wide caps,
      <br />
      light body
    </Heading>

    <p>
      Novecento Sans Wide carries the display voice — uppercase, tracked
      wide, never bolded for emphasis. Sofia Pro sets the body light, and
      Montserrat covers subheadings.
    </p>

    <div data-layout='cluster'>
      <Badge>Novecento</Badge>
      <Badge>Sofia Pro</Badge>
      <Badge>Montserrat</Badge>
    </div>

    <p>
      <Link href='/design-system#typography'>See the specimen</Link>
    </p>
  </>,
  },
  {
    id:    'components',
    image: bgBlue,
    content:
  <>
    <Heading level={ 6 }>03 · Components</Heading>

    <Heading level={ 2 }>
      Semantic to
      <br />
      the bone
    </Heading>

    <p>
      Native elements, squared corners, no borders where whitespace will do.
      Seventeen primitives, eighteen composites, and six layout components —
      every one documented with live examples.
    </p>

    <div data-layout='cluster'>
      <Badge>dialog</Badge>
      <Badge>details</Badge>
      <Badge>scroll-snap</Badge>
      <Badge>:user-invalid</Badge>
    </div>

    <p>
      <Link href='/design-system#primitives'>Browse the components</Link>
    </p>
  </>,
  },
  {
    id:    'tokens',
    image: bgMagenta,
    content:
  <>
    <Heading level={ 6 }>04 · Tokens</Heading>

    <Heading level={ 2 }>
      One file,
      <br />
      whole theme
    </Heading>

    <p>
      Every visual decision resolves to a custom property — colors as
      adjustable oklch channels with nine-step ramps, one type scale, one
      spacing rhythm. Slide the channels and the whole site follows.
    </p>

    <div data-layout='cluster'>
      <Badge>tokens.css</Badge>
      <Badge>color-mix</Badge>
      <Badge>100–900</Badge>
    </div>

    <p>
      <Link href='/design-system#color'>Customize the palette</Link>
    </p>
  </>,
  },
]

export default function HomePage () {
  return <div data-layout='screens'>
    <section data-hero=''>
      <Mark />
      <Heading level={ 1 }>Hummingbird</Heading>
      <Heading level={ 6 }>Design system · Portfolio · Est. 2015</Heading>

      <p>
        A monochrome design system reconstructed from the studio&apos;s 2015
        identity guide — semantic HTML, native elements, zero utility classes.
      </p>

      <div data-layout='cluster'>
        <Link data-cta='' href='/design-system'>View the system</Link>
        <Link data-cta='' href='/design-system#color'>Make it yours</Link>
      </div>

      <span aria-hidden='true' data-scroll-hint=''>scroll</span>
    </section>

    <Carousel label='Design system highlights' slides={ SLIDES } />

    <section>
      <Heading level={ 6 }>About</Heading>

      <Heading level={ 2 }>
        Formal &amp;
        <br />
        elegant
      </Heading>

      <div data-layout='split'>
        <div>
          <p>
            Hummingbird is minimal yet bold: defined, clean, immersive. Surfaces
            separate through whitespace and washes rather than boxes; when a
            line is unavoidable it is a hairline, not a border. Display type is
            letterspaced uppercase; body copy stays light and generous.
          </p>

          <p>
            The whole theme lives in one token file. Brand colors are oklch
            channel triplets — monochrome by default, and yours to recolor
            live, with every variant ramp following along.
          </p>
        </div>

        <Meta
          items={ [
            { label: 'Identity', value: 'Hummingbird Design, November 2015' },
            { label: 'Principles', value: 'Squared. Monochrome. Native first.' },
            { label: 'Type', value: 'Novecento Sans Wide · Sofia Pro · Montserrat' },
            { label: 'Built with', value: 'Next.js · semantic HTML · hand-written CSS' },
          ] } />
      </div>
    </section>

    <section>
      <Heading level={ 6 }>How to use</Heading>

      <Heading level={ 2 }>
        Install &amp;
        <br />
        import
      </Heading>

      <p>
        One package, one stylesheet, no config. Install, import the CSS once
        at your app root, and compose with the components.
      </p>

      <pre>
        <code>{'npm i hummingbird-design-system'}</code>
      </pre>

      <pre>
        <code>{`import 'hummingbird-design-system/styles'
import { Button, Card } from 'hummingbird-design-system'

<Card title='Hello'>
  <Button variant='primary'>Get started</Button>
</Card>`}
        </code>
      </pre>

      <p>
        The one import carries the whole system — tokens, semantic element
        defaults, and component CSS, layered in the right order.
      </p>
    </section>

    <section>
      <Heading level={ 6 }>Get started</Heading>

      <Heading level={ 2 }>
        Explore the
        <br />
        system
      </Heading>

      <p>
        Every token, ramp, primitive, composite, and layout — documented with
        live examples, swatches for every color variant, and sliders that
        recolor the brand in real time.
      </p>

      <div data-layout='cluster'>
        <Link data-cta='' href='/design-system'>Design system</Link>
        <Link data-cta='' href='/design-system#inventory'>Component inventory</Link>
      </div>

      <p>
        <small>Hummingbird — a monochrome design system. Semantic markup, native elements, zero utility classes.</small>
      </p>
    </section>
  </div>
}
