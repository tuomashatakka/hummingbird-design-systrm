// A flat data registry of every component + a couple of layout specimens that
// size themselves with inline styles — both the file length and those dynamic
// preview styles are inherent to what this module is.
/* eslint-disable max-lines, react-strict/no-style-prop */
// The component registry — the single source of truth for the docs.
// Every export of the package appears here exactly once, with the code
// that produces its live preview. Server module: interactive previews
// are imported from the client-leaf demos.tsx.
import {
  Alert, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, Center,
  Disclosure, Divider, Eyebrow, Grain, Grid, Heading, Icon, Lockup, Mark,
  Medallion, Meta, Pillars, Popover, Progress, Row, Sheet, Skeleton,
  Spinner, Tabs, Wrap,
} from 'hummingbird-design-system'
import bgClear from 'Δ/assets/bg-mountain-clear.jpg'
import type { ComponentEntry } from './components/ComponentDoc'
import {
  CheckboxDemo, ContextMenuDemo, DialogDemo, FieldDemo, InputDemo,
  NotificationDemo, OverlayDemo, PanelDemo, RadioDemo, SearchFieldDemo,
  SelectDemo, SliderDemo, SwitchDemo, TextareaDemo,
} from './demos'


const ICONS = [ 'user', 'umbrella', 'award', 'mail', 'phone', 'pin', 'clock', 'arrow', 'close', 'menu' ] as const

export const PRIMITIVES: ComponentEntry[] = [
  {
    name:        'Button',
    renders:     'button',
    props:       'variant, size, disabled, type, onClick',
    description: 'Four looks, one element. Uppercase display face, hairline border; the primary fill takes --color-accent and derives its ink from the fill itself (--on-accent), so it stays readable whatever the accent lightness.',
    code:        `<Button>Default</Button>
<Button variant='primary'>Primary</Button>
<Button variant='ghost'>Ghost</Button>
<Button variant='error'>error</Button>
<Button variant='primary' size='small'>Small</Button>
<Button disabled>Disabled</Button>`,
    preview:
  <div data-layout='cluster'>
    <Button>Default</Button>
    <Button variant='primary'>Primary</Button>
    <Button variant='ghost'>Ghost</Button>
    <Button variant='error'>error</Button>
    <Button variant='primary' size='small'>Small</Button>
    <Button disabled>Disabled</Button>
  </div>,
  },
  {
    name:        'Input',
    renders:     'input',
    props:       'type, name, placeholder, value, disabled, required, onChange',
    description: 'The bare text control. Validation styling rides on :user-invalid — no JavaScript. Label it by wrapping it in a Field.',
    code:        `<Input type='email' placeholder='you@example.com' required />`,
    preview:     <InputDemo />,
  },
  {
    name:        'Textarea',
    renders:     'textarea',
    props:       'name, placeholder, value, rows, disabled, required, onChange',
    description: 'Multi-line input, vertically resizable, minimum height from the type scale.',
    code:        `<Textarea placeholder='Tell us more…' rows={ 4 } />`,
    preview:     <TextareaDemo />,
  },
  {
    name:        'Select',
    renders:     'select',
    props:       'options, name, value, disabled, required, onChange',
    description: 'A native select fed an options array. Where the engine supports appearance:base-select the dropdown renders as our own styled popover menu — checkmarks, hover, scale+fade in/out — with zero JS and full keyboard/form behavior; elsewhere it degrades to the platform control.',
    code:        `<Select options={ [
  { value: 'free', label: 'Free' },
  { value: 'pro',  label: 'Pro' },
] } />`,
    preview: <SelectDemo />,
  },
  {
    name:        'Checkbox',
    renders:     "label[data-check] > input[type='checkbox']",
    props:       'label, name, value, checked, disabled, onChange',
    description: 'Self-labelling: the control lives inside its own label, so the association is implicit. appearance:none gives it a squared box whose tick draws itself on — the two arms grow in sequence — and erases on uncheck. Pure CSS.',
    code:        `<Checkbox label='I agree to the terms' />`,
    preview:     <CheckboxDemo />,
  },
  {
    name:        'Radio',
    renders:     "label[data-check] > input[type='radio']",
    props:       'label, name, value, checked, disabled, onChange',
    description: 'Same self-labelling row as Checkbox; a shared name groups the buttons natively.',
    code:        `<Radio name='delivery' value='standard' label='Standard (3–5 days)' />
<Radio name='delivery' value='express'  label='Express (next day)' />`,
    preview: <RadioDemo />,
  },
  {
    name:        'Switch',
    renders:     "label[data-check] > input[role='switch']",
    props:       'label, name, checked, disabled, onChange',
    description: 'A checkbox that reads as a toggle — appearance: none plus a squared thumb, announced as a switch.',
    code:        `<Switch label='Email notifications' checked />`,
    preview:     <SwitchDemo />,
  },
  {
    name:        'Slider',
    renders:     "input[type='range']",
    props:       'label, min, max, step, value, disabled, onChange',
    description: 'A native range input with a squared ink thumb on a hairline track. It also powers the theme customizer.',
    code:        `<Slider label='Volume' min={ 0 } max={ 100 } value={ 64 } />`,
    preview:     <SliderDemo />,
  },
  {
    name:        'Heading',
    renders:     'h1 … h6',
    props:       'level, id',
    description: 'Level-checked headings with an optional anchor id — every heading on this page uses it, and the TOC tracks them.',
    code:        `<Heading id='usage' level={ 3 }>Usage</Heading>`,
    preview:     <Heading level={ 3 }>Usage</Heading>,
  },
  {
    name:        'Badge',
    renders:     'span[data-badge]',
    props:       'variant',
    description: 'An uppercase hairline chip. The accent fill derives its text from --on-accent, like the primary button.',
    code:        `<Badge>Neutral</Badge>
<Badge variant='accent'>Accent</Badge>
<Badge variant='success'>Success</Badge>
<Badge variant='error'>error</Badge>
<Badge variant='info'>Info</Badge>`,
    preview:
  <div data-layout='cluster'>
    <Badge>Neutral</Badge>
    <Badge variant='accent'>Accent</Badge>
    <Badge variant='success'>Success</Badge>
    <Badge variant='error'>error</Badge>
    <Badge variant='info'>Info</Badge>
  </div>,
  },
  {
    name:        'Progress',
    renders:     'progress',
    props:       'label, value, max',
    description: 'The native progress element; omit value for an indeterminate marching bar (animated in every engine — the bar pseudo-elements go transparent in both WebKit and Gecko so the gradient shows through).',
    code:        `<Progress label='Upload progress' value={ 64 } />
<Progress label='Loading' />`,
    preview:
  <div data-layout='stack'>
    <Progress label='Upload progress' value={ 64 } />
    <Progress label='Loading' />
  </div>,
  },
  {
    name:        'Spinner',
    renders:     'span[data-spinner]',
    props:       'label, size',
    description: 'A pure-CSS loading spinner: a hairline circle whose top arc takes the accent, turned by a keyframe. Freezes under reduced motion. Works on a plain span via [data-spinner].',
    code:        `<Spinner />
<Spinner size='small' label='Saving' />

{/* plain HTML */}
<span data-spinner role='status' aria-label='Loading'></span>`,
    preview:
  <div data-layout='cluster'>
    <Spinner />
    <Spinner size='small' label='Saving' />
  </div>,
  },
  {
    name:        'Skeleton',
    renders:     'span[data-skeleton]',
    props:       'variant, lines',
    description: 'Loading placeholders — washed shapes with a shimmer sweep, pure CSS. Text lines go ragged every third line; block matches card media at 3/2; circle is medallion-sized. Hidden from assistive tech.',
    code:        `<Skeleton lines={ 3 } />
<Skeleton variant='block' />
<Skeleton variant='circle' />

{/* plain HTML */}
<span data-skeleton='text' aria-hidden='true'></span>`,
    preview:
  <div data-layout='stack'>
    <Skeleton lines={ 3 } />

    <Row>
      <Skeleton variant='circle' />
    </Row>

    <Skeleton variant='block' />
  </div>,
  },
  {
    name:        'Disclosure',
    renders:     'details > summary',
    props:       'summary, children, open, name',
    description: 'Native details/summary with CSS-animated height (interpolate-size + ::details-content, snapping open where unsupported). A shared name makes an exclusive accordion with zero JavaScript.',
    code:        `<Disclosure name='faq' summary='Disclosure (details/summary)'>
  <p>Open and close with the keyboard.</p>
</Disclosure>

<Disclosure name='faq' summary='Accordion via the name attribute'>
  <p>Shared name — opening one closes the other.</p>
</Disclosure>`,
    preview:
  <div data-layout='stack'>
    <Disclosure name='ds-acc' summary='Disclosure (details/summary)'>
      <p>Open and close with the keyboard. Nothing imported, nothing polyfilled — and the height animates.</p>
    </Disclosure>

    <Disclosure name='ds-acc' summary='Accordion via the name attribute'>
      <p>
        These two share a
        <code>name</code>
        , so opening one closes the other — zero JS.
      </p>
    </Disclosure>
  </div>,
  },
  {
    name:        'Dialog',
    renders:     'dialog',
    props:       'open, onClose, title, footer, label, variant, modal, dismissible',
    description: 'The one overlay surface — a native <dialog>. Top layer, ::backdrop, focus trap, and Escape are browser-provided; entry/exit animate via @starting-style. dismissible={false} gates the content; modal={false} uses show() instead of showModal().',
    code:        `<Dialog
  open={ open }
  title='Native dialog'
  footer={ <Button variant='primary' onClick={ close }>Confirm</Button> }
  onClose={ close }>
  <p>Focus trapping, Esc, and the backdrop are all browser-provided.</p>
</Dialog>`,
    preview: <DialogDemo />,
  },
  {
    name:        'Dialog — overlay variant',
    renders:     "dialog[data-variant='overlay']",
    props:       "variant='overlay', label",
    description: 'The immersive takeover: the same element restyled onto an opaque scrim, absorbing what used to be a separate Overlay component.',
    code:        `<Dialog variant='overlay' label='Immersive overlay' open={ open } onClose={ close }>
  …
</Dialog>`,
    preview: <OverlayDemo />,
  },
  {
    name:        'Popover',
    renders:     'button[popovertarget] + [popover]',
    props:       'label, children, id?',
    description: 'The native Popover API — the browser owns open/close, light dismiss, and the top layer; anchor positioning (with viewport-edge flipping) is pure CSS. The id is generated when omitted.',
    code:        `<Popover label='Open popover'>
  <Heading level={ 6 }>Popover</Heading>
  <p>Light-dismisses on outside click or Escape.</p>
</Popover>`,
    preview:
  <Popover label='Open popover'>
    <Heading level={ 6 }>Popover</Heading>
    <p>Light-dismisses on outside click or Escape. Anchored to its trigger where supported.</p>
  </Popover>,
  },
  {
    name:        'ContextMenu',
    renders:     'button[popovertarget] + menu[popover]',
    props:       'label, items, id?',
    description: 'The Popover, narrowed to a list of actions. Each row carries popovertargetaction="hide", so selecting one closes the menu declaratively — only the consumer’s onSelect runs, no open/close JS. Links render as plain <a>; set destructive for the error tone.',
    code:        `<ContextMenu label='Actions' items={ [
  { label: 'Edit',      onSelect: () => {} },
  { label: 'Duplicate', onSelect: () => {} },
  { label: 'Delete',    onSelect: () => {}, destructive: true },
] } />`,
    preview: <ContextMenuDemo />,
  },
  {
    name:        'Divider',
    renders:     'hr[data-label]',
    props:       'label',
    description: 'A horizontal rule carrying an optional eyebrow in the middle — hr is void, so the text rides in ::after via attr(). Omit the label for a plain rule.',
    code:        `<Divider label='or' />
<Divider />

{/* plain HTML */}
<hr data-label='or' />`,
    preview:
  <div data-layout='stack'>
    <Divider label='or' />
    <Divider />
  </div>,
  },
  {
    name:        'Icon',
    renders:     'svg[data-icon]',
    props:       'name, label',
    description: 'A small, hand-picked line set at the system’s hairline stroke — every glyph inherits currentColor. Omit the label for decorative use.',
    code:        `<Icon name='mail' label='Email' />`,
    preview:
  <Row wrap>
    {ICONS.map(name => <Icon key={ name } name={ name } label={ name } />)}
  </Row>,
  },
  {
    name:        'Mark',
    renders:     'svg',
    props:       'label, animate',
    description: 'The Hummingbird mark from the identity kit, inlined so it inherits currentColor — it sits in the header and anywhere ink goes. animate plays a stroke-draw-in reveal once on mount (each path draws, then inks in); reload to replay it.',
    code:        `<Mark label='Hummingbird mark' />
<Mark label='Hummingbird mark' animate />`,
    preview:
  <Row>
    <span data-brand-mark=''>
      <Mark label='Hummingbird mark' />
    </span>

    <span data-brand-mark=''>
      <Mark label='Hummingbird mark' animate />
    </span>
  </Row>,
  },
  {
    name:        'Eyebrow',
    renders:     'p[data-eyebrow]',
    props:       'variant',
    description: 'A small-caps kicker label above a heading. variant="flourish" centers it between two hairline segments — the identity kit’s section-opening treatment.',
    code:        `<Eyebrow>01 · Color</Eyebrow>
<Eyebrow variant='flourish'>Selected work</Eyebrow>`,
    preview:
  <div data-layout='stack'>
    <Eyebrow>01 · Color</Eyebrow>
    <Eyebrow variant='flourish'>Selected work</Eyebrow>
  </div>,
  },
  {
    name:        'Grain',
    renders:     'div[data-grain]',
    props:       '—',
    description: 'A fixed, full-bleed procedural noise texture at 5% opacity, blend mode overlay — the identity kit’s atmosphere layer. Mount once, near the root. Freezes (and hides) under reduced motion.',
    code:        `<Grain />`,
    preview:
  <div style={{ position: 'relative', overflow: 'hidden', contain: 'paint', blockSize: '8rem', border: 'var(--border-hair)' }}>
    <Grain />
  </div>,
  },
  {
    name:        'Medallion',
    renders:     'span[data-medallion]',
    props:       'icon, label',
    description: 'The one full-radius element — a circular disc reversing a line glyph.',
    code:        `<Medallion icon='award' label='Award' />`,
    preview:
  <Row>
    <Medallion icon='user' label='User' />
    <Medallion icon='umbrella' label='Umbrella' />
    <Medallion icon='award' label='Award' />
  </Row>,
  },
]

export const COMPOSITES: ComponentEntry[] = [
  {
    name:        'Card',
    renders:     'article.card',
    props:       'title, footer, children',
    description: 'Header, body, and footer mapping to article > header / div / footer on a washed surface.',
    code:        `<Card title='Card title' footer={ <Button size='small'>Action</Button> }>
  <p>Body copy.</p>
</Card>`,
    preview:
  <div data-layout='cluster'>
    <Card title='Card title' footer={ <Button size='small'>Action</Button> }>
      <p>
        Header, body, and footer map to
        <code>article &gt; header / div / footer</code>
        .
      </p>
    </Card>
  </div>,
  },
  {
    name:        'Field',
    renders:     'label[data-field]',
    props:       'label, hint, error, children',
    description: 'The label IS the wrapper, so the control association is implicit — no htmlFor, no ids to keep in sync. Don’t nest the self-labelling controls (Checkbox, Radio, Switch) inside it.',
    code:        `<Field label='Email' hint='We never share it.'>
  <Input type='email' placeholder='you@example.com' required />
</Field>

<Field label='Password' error='Must be at least 8 characters.'>
  <Input type='password' />
</Field>`,
    preview: <FieldDemo />,
  },
  {
    name:        'Alert',
    renders:     'aside[data-alert]',
    props:       'variant, title, children',
    description: 'A callout on a hairline spine. Info and success announce politely via role="status"; error interrupts via role="alert".',
    code:        `<Alert title='Heads up'><p>An informational callout.</p></Alert>
<Alert variant='success' title='Saved'><p>Changes written.</p></Alert>
<Alert variant='error' title='Something broke'><p>A destructive callout.</p></Alert>`,
    preview:
  <div data-layout='stack'>
    <Alert title='Heads up'>
      <p>
        An informational callout. Uses
        <code>role=&quot;status&quot;</code>
        .
      </p>
    </Alert>

    <Alert variant='success' title='Saved'>
      <p>Your changes were written successfully.</p>
    </Alert>

    <Alert variant='error' title='Something broke'>
      <p>
        A destructive callout announced via
        <code>role=&quot;alert&quot;</code>
        .
      </p>
    </Alert>
  </div>,
  },
  {
    name:        'Tabs',
    renders:     "[role='tablist'] + panels",
    props:       'tabs, label',
    description: 'An ARIA tablist with roving tabindex — arrow keys move between tabs, each panel is a labelled landmark.',
    code:        `<Tabs label='Sections' tabs={ [
  { id: 'a', label: 'Overview', content: <p>…</p> },
  { id: 'b', label: 'Install',  content: <p>…</p> },
] } />`,
    preview:
  <Tabs
    label='Documentation sections'
    tabs={ [
      { id: 'overview', label: 'Overview', content: <p>Arrow keys move between tabs; each panel is a labelled landmark.</p> },
      { id: 'install', label: 'Install', content: <p>Install dependencies with bun, then start the dev server.</p> },
      { id: 'deploy', label: 'Deploy', content: <p>Push to the default branch for GitHub Pages, or import to Vercel.</p> },
    ] } />,
  },
  {
    name:        'Breadcrumb',
    renders:     'nav > ol',
    props:       'items',
    description: 'A structured trail; the last item is the current page (aria-current), separators are CSS-drawn.',
    code:        `<Breadcrumb items={ [
  { label: 'Home', href: '/' },
  { label: 'Design system' },
] } />`,
    preview:
  <Breadcrumb
    items={ [
      { label: 'Home', href: '/' },
      { label: 'Design system', href: '/design-system' },
      { label: 'Composites' },
    ] } />,
  },
  {
    name:        'SearchField',
    renders:     "form[role='search']",
    props:       'placeholder, onSearch',
    description: 'Input plus submit in a search landmark — Enter and the button both fire onSearch.',
    code:        `<SearchField onSearch={ query => console.info(query) } />`,
    preview:     <SearchFieldDemo />,
  },
  {
    name:        'ButtonGroup',
    renders:     "div[role='group'][data-button-group]",
    props:       'label, children',
    description: 'Fuses adjacent buttons into one strip — shared hairlines overlap to stay single-width, and the hovered or focused member lifts above its neighbours.',
    code:        `<ButtonGroup label='Alignment'>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>`,
    preview:
  <ButtonGroup label='Alignment'>
    <Button>Left</Button>
    <Button>Center</Button>
    <Button>Right</Button>
  </ButtonGroup>,
  },
  {
    name:        'Carousel',
    renders:     "section[data-component='carousel']",
    props:       'slides, label',
    description: 'A native scroll-snap list with chevron controls and line dots — swipe, scroll, or keyboard. A slide with an image renders it full-bleed under the identity’s diagonal scrim. Where the platform supports scroll-linked animation (animation-timeline: view()), each slide’s photography drifts opposite the scroll as it crosses the viewport — pure CSS, gated behind prefers-reduced-motion.',
    code:        `<Carousel label='Demo' slides={ [
  { id: 'photo', image: bgClear, content: <p>Photography</p> },
  { id: 'two',   content: <p>Slide two</p> },
] } />`,
    preview:
  <Carousel
    label='Carousel demo'
    slides={ [
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
    ] } />,
  },
  {
    name:        'Meta',
    renders:     'dl[data-meta]',
    props:       'items',
    description: 'Label / value pairs on hairline rules — the identity’s fact list.',
    code:        `<Meta items={ [
  { label: 'Location', value: 'Helsinki, Finland' },
  { label: 'Focus',    value: 'Design systems' },
] } />`,
    preview:
  <Meta
    items={ [
      { label: 'Location', value: 'Helsinki, Finland' },
      { label: 'Focus', value: 'Design systems · Creative coding' },
    ] } />,
  },
  {
    name:        'Sheet',
    renders:     'dl[data-sheet]',
    props:       'items',
    description: 'A two-column spec sheet — term/value pairs on a baseline grid, the term set as a fixed-width uppercase eyebrow column. Denser than Meta and without the hairline rule: reach for Sheet with many short facts (a spec list, a colophon), Meta with fewer, longer-form pairs that read well as a hairline-ruled list.',
    code:        `<Sheet items={ [
  { term: 'Role', value: 'Lead full-stack developer' },
  { term: 'Based', value: 'Helsinki, Finland' },
] } />`,
    preview:
  <Sheet
    items={ [
      { term: 'Role', value: 'Design systems engineer' },
      { term: 'Studio', value: 'Hummingbird Design' },
      { term: 'Stack', value: 'Next.js · TypeScript · CSS nesting' },
    ] } />,
  },
  {
    name:        'Notification',
    renders:     'output[data-notifications]',
    props:       'notices, onDismiss, timeout',
    description: 'A fixed, live-announced toast stack. Controlled: the consumer owns the notices queue and the dismiss handler — on this site both live in the app store.',
    code:        `<Notification
  notices={ notices }
  onDismiss={ id => dispatch(dismissNotice(id)) } />`,
    preview: <NotificationDemo />,
  },
  {
    name:        'Lockup',
    renders:     'span[data-lockup]',
    props:       'wordmark, variant',
    description: 'The brand lockup — mark plus wordmark — in its primary and inverse treatments.',
    code:        `<Lockup />
<Lockup variant='inverse' />`,
    preview:
  <Row>
    <Lockup />

    <span data-brand-inverse=''>
      <Lockup variant='inverse' />
    </span>
  </Row>,
  },
]

type SpecimenChildren = { children: string }

const Badgeish = ({ children }: SpecimenChildren) =>
  <span data-badge=''>{children}</span>

const Boxish = ({ children }: SpecimenChildren) =>
  <article className='card'>
    <div>{children}</div>
  </article>

export const LAYOUTS: ComponentEntry[] = [
  {
    name:        'Row',
    renders:     "[data-layout='row']",
    props:       'align, wrap',
    description: 'Horizontal stacking with the system gap; wrap lets it break.',
    code:        `<Row>
  <Badge>Row</Badge>
  <Badge>keeps</Badge>
  <Badge>children inline</Badge>
</Row>`,
    preview:
  <Row>
    <Badgeish>Row</Badgeish>
    <Badgeish>keeps</Badgeish>
    <Badgeish>its children</Badgeish>
    <Badgeish>inline</Badgeish>
  </Row>,
  },
  {
    name:        'Grid',
    renders:     "[data-layout='grid']",
    props:       'min, as',
    description: 'An auto-filling grid whose column floor is a token preset (sm / md / lg). as="ul" renders a semantic list instead of a div — pass your own <li> children (e.g. a grid of cards).',
    code:        `<Grid min='sm'>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>

<Grid as='ul' min='sm'>
  <li><Card>1</Card></li>
  <li><Card>2</Card></li>
</Grid>`,
    preview:
  <div data-layout='stack'>
    <Grid min='sm'>
      <Boxish>1</Boxish>
      <Boxish>2</Boxish>
      <Boxish>3</Boxish>
      <Boxish>4</Boxish>
      <Boxish>5</Boxish>
      <Boxish>6</Boxish>
    </Grid>

    <Grid as='ul' min='sm'>
      <li>
        <Boxish>ul/li</Boxish>
      </li>

      <li>
        <Boxish>card grid</Boxish>
      </li>

      <li>
        <Boxish>as='ul'</Boxish>
      </li>
    </Grid>
  </div>,
  },
  {
    name:        'Wrap',
    renders:     "[data-layout='wrap']",
    props:       '—',
    description: 'A page-width container — clamps content to --page-max and centers it. The plain wrapper most sections in this system use for their content measure.',
    code:        `<Wrap>
  <Heading level={ 2 }>Section title</Heading>
  <p>Body copy, clamped to the page's max width.</p>
</Wrap>`,
    preview:
  <Wrap>
    <p>
      Clamped to
      <code>--page-max</code>
      {' '}
      and centered.
    </p>
  </Wrap>,
  },
  {
    name:        'Pillars',
    renders:     "[data-layout='pillars']",
    props:       'items',
    description: 'A row of icon-led feature columns — medallion, heading, body copy. Wraps onto multiple rows past three or four items.',
    code:        `<Pillars items={ [
  { icon: <Icon name='award' />, title: 'Considered', description: '…' },
] } />`,
    preview:
  <>
    <Pillars
      items={ [
        { icon: <Icon name='award' label='Award' />, title: 'Considered', description: 'Every token, ramp, and component has a documented reason.' },
        { icon: <Icon name='user' label='User' />, title: 'Accessible', description: 'Native elements first — the platform does the work.' },
        { icon: <Icon name='umbrella' label='Umbrella' />, title: 'Durable', description: 'One token file changes the whole theme, light and dark.' },
      ] } />

    <Pillars
      items={ [
        { icon: <Icon name='award' label='Award' />, title: 'Considered', description: 'Every token, ramp, and component has a documented reason.', variant: 'outline' },
        { icon: <Icon name='user' label='User' />, title: 'Accessible', description: 'Native elements first — the platform does the work.', variant: 'outline' },
        { icon: <Icon name='umbrella' label='Umbrella' />, title: 'Durable', description: 'One token file changes the whole theme, light and dark.', variant: 'outline' },
      ] } />

  </>,
  },
  {
    name:        'Center',
    renders:     "[data-layout='center']",
    props:       'axis',
    description: 'Grid-based centering — horizontal by default, both axes with axis="both" (fills the parent’s block size).',
    code:        `<Center>
  <Badge>horizontally centered</Badge>
</Center>

<Center axis='both'>
  <Badge>dead center</Badge>
</Center>

{/* plain HTML */}
<div data-layout='center' data-axis='both'>…</div>`,
    preview:
  <div data-layout='stack'>
    <Center>
      <Badgeish>horizontally centered</Badgeish>
    </Center>

    <section style={{ blockSize: '8rem', border: 'var(--border-hair)' }}>
      <Center axis='both'>
        <Badgeish>dead center</Badgeish>
      </Center>
    </section>
  </div>,
  },
  {
    name:        'Header',
    renders:     'body > header',
    props:       'brand, links (label, href, current), homeHref, actions',
    description: 'The sticky page header landmark — brand lockup, primary nav, and an actions slot for the consumer’s own controls (this site passes its theme cycler and panel toggle). Plain anchors keep it framework-agnostic. Mark a link current to render aria-current="page" — the CSS underline-grow follows it; see the scroll-spy demo in Patterns for a live example driven by IntersectionObserver.',
    code:        `<Header
  homeHref='/'
  links={ [ { label: 'Docs', href: '/docs', current: true } ] }
  actions={ <li><Button onClick={ cycleTheme }>theme</Button></li> } />`,
    preview: <p>Framing this page right now — the sticky bar up top.</p>,
  },
  {
    name:        'Panel',
    renders:     "aside[data-slot='panel']",
    props:       'label, open, onClose, children',
    description: 'A docked right-hand drawer. Controlled and always mounted, so CSS transitions the slide both ways; when closed it is inert and out of the accessibility tree.',
    code:        `<Panel label='Inspector' open={ open } onClose={ () => setOpen(false) }>
  …
</Panel>`,
    preview: <PanelDemo />,
  },
  {
    name:        'Footer',
    renders:     'body > footer',
    props:       'children',
    description: 'The colophon landmark; give it a line of small print.',
    code:        `<Footer>Hummingbird — a monochrome design system.</Footer>`,
    preview:     <p>Framing this page right now — the colophon below.</p>,
  },
]
