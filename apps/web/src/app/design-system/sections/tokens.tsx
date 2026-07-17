import type { FC, ReactNode } from 'react'
import { Heading } from 'hummingbird-design-system'


interface VarRow { name: string, value: string, role: string, preview: ReactNode }

// Color chips sample the live custom property, so they follow the theme and
// the customizer — the same technique the Swatches docs tool uses.
const Chips: FC<{ tokens: string[], kind?: string }> = ({ tokens, kind = '' }) =>
  <span aria-hidden='true' data-token-preview={ kind }>
    {tokens.map(token =>
      <span key={ token } data-chip='' style={{ background: `var(--${token})` }} />)}
  </span>

Chips.displayName = 'Chips'

const OnChips: FC<{ pairs: [string, string][] }> = ({ pairs }) =>
  <span aria-hidden='true' data-token-preview=''>
    {pairs.map(([ fill, ink ]) =>
      <span
        key={ fill }
        data-chip=''
        style={{ background: `var(--${fill})`, color: `var(--${ink})`, display: 'inline-grid', placeItems: 'center' }}>
        A
      </span>)}
  </span>

OnChips.displayName = 'OnChips'

const TypeSample: FC<{ token: string }> = ({ token }) =>
  <span aria-hidden='true' data-token-preview='type' style={{ fontFamily: `var(--${token})` }}>
    Aa Bb
  </span>

TypeSample.displayName = 'TypeSample'

const ramp = (family: string) =>
  [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ].map(step => `${family}-${step}`)

const TABLES: { title: string, rows: VarRow[] }[] = [
  {
    title: 'Neutral ramp',
    rows:  [
      { name: '--paper', value: 'light-dark(white, oklch(22%))', role: 'page background', preview: <Chips tokens={ [ 'paper' ] } /> },
      { name: '--wash', value: 'light-dark(97%, 27%)', role: 'raised / recessed surfaces', preview: <Chips tokens={ [ 'wash' ] } /> },
      { name: '--line', value: 'light-dark(90%, 40%)', role: 'hairline borders', preview: <Chips tokens={ [ 'line' ] } /> },
      { name: '--ink-faint', value: 'light-dark(56%, 70%)', role: 'captions, disabled', preview: <Chips tokens={ [ 'ink-faint' ] } /> },
      { name: '--ink-soft', value: 'light-dark(40%, 85%)', role: 'body text', preview: <Chips tokens={ [ 'ink-soft' ] } /> },
      { name: '--ink', value: 'light-dark(31%, 97%)', role: 'headings, strong borders', preview: <Chips tokens={ [ 'ink' ] } /> },
      { name: '--hairline', value: 'mix(ink 14%, transparent)', role: 'the barely-there border color', preview: <Chips tokens={ [ 'hairline' ] } /> },
    ],
  },
  {
    title: 'Brand channels + resolved',
    rows:  [
      { name: '--color-accent-l / -c / -h', value: '40% · 0 · 85', role: 'accent oklch triplet (chroma 0 → ink)', preview: <Chips tokens={ [ 'accent' ] } /> },
      { name: '--color-accent', value: 'oklch(l c h)', role: 'resolved accent', preview: <Chips tokens={ [ 'accent' ] } /> },
      { name: '--color-accent-strong', value: 'calc(--color-accent-l ± 9–12%)', role: 'hover, per-theme', preview: <Chips tokens={ [ 'accent-strong' ] } /> },
      { name: '--color-accent-wash', value: 'mix(accent 12%, paper)', role: 'tinted surface', preview: <Chips tokens={ [ 'accent-wash' ] } /> },
      { name: '--color-accent-100 … -900', value: 'color-mix ramp', role: 'nine-step variant ramp', preview: <Chips kind='ramp' tokens={ ramp('accent') } /> },
      { name: '--color-error / --color-success', value: 'wine / moss', role: 'off-brand state colors', preview: <Chips tokens={ [ 'error', 'success' ] } /> },
      { name: '--color-error-100 … -900', value: 'color-mix ramp', role: 'error variant ramp', preview: <Chips kind='ramp' tokens={ ramp('error') } /> },
      { name: '--color-success-100 … -900', value: 'color-mix ramp', role: 'success variant ramp', preview: <Chips kind='ramp' tokens={ ramp('success') } /> },
      { name: '--on-accent / -error / -success', value: 'oklch(from …) threshold', role: 'ink on a brand fill — derived from the fill, not the theme', preview: <OnChips pairs={ [[ 'accent', 'on-accent' ], [ 'error', 'on-error' ], [ 'success', 'on-success' ]] } /> },
      { name: '--on-ink-threshold', value: '0.65', role: 'the lightness where on-brand ink flips', preview: null },
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
      { name: '--font-mono', value: 'ui-monospace stack', role: 'code', preview: <TypeSample token='font-mono' /> },
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
        role:  'squared; medallions + spinner only',
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
        name:  '--shadow-1 / -2 / -3',
        value: 'faint / soft / ambient veil',
        role:  'elevation — always black-based, heavier in dark (light-dark alpha)',
        preview:
  <span aria-hidden='true' data-token-preview='boxes'>
    <span data-chip='' style={{ boxShadow: 'var(--shadow-1)' }} />
    <span data-chip='' style={{ boxShadow: 'var(--shadow-2)' }} />
    <span data-chip='' style={{ boxShadow: 'var(--shadow-3)' }} />
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
        name:  '--measure / --page-max / --panel-w / --header-h / --grid-min',
        value: '68ch / 80rem / 20rem / 3.5rem / 16rem',
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
    <Heading id='tokens' level={ 2 }>Design tokens</Heading>

    <p>
      Every visual decision resolves to a custom property in the package&apos;s
      {' '}
      <code>styles/tokens.css</code>
      , pulled in by the single
      {' '}
      <code>hummingbird-design-system/styles</code>
      {' '}
      import. Each preview samples the live variable, so the swatches follow
      the theme and the customizer.
    </p>

    <p>
      <strong>Dark theme:</strong>
      {' '}
      the neutral ramp and the shadows flip through
      {' '}
      <code>light-dark()</code>
      {' '}
      pairs steered by
      {' '}
      <code>color-scheme</code>
      ; only the five brand channel scalars (
      <code>--color-accent-l</code>
      ,
      {' '}
      <code>--color-accent-strong-l</code>
      ,
      {' '}
      <code>--color-error-l/-c</code>
      ,
      {' '}
      <code>--color-success-l</code>
      ) keep explicit
      {' '}
      <code>[data-theme=&apos;dark&apos;]</code>
      {' '}
      overrides — scalars are not colors, so
      {' '}
      <code>light-dark()</code>
      {' '}
      cannot wrap them.
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
