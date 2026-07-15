import { Heading } from 'hummingbird-design-system'
import { Specimen } from 'Δ/components/Specimen'
import { Chat } from 'Δ/components/Chat'
import { FormsDemo } from '../demos'


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
