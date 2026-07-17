import { Heading } from 'hummingbird-design-system'
import { HtmlSpecimen, Specimen } from 'Δ/components/Specimen'
import { Chat } from 'Δ/components/Chat'
import { FormsDemo, HeaderScrollSpyDemo } from '../demos'


const FORM_RECIPE = `<Field label='Email' hint='We never share it.'>
  <Input required type='email' placeholder='you@example.com' />
</Field>

<Field label='Password' error='Must be at least 8 characters.'>
  <Input type='password' />
</Field>

<Field label='Plan'>
  <Select options={ PLANS } value={ plan } onChange={ … } />
</Field>

<fieldset>
  <legend>Delivery</legend>
  <Radio name='delivery' value='standard' label='Standard (3–5 days)' />
  <Radio name='delivery' value='express'  label='Express (next day)' />
</fieldset>

<Checkbox label='I agree to the terms' />
<Switch label='Email notifications' />
<SearchField onSearch={ query => … } />`

const CHROME_RECIPE = `// layout.tsx — the app owns the store; the landmarks stay stateless
<AppStateProvider>
  <ThemeApplier />

  <SiteHeader homeHref='/' links={ LINKS } />   {/* wraps <Header actions={…}> */}
  <main>{children}</main>
  {panel}                                       {/* @panel slot → controlled <Panel> */}
  <Footer>Hummingbird — a monochrome design system.</Footer>
  <SiteNotifications />                         {/* wraps <Notification notices onDismiss> */}
</AppStateProvider>`

const CTA_HTML = `<a data-cta href='#'>Get started</a>`

const LINK_BUTTON_HTML = `<a data-button href='#'>Docs</a>
<a data-button='primary' href='#'>Primary</a>`

const TAGS_HTML = `<ul data-tags>
  <li>Next.js</li>
  <li>TypeScript</li>
  <li>CSS nesting</li>
</ul>`

const HERO_REVEAL_CODE = `<section data-hero='' data-reveal='cinematic'>
  <Mark animate />
  <h1>Hummingbird</h1>
  <h6>Design system · Est. 2015</h6>
  <p>…</p>
</section>`

export const Patterns = () =>
  <section>
    <Heading id='patterns' level={ 2 }>Patterns</Heading>
    <Heading level={ 3 }>A complete form</Heading>

    <p>
      Field wraps each control in its label (implicit association — no ids),
      a fieldset groups the radios, and validation styling rides on
      {' '}
      <code>:user-invalid</code>
      .
    </p>

    <Specimen code={ FORM_RECIPE }>
      <FormsDemo />
    </Specimen>

    <Heading level={ 3 }>App chrome</Heading>

    <p>
      The landmarks are stateless; this site wires them to its own store with
      thin client wrappers. The same recipe works with any state — or none.
    </p>

    <Specimen code={ CHROME_RECIPE } note='The full wiring is documented on the state subpage.' />
    <Heading level={ 3 }>Attribute hooks</Heading>

    <p>
      Some CSS hooks are deliberately not wrapped in a component — the
      package ships plain
      {' '}
      <code>&lt;a&gt;</code>
      {' '}
      (no
      {' '}
      <code>next/link</code>
      ), and every consumer already brings its own anchor or Link
      implementation, so wrapping them would just be a redundant layer.
      Use the attribute directly on whatever anchor you render.
    </p>

    <HtmlSpecimen code={ CTA_HTML } note="a[data-cta] — a bordered call-to-action link, used in hero-style sections." />
    <HtmlSpecimen code={ LINK_BUTTON_HTML } note="a[data-button] — a link styled as a button, with a data-button='primary' fill variant." />
    <HtmlSpecimen code={ TAGS_HTML } note="ul[data-tags] — a marker-less badge cluster for a tech-stack list or similar." />
    <Specimen code={ HERO_REVEAL_CODE } note="section[data-hero][data-reveal='cinematic'] — the 8s blur-in envelope with staggered child reveals, used on the homepage hero. See it live on the homepage rather than replayed here." />
    <Heading level={ 3 }>Scroll-spy nav</Heading>

    <p>
      <code>Header</code>
      's
      {' '}
      <code>links</code>
      {' '}
      accept a
      {' '}
      <code>current</code>
      {' '}
      flag that renders
      {' '}
      <code>aria-current=&quot;page&quot;</code>
      {' '}
      — the underline-grow treatment follows it. Computing which link is
      current is app-level behavior (an
      {' '}
      <code>IntersectionObserver</code>
      {' '}
      over the sections in view), not something the stateless package
      component owns.
    </p>

    <Specimen
      code={ `const [ current, setCurrent ] = useState('one')
// …IntersectionObserver sets current as sections scroll into view…
<Header links={ links.map(l => ({ ...l, current: l.id === current })) } />` }>
      <HeaderScrollSpyDemo />
    </Specimen>

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
