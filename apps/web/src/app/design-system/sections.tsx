import type { FC, ReactNode } from 'react'
import bgBlue from '@/assets/bg-mountain-blue.jpg'
import bgClear from '@/assets/bg-mountain-clear.jpg'
import bgDark from '@/assets/bg-mountain-dark.jpg'
import bgMagenta from '@/assets/bg-mountain-magenta.jpg'
import {
  ArticleHero, CapabilityStrip, ContactPanel, FounderCard, Grid, Heading, Icon,
  Lockup, Medallion, Pillars, Popover, RecentWork, Row,
} from 'hummingbird-design-system'
import { NotificationDemo, OverlayDemo } from './demos'


const ICONS = [ 'user', 'umbrella', 'award', 'mail', 'phone', 'pin', 'clock', 'arrow', 'close', 'menu' ] as const

// tiny inline specimens so the layout helpers have something to arrange
type SpecimenProps = { children: string }

const Badgeish = ({ children }: SpecimenProps) =>
  <span data-badge=''>{children}</span>

const Boxish = ({ children }: SpecimenProps) =>
  <article className='card'>
    <div>{children}</div>
  </article>

// ————————————————————————————————————————————————
// Layout helpers — Row, Grid, Overlay
// ————————————————————————————————————————————————

export const LayoutHelpers = () =>
  <>
    <Heading level={ 3 }>Row &amp; Grid</Heading>

    <p>
      Beyond
      {' '}
      <code>stack</code>
      {' '}
      and
      {' '}
      <code>cluster</code>
      , the system ships
      {' '}
      <code>Row</code>
      {' '}
      (horizontal stacking) and
      {' '}
      <code>Grid</code>
      {' '}
      (an auto-filling grid view whose column floor is a token preset).
    </p>

    <Row>
      <Badgeish>Row</Badgeish>
      <Badgeish>keeps</Badgeish>
      <Badgeish>its children</Badgeish>
      <Badgeish>inline</Badgeish>
    </Row>

    <Grid min='sm'>
      <Boxish>1</Boxish>
      <Boxish>2</Boxish>
      <Boxish>3</Boxish>
      <Boxish>4</Boxish>
      <Boxish>5</Boxish>
      <Boxish>6</Boxish>
    </Grid>

    <Heading level={ 3 }>Overlay</Heading>
    <p>A fixed, full-viewport takeover under an opaque scrim — closes on backdrop click or Escape.</p>
    <OverlayDemo />
  </>

// ————————————————————————————————————————————————
// New primitives — Popover, Icon, Medallion
// ————————————————————————————————————————————————

export const NewPrimitives = () =>
  <>
    <Heading level={ 3 }>Popover</Heading>

    <p>
      The native Popover API — a
      {' '}
      <code>popovertarget</code>
      {' '}
      trigger and a
      {' '}
      <code>[popover]</code>
      {' '}
      panel. The browser owns open/close, light dismiss, and the top layer; no JavaScript.
    </p>

    <Popover id='ds-popover' label='Open popover'>
      <Heading level={ 6 }>Popover</Heading>
      <p>Light-dismisses on outside click or Escape. Anchored to its trigger where supported.</p>
    </Popover>

    <Heading level={ 3 }>Icon</Heading>

    <p>
      A small, hand-picked line set (Feather geometry) at the system&apos;s 1.6px hairline
      stroke — every glyph inherits
      {' '}
      <code>currentColor</code>
      .
    </p>

    <Row wrap>
      {ICONS.map(name => <Icon key={ name } name={ name } label={ name } />)}
    </Row>

    <Heading level={ 3 }>Medallion</Heading>
    <p>The one full-radius element — a circular disc reversing a line glyph, used in the capability strip.</p>

    <Row>
      <Medallion icon='user' label='User' />
      <Medallion icon='umbrella' label='Umbrella' />
      <Medallion icon='award' label='Award' />
    </Row>
  </>

// ————————————————————————————————————————————————
// Notification + brand composites
// ————————————————————————————————————————————————

export const BrandComposites = () =>
  <>
    <Heading level={ 3 }>Notification</Heading>

    <p>
      A fixed toast region wired to the global reducer&apos;s
      {' '}
      <code>notices</code>
      . Push from anywhere with
      {' '}
      <code>dispatch(pushNotice(…))</code>
      ; each toast auto-dismisses (or on its button).
    </p>

    <NotificationDemo />
    <Heading level={ 3 }>Lockup</Heading>
    <p>The brand lockup — mark plus wordmark — in its primary and inverse treatments.</p>

    <Row>
      <Lockup />

      <span data-brand-inverse=''>
        <Lockup variant='inverse' />
      </span>
    </Row>

    <Heading level={ 3 }>Founder card</Heading>

    <FounderCard
      name='Tuomas Hatakka'
      role='Founder · Designer · Developer'
      cta={{ label: 'Contact me now', href: '#' }}>
      <p>
        I design and develop professional, user-friendly yet affordable websites.
        Let&apos;s make your business stand out.
      </p>
    </FounderCard>

    <Heading level={ 3 }>Pillars</Heading>

    <Pillars
      items={ [
        { label: 'Websites', title: 'Websites & web design', body: 'Clean, self-explanatory sites that read the way your business speaks.' },
        { label: 'Development', title: 'Web development', body: 'Well-formed, comprehensive front and back ends built to last.' },
        { label: 'Graphic design', title: 'Design & photography', body: 'Identity, print, and imagery in one consistent voice.' },
      ] } />

    <Heading level={ 3 }>Capability strip</Heading>

    <CapabilityStrip
      items={ [
        { icon: 'user', title: 'Personal', body: 'You work with me directly, start to finish.' },
        { icon: 'umbrella', title: 'Reliable', body: 'Comprehensive care after launch, not just before.' },
        { icon: 'award', title: 'Crafted', body: 'Master-level attention to every detail.' },
      ] } />

    <Heading level={ 3 }>Article hero</Heading>
    <p>Blurred mountain photography under a flat tint — the only place brand color appears. Six tints ship.</p>

    <div data-layout='stack'>
      <ArticleHero
        title='How I make your business better'
        image={ bgBlue }
        tint='blue'
        eyebrow='Thursday 19 Nov 2015'
        byline='Tuomas Hatakka' />

      <Row wrap>
        <ArticleHero title='Graphite' image={ bgDark } tint='dark' />
        <ArticleHero title='Sepia' image={ bgClear } tint='clear' />
        <ArticleHero title='Magenta' image={ bgMagenta } tint='magenta' />
      </Row>
    </div>

    <Heading level={ 3 }>Contact panel</Heading>

    <ContactPanel
      heading='Interested in working with me?'
      lead='Need a new website? Send me a message or call me.'
      details={ [
        { icon: 'mail', value: 'contact@tuomashatakka.fi', href: 'mailto:contact@tuomashatakka.fi' },
        { icon: 'phone', value: '+358 40 000 0000' },
        { icon: 'pin', value: 'Tuusula, Finland' },
      ] } />

    <Heading level={ 3 }>Recent work</Heading>

    <p>
      A responsive grid of work figures, built on
      {' '}
      <code>Grid</code>
      .
    </p>

    <RecentWork
      items={ [
        { id: 'a', title: 'Alpine', meta: 'Web design', image: bgBlue },
        { id: 'b', title: 'Graphite', meta: 'Development', image: bgDark },
        { id: 'c', title: 'Clearwater', meta: 'Photography', image: bgClear },
      ] } />
  </>

// ————————————————————————————————————————————————
// CSS variables reference
// ————————————————————————————————————————————————

interface VarRow { name: string, value: string, role: string, preview: ReactNode }

// Color chips sample the live custom property, so they follow the theme and
// the customizer — the same technique the Swatches composite uses.
const Chips: FC<{ tokens: string[], kind?: string }> = ({ tokens, kind = '' }) =>
  <span aria-hidden='true' data-token-preview={ kind }>
    {tokens.map(token =>
      <span key={ token } data-chip='' style={{ background: `var(--${token})` }} />)}
  </span>

Chips.displayName = 'Chips'

const TypeSample: FC<{ token: string }> = ({ token }) =>
  <span aria-hidden='true' data-token-preview='type' style={{ fontFamily: `var(--${token})` }}>
    Aa Bb
  </span>

TypeSample.displayName = 'TypeSample'

const TABLES: { title: string, rows: VarRow[] }[] = [
  {
    title: 'Neutral ramp (light)',
    rows:  [
      { name: '--paper', value: 'oklch(100% 0 0)', role: 'page background', preview: <Chips tokens={ [ 'paper' ] } /> },
      { name: '--wash', value: 'oklch(97% .004 85)', role: 'raised / recessed surfaces', preview: <Chips tokens={ [ 'wash' ] } /> },
      { name: '--line', value: 'oklch(90% .006 85)', role: 'hairline borders', preview: <Chips tokens={ [ 'line' ] } /> },
      { name: '--ink-faint', value: 'oklch(56% 0 0)', role: 'captions, disabled', preview: <Chips tokens={ [ 'ink-faint' ] } /> },
      { name: '--ink-soft', value: 'oklch(40% 0 0)', role: 'body text', preview: <Chips tokens={ [ 'ink-soft' ] } /> },
      { name: '--ink', value: 'oklch(31% 0 0)', role: 'headings, strong borders', preview: <Chips tokens={ [ 'ink' ] } /> },
    ],
  },
  {
    title: 'Brand channels + resolved',
    rows:  [
      { name: '--accent-l / -c / -h', value: '40% · 0 · 85', role: 'accent oklch triplet (chroma 0 → ink)', preview: <Chips tokens={ [ 'accent' ] } /> },
      { name: '--accent', value: 'oklch(l c h)', role: 'resolved accent', preview: <Chips tokens={ [ 'accent' ] } /> },
      { name: '--accent-strong', value: 'calc(--accent-l − 9%)', role: 'hover, per-theme', preview: <Chips tokens={ [ 'accent-strong' ] } /> },
      { name: '--accent-wash', value: 'mix(accent 12%, paper)', role: 'tinted surface', preview: <Chips tokens={ [ 'accent-wash' ] } /> },
      { name: '--accent-100 … -900', value: 'color-mix ramp', role: 'nine-step variant ramp', preview: <Chips kind='ramp' tokens={ [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ].map(step => `accent-${step}`) } /> },
      { name: '--danger / --success', value: 'wine / moss', role: 'off-brand state colors', preview: <Chips tokens={ [ 'danger', 'success' ] } /> },
    ],
  },
  {
    title: 'Photography',
    rows:  [
      { name: '--tint-blue / -dark / -clear', value: '#A8BAC4 · #2F3338 · #BAB6AE', role: 'article-hero overlay tints', preview: <Chips tokens={ [ 'tint-blue', 'tint-dark', 'tint-clear' ] } /> },
      { name: '--tint-mist / -magenta / -wine', value: '#C4C9CE · #E91E63 · #6B1E3A', role: 'article-hero overlay tints', preview: <Chips tokens={ [ 'tint-mist', 'tint-magenta', 'tint-wine' ] } /> },
      { name: '--scrim', value: 'oklch(15% .005 260)', role: 'photo scrim gradient', preview: <Chips tokens={ [ 'scrim' ] } /> },
      { name: '--on-photo / -soft / -faint', value: 'near-white @ 96 / 62 / 32%', role: 'type on photography', preview: <Chips kind='scrim' tokens={ [ 'on-photo', 'on-photo-soft', 'on-photo-faint' ] } /> },
    ],
  },
  {
    title: 'Type',
    rows:  [
      { name: '--font-display', value: 'Novecento Sans Wide → Montserrat', role: 'display, labels — uppercase', preview: <TypeSample token='font-display' /> },
      { name: '--font-sans', value: 'Sofia Pro → Poppins', role: 'body', preview: <TypeSample token='font-sans' /> },
      { name: '--font-sub', value: 'Montserrat', role: 'subheadings', preview: <TypeSample token='font-sub' /> },
      { name: '--font-mark', value: 'TeX Gyre Adventor → Montserrat', role: 'the wordmark face', preview: <TypeSample token='font-mark' /> },
      {
        name:  '--text-xs … -4x',
        value: '11px → clamp hero',
        role:  'eight-step scale',
        preview:
  <span aria-hidden='true' data-token-preview='scale'>
    {[ 'xs', 'md', 'xl', '2x' ].map(step =>
      <span key={ step } style={{ fontSize: `var(--text-${step})` }}>Aa</span>)}
  </span>,
      },
      {
        name:  '--leading-tight / -normal',
        value: '1.2 / 1.7',
        role:  'line height',
        preview:
  <span aria-hidden='true' data-token-preview='lines'>
    <span data-chip='' style={{ lineHeight: 'var(--leading-tight)' }}>
      Aa
      <br />
      Aa
    </span>

    <span data-chip='' style={{ lineHeight: 'var(--leading-normal)' }}>
      Aa
      <br />
      Aa
    </span>
  </span>,
      },
    ],
  },
  {
    title: 'Rhythm, shape, motion, layout',
    rows:  [
      {
        name:  '--space-xs … -xl',
        value: '8 · 12 · 24 · 48 · 96px',
        role:  '4/8 spacing scale',
        preview:
  <span aria-hidden='true' data-token-preview='bars'>
    {[ 'xs', 'sm', 'md', 'lg', 'xl' ].map(step =>
      <span key={ step } data-chip='' style={{ inlineSize: `var(--space-${step})` }} />)}
  </span>,
      },
      {
        name:  '--radius / --radius-full',
        value: '0 / 999px',
        role:  'squared; medallions only',
        preview:
  <span aria-hidden='true' data-token-preview='boxes'>
    <span data-chip='' style={{ borderRadius: 'var(--radius)' }} />
    <span data-chip='' style={{ borderRadius: 'var(--radius-full)' }} />
  </span>,
      },
      {
        name:  '--border-hair / --border / --border-strong',
        value: 'hairline / line / ink',
        role:  'the three borders',
        preview:
  <span aria-hidden='true' data-token-preview='rules'>
    <span data-chip='' style={{ borderBlockStart: 'var(--border-hair)' }} />
    <span data-chip='' style={{ borderBlockStart: 'var(--border)' }} />
    <span data-chip='' style={{ borderBlockStart: 'var(--border-strong)' }} />
  </span>,
      },
      {
        name:  '--shadow-1 / --shadow-2',
        value: 'faint / soft',
        role:  'elevation (hover only)',
        preview:
  <span aria-hidden='true' data-token-preview='boxes'>
    <span data-chip='' style={{ boxShadow: 'var(--shadow-1)' }} />
    <span data-chip='' style={{ boxShadow: 'var(--shadow-2)' }} />
  </span>,
      },
      {
        name:  '--snap / --immersive',
        value: '200ms / reveal curve',
        role:  'easing tokens',
        preview:
  <span aria-hidden='true' data-token-preview='motion'>
    <span data-chip='' />
  </span>,
      },
      {
        name:  '--measure / --page-max / --panel-w / --grid-min',
        value: '68ch / 80rem / 20rem / 16rem',
        role:  'layout widths (bars at 1/16 scale)',
        preview:
  <span aria-hidden='true' data-token-preview='bars'>
    <span data-chip='' style={{ inlineSize: 'calc(var(--measure) / 16)' }} />
    <span data-chip='' style={{ inlineSize: 'calc(var(--page-max) / 16)' }} />
    <span data-chip='' style={{ inlineSize: 'calc(var(--panel-w) / 16)' }} />
    <span data-chip='' style={{ inlineSize: 'calc(var(--grid-min) / 16)' }} />
  </span>,
      },
    ],
  },
]

export const TokensReference = () =>
  <section>
    <Heading id='variables' level={ 2 }>CSS variables</Heading>

    <p>
      Every visual decision resolves to a custom property in
      {' '}
      <code>tokens.css</code>
      . Import
      {' '}
      <code>hummingbird-design-system/tokens.css</code>
      {' '}
      alone to adopt the theme without the component CSS. Each preview samples
      the live variable, so the swatches follow the theme and the customizer.
    </p>

    {TABLES.map(table =>
      <div key={ table.title }>
        <Heading level={ 3 }>{table.title}</Heading>

        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Preview</th>
              <th>Value</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {table.rows.map(row =>
              <tr key={ row.name }>
                <td>
                  <code>{row.name}</code>
                </td>

                <td>{row.preview}</td>
                <td>{row.value}</td>
                <td>{row.role}</td>
              </tr>)}
          </tbody>
        </table>
      </div>)}
  </section>
