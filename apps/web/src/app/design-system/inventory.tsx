'use client'

import type { FC, ReactNode } from 'react'
import photoClear from '@/assets/bg-mountain-clear.jpg'
import photoDark from '@/assets/bg-mountain-dark.jpg'
import {
  Alert, ArticleHero, Badge, Breadcrumb, Button, CapabilityStrip, Card,
  Carousel, Checkbox, ContactPanel, Disclosure, Field, FounderCard, Grid,
  Heading, Icon, Input, Lockup, Mark, Medallion, Meta, Pillars, Popover,
  Progress, Radio, RecentWork, Row, SearchField, Select, Slider, Swatches,
  Switch, Tabs, Textarea,
} from 'hummingbird-design-system'
import { Specimen } from '@/components/Specimen'
import { DialogDemo, NotificationDemo, OverlayDemo } from './demos'


interface Entry {
  component: string
  renders:   string
  props:     string
  code:      string
  note?:     string
  demo?:     ReactNode
}

const PRIMITIVES: Entry[] = [
  {
    component: 'Button',
    renders:   'button',
    props:     'variant, size, disabled, type, onClick',
    code:      `<Button>Default</Button>
<Button variant='primary'>Primary</Button>
<Button variant='ghost'>Ghost</Button>
<Button variant='danger'>Danger</Button>
<Button variant='primary' size='small'>Small</Button>
<Button disabled>Disabled</Button>`,
    demo:
  <div data-layout='cluster'>
    <Button>Default</Button>
    <Button variant='primary'>Primary</Button>
    <Button variant='ghost'>Ghost</Button>
    <Button variant='danger'>Danger</Button>
    <Button variant='primary' size='small'>Small</Button>
    <Button disabled>Disabled</Button>
  </div>,
  },
  {
    component: 'Input',
    renders:   'input',
    props:     'type, value, placeholder, required, onChange',
    code:      `<Input type='email' placeholder='you@example.com' />`,
    demo:      <Input type='email' placeholder='you@example.com' />,
  },
  {
    component: 'Textarea',
    renders:   'textarea',
    props:     'value, rows, placeholder, onChange',
    code:      `<Textarea rows={ 3 } placeholder='Tell us more…' />`,
    demo:      <Textarea placeholder='Tell us more…' rows={ 3 } />,
  },
  {
    component: 'Select',
    renders:   'select',
    props:     'options, value, onChange',
    code:      `<Select options={ [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
] } />`,
    demo: <Select options={ [{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }] } />,
  },
  {
    component: 'Checkbox',
    renders:   'label > input[type=checkbox]',
    props:     'label, checked, onChange',
    code:      `<Checkbox label='I agree to the terms' />`,
    demo:      <Checkbox label='I agree to the terms' />,
  },
  {
    component: 'Radio',
    renders:   'label > input[type=radio]',
    props:     'label, name, value, checked, onChange',
    code:      `<Radio name='plan' value='free' label='Free' />
<Radio name='plan' value='pro' label='Pro' />`,
    demo:
  <div data-layout='cluster'>
    <Radio label='Free' name='inv-plan' value='free' />
    <Radio label='Pro' name='inv-plan' value='pro' />
  </div>,
  },
  {
    component: 'Switch',
    renders:   'input[role=switch]',
    props:     'label, checked, onChange',
    code:      `<Switch label='Email notifications' />`,
    demo:      <Switch label='Email notifications' />,
  },
  {
    component: 'Slider',
    renders:   'input[type=range]',
    props:     'label, min, max, step, value, onChange',
    code:      `<Slider label='Volume' min={ 0 } max={ 100 } />`,
    demo:      <Slider label='Volume' max={ 100 } min={ 0 } />,
  },
  {
    component: 'Heading',
    renders:   'h1–h6',
    props:     'level, id',
    code:      `<Heading level={ 4 } id='anchor'>Minor heading</Heading>`,
    demo:      <Heading level={ 4 }>Minor heading</Heading>,
  },
  {
    component: 'Mark',
    renders:   'svg (brand mark)',
    props:     'label',
    code:      `<Mark label='Hummingbird mark' />`,
    demo:
  <span data-brand-mark=''>
    <Mark label='Hummingbird mark' />
  </span>,
  },
  {
    component: 'Badge',
    renders:   'span[data-badge]',
    props:     'variant',
    code:      `<Badge>Neutral</Badge>
<Badge variant='accent'>Accent</Badge>
<Badge variant='success'>Success</Badge>
<Badge variant='danger'>Danger</Badge>`,
    demo:
  <div data-layout='cluster'>
    <Badge>Neutral</Badge>
    <Badge variant='accent'>Accent</Badge>
    <Badge variant='success'>Success</Badge>
    <Badge variant='danger'>Danger</Badge>
  </div>,
  },
  {
    component: 'Progress',
    renders:   'progress',
    props:     'label, value, max',
    code:      `<Progress label='Upload' value={ 64 } />
<Progress label='Loading' />`,
    demo:
  <div data-layout='stack'>
    <Progress label='Upload' value={ 64 } />
    <Progress label='Loading' />
  </div>,
  },
  {
    component: 'Disclosure',
    renders:   'details / summary',
    props:     'summary, open, name',
    code:      `<Disclosure summary='Shipping details'>
  <p>Opens and closes natively.</p>
</Disclosure>`,
    demo:
  <Disclosure summary='Shipping details'>
    <p>Opens and closes natively.</p>
  </Disclosure>,
  },
  {
    component: 'Dialog',
    renders:   'dialog (showModal)',
    props:     'open, title, footer, onClose',
    code:      `<Dialog open={ open } title='Native dialog'
  footer={ <Button onClick={ close }>Confirm</Button> }
  onClose={ close }>
  <p>Focus trap, Esc, and backdrop are browser-provided.</p>
</Dialog>`,
    demo: <DialogDemo />,
  },
  {
    component: 'Popover',
    renders:   'button[popovertarget] + [popover]',
    props:     'label, id',
    code:      `<Popover id='hint' label='Open popover'>
  <p>Light-dismisses on outside click or Escape.</p>
</Popover>`,
    demo:
  <Popover id='inv-popover' label='Open popover'>
    <p>Light-dismisses on outside click or Escape.</p>
  </Popover>,
  },
  {
    component: 'Icon',
    renders:   'svg[data-icon]',
    props:     'name, label',
    code:      `<Icon name='mail' label='Mail' />`,
    demo:
  <Row wrap>
    <Icon label='User' name='user' />
    <Icon label='Mail' name='mail' />
    <Icon label='Pin' name='pin' />
    <Icon label='Clock' name='clock' />
  </Row>,
  },
  {
    component: 'Medallion',
    renders:   'span[data-medallion] > Icon',
    props:     'icon, label',
    code:      `<Medallion icon='award' label='Award' />`,
    demo:
  <Row>
    <Medallion icon='user' label='User' />
    <Medallion icon='award' label='Award' />
  </Row>,
  },
]

const COMPOSITES: Entry[] = [
  {
    component: 'Card',
    renders:   'article.card',
    props:     'title, footer',
    code:      `<Card title='Card title' footer={ <Button size='small'>Action</Button> }>
  <p>Header, body, and footer.</p>
</Card>`,
    demo:
  <Card footer={ <Button size='small'>Action</Button> } title='Card title'>
    <p>Header, body, and footer.</p>
  </Card>,
  },
  {
    component: 'Field',
    renders:   'div[data-field]',
    props:     'label, htmlFor, hint, error',
    code:      `<Field label='Email' htmlFor='email' hint='We never share it.'>
  <Input id='email' type='email' />
</Field>`,
    demo:
  <Field hint='We never share it.' htmlFor='inv-email' label='Email'>
    <Input id='inv-email' type='email' placeholder='you@example.com' />
  </Field>,
  },
  {
    component: 'Alert',
    renders:   'aside[data-alert]',
    props:     'variant, title',
    code:      `<Alert variant='success' title='Saved'>
  <p>Your changes were written successfully.</p>
</Alert>`,
    demo:
  <Alert title='Saved' variant='success'>
    <p>Your changes were written successfully.</p>
  </Alert>,
  },
  {
    component: 'Tabs',
    renders:   '[role=tablist] + panels',
    props:     'tabs, label',
    code:      `<Tabs label='Sections' tabs={ [
  { id: 'one', label: 'One', content: <p>First panel.</p> },
  { id: 'two', label: 'Two', content: <p>Second panel.</p> },
] } />`,
    demo:
  <Tabs
    label='Inventory tabs'
    tabs={ [
      { id: 'inv-one', label: 'One', content: <p>First panel.</p> },
      { id: 'inv-two', label: 'Two', content: <p>Second panel.</p> },
    ] } />,
  },
  {
    component: 'Breadcrumb',
    renders:   'nav > ol',
    props:     'items',
    code:      `<Breadcrumb items={ [
  { label: 'Home', href: '/' },
  { label: 'Design system' },
] } />`,
    demo:
  <Breadcrumb
    items={ [
      { label: 'Home', href: '/' },
      { label: 'Design system' },
    ] } />,
  },
  {
    component: 'SearchField',
    renders:   'form[role=search]',
    props:     'placeholder, onSearch',
    code:      `<SearchField placeholder='Search…' onSearch={ query => run(query) } />`,
    demo:      <SearchField onSearch={ query => console.info('search:', query) } />,
  },
  {
    component: 'Carousel',
    renders:   'section[aria-roledescription=carousel]',
    props:     'slides (image, content), label',
    code:      `<Carousel label='Highlights' slides={ [
  { id: 'a', image: photo, content: <p>Full-bleed photography.</p> },
  { id: 'b', content: <p>Scroll-snap, keyboard-friendly.</p> },
] } />`,
    demo:
  <Carousel
    label='Inventory carousel'
    slides={ [
      { id: 'inv-a', image: photoClear, content: <p>Full-bleed photography under the diagonal scrim.</p> },
      { id: 'inv-b', content: <p>Scroll-snap, keyboard-friendly.</p> },
    ] } />,
  },
  {
    component: 'Meta',
    renders:   'dl[data-meta]',
    props:     'items',
    code:      `<Meta items={ [
  { label: 'Location', value: 'Helsinki, Finland' },
  { label: 'Focus', value: 'Design systems' },
] } />`,
    demo:
  <Meta
    items={ [
      { label: 'Location', value: 'Helsinki, Finland' },
      { label: 'Focus', value: 'Design systems' },
    ] } />,
  },
  {
    component: 'Swatches',
    renders:   'div[data-swatches]',
    props:     'tokens, label',
    code:      `<Swatches label='Surfaces' tokens={ [ 'paper', 'wash', 'line', 'ink' ] } />`,
    demo:      <Swatches label='Surfaces' tokens={ [ 'paper', 'wash', 'line', 'ink' ] } />,
  },
  {
    component: 'ThemeCustomizer',
    renders:   'form[data-component=theme-customizer]',
    props:     '—',
    code:      `<ThemeCustomizer />`,
    note:      'Live in the Color section above — it writes oklch channels through the global reducer onto <html>.',
  },
  {
    component: 'Notification',
    renders:   'output[data-notifications]',
    props:     'timeout',
    code:      `dispatch(pushNotice('Changes published.', 'success'))
// <Notification /> is mounted once, near the app root`,
    demo: <NotificationDemo />,
  },
  {
    component: 'Lockup',
    renders:   'span[data-lockup]',
    props:     'wordmark, variant',
    code:      `<Lockup />`,
    demo:      <Lockup />,
  },
  {
    component: 'FounderCard',
    renders:   'article[data-founder]',
    props:     'name, role, cta',
    code:      `<FounderCard name='Tuomas Hatakka' role='Founder'
  cta={{ label: 'Contact', href: '#' }}>
  <p>Professional, user-friendly websites.</p>
</FounderCard>`,
    demo:
  <FounderCard cta={{ label: 'Contact', href: '#' }} name='Tuomas Hatakka' role='Founder'>
    <p>Professional, user-friendly websites.</p>
  </FounderCard>,
  },
  {
    component: 'Pillars',
    renders:   'ul[data-pillars]',
    props:     'items',
    code:      `<Pillars items={ [
  { label: 'Websites', title: 'Web design', body: 'Clean, self-explanatory sites.' },
  { label: 'Development', title: 'Web development', body: 'Built to last.' },
] } />`,
    demo:
  <Pillars
    items={ [
      { label: 'Websites', title: 'Web design', body: 'Clean, self-explanatory sites.' },
      { label: 'Development', title: 'Web development', body: 'Built to last.' },
    ] } />,
  },
  {
    component: 'CapabilityStrip',
    renders:   'ul[data-capabilities]',
    props:     'items',
    code:      `<CapabilityStrip items={ [
  { icon: 'user', title: 'Personal', body: 'You work with me directly.' },
  { icon: 'award', title: 'Crafted', body: 'Attention to every detail.' },
] } />`,
    demo:
  <CapabilityStrip
    items={ [
      { icon: 'user', title: 'Personal', body: 'You work with me directly.' },
      { icon: 'award', title: 'Crafted', body: 'Attention to every detail.' },
    ] } />,
  },
  {
    component: 'ArticleHero',
    renders:   'section[data-article-hero]',
    props:     'title, image, tint, eyebrow, byline',
    code:      `<ArticleHero title='Sepia' image={ photo } tint='clear' />`,
    demo:      <ArticleHero image={ photoClear } tint='clear' title='Sepia' />,
  },
  {
    component: 'ContactPanel',
    renders:   'section[data-contact]',
    props:     'heading, lead, details, onSubmit',
    code:      `<ContactPanel heading='Interested?' lead='Send me a message.'
  details={ [ { icon: 'mail', value: 'contact@tuomashatakka.fi' } ] } />`,
    demo:
  <ContactPanel
    details={ [{ icon: 'mail', value: 'contact@tuomashatakka.fi', href: 'mailto:contact@tuomashatakka.fi' }] }
    heading='Interested?'
    lead='Send me a message.' />,
  },
  {
    component: 'RecentWork',
    renders:   'div[data-work] > Grid',
    props:     'items, min',
    code:      `<RecentWork items={ [
  { id: 'a', title: 'Alpine', meta: 'Web design', image: photo },
] } />`,
    demo:
  <RecentWork
    items={ [
      { id: 'inv-w1', title: 'Clearwater', meta: 'Photography', image: photoClear },
      { id: 'inv-w2', title: 'Graphite', meta: 'Development', image: photoDark },
    ] } />,
  },
  {
    component: 'Chat',
    renders:   'section[data-component=chat] (app-only)',
    props:     '—',
    code:      `<Chat />`,
    note:      'Streaming live in the Composites section above. Ships with the docs app, not the package — the only component with AI-SDK dependencies.',
  },
]

const LAYOUTS: Entry[] = [
  {
    component: 'Header',
    renders:   'body > header (landmarks/)',
    props:     'homeHref, links',
    code:      `<Header homeHref='/' links={ [
  { label: 'Home', href: '/' },
  { label: 'Design system', href: '/design-system' },
] } />`,
    note: 'The sticky landmark framing this very page — its selector is body > header, so it renders in place only there.',
  },
  {
    component: 'Footer',
    renders:   'body > footer (landmarks/)',
    props:     '—',
    code:      `<Footer />`,
    note:      'The colophon at the end of this page — body > footer.',
  },
  {
    component: 'Panel',
    renders:   'aside[data-slot=panel] (landmarks/)',
    props:     'label',
    code:      `<Panel label='Details'>
  <p>A parallel-route drawer, toggled from the header.</p>
</Panel>`,
    note: 'Toggle it with the panel button in the header of this site.',
  },
  {
    component: 'Row',
    renders:   '[data-layout=row]',
    props:     'align, wrap',
    code:      `<Row>
  <Badge>keeps</Badge>
  <Badge>children</Badge>
  <Badge>inline</Badge>
</Row>`,
    demo:
  <Row>
    <Badge>keeps</Badge>
    <Badge>children</Badge>
    <Badge>inline</Badge>
  </Row>,
  },
  {
    component: 'Grid',
    renders:   '[data-layout=grid]',
    props:     'min',
    code:      `<Grid min='sm'>
  <Card>…</Card>
  <Card>…</Card>
</Grid>`,
    demo:
  <Grid min='sm'>
    <Card title='One'>
      <p>Auto-filling columns.</p>
    </Card>

    <Card title='Two'>
      <p>The column floor is a token preset.</p>
    </Card>
  </Grid>,
  },
  {
    component: 'Overlay',
    renders:   '[data-overlay] (fixed)',
    props:     'open, label, onClose',
    code:      `<Overlay label='Immersive' open={ open } onClose={ close }>
  <p>Full-viewport takeover under an opaque scrim.</p>
</Overlay>`,
    demo: <OverlayDemo />,
  },
]

const slug = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, '-')

const InventoryTable: FC<{ title: string, rows: Entry[] }> = ({ title, rows }) =>
  <>
    <Heading level={ 3 }>{title}</Heading>

    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Renders</th>
          <th>Essential props</th>
        </tr>
      </thead>

      <tbody>
        {rows.map(row =>
          <tr key={ row.component }>
            <td>{row.component}</td>

            <td>
              <code>{row.renders}</code>
            </td>

            <td>{row.props}</td>
          </tr>)}
      </tbody>
    </table>

    <div data-layout='stack'>
      {rows.map(row =>
        <Disclosure key={ row.component } name={ `inv-${slug(title)}` } summary={ row.component }>
          <Specimen code={ row.code } note={ row.note }>
            {row.demo}
          </Specimen>
        </Disclosure>)}
    </div>
  </>

InventoryTable.displayName = 'InventoryTable'

export const Inventory: FC = () =>
  <section>
    <Heading id='inventory' level={ 2 }>Inventory</Heading>

    <p>
      Every component the package exports: what it renders, its essential
      props, and — expand any row — a live preview with the code that produced
      it. Import everything from
      {' '}
      <code>hummingbird-design-system</code>
      .
    </p>

    <InventoryTable rows={ PRIMITIVES } title='Primitives' />
    <InventoryTable rows={ COMPOSITES } title='Composites' />
    <InventoryTable rows={ LAYOUTS } title='Layouts' />
  </section>

Inventory.displayName = 'Inventory'
