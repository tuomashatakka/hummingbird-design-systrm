import type { Notice } from 'hummingbird-design-system'


export type { Notice }

export type Theme = 'light' | 'dark' | 'system'

// — palette customization —
// Each brand color is an oklch channel triplet mirroring the
// --{color}-l/c/h custom properties in the package's tokens.css.
// State holds only *overrides*: an absent entry means the token
// defaults (and their per-theme variants) stay in charge.

export const BRAND_COLORS = [ 'accent', 'error', 'success', 'info' ] as const

export type BrandColor = typeof BRAND_COLORS[number]

export interface ColorChannels {
  lightness: number // 0–100, maps to --{color}-l (%)
  chroma:    number // 0–0.37, maps to --{color}-c
  hue:       number // 0–360, maps to --{color}-h
}

export type PaletteOverrides = Partial<Record<BrandColor, ColorChannels>>

// Light-theme defaults from tokens.css — the sliders' resting position.
export const PALETTE_DEFAULTS: Record<BrandColor, ColorChannels> = {
  accent:  { lightness: 40, chroma: 0, hue: 85 },
  error:   { lightness: 40, chroma: 0.11, hue: 5 },
  success: { lightness: 50, chroma: 0.05, hue: 135 },
  info:    { lightness: 50, chroma: 0.05, hue: 135 },
}

export interface AppState {
  theme:     Theme
  palette:   PaletteOverrides
  panelOpen: boolean
  notices:   Notice[]
}

export const initialState: AppState = {
  theme:     'light',
  palette:   {},
  panelOpen: false,
  notices:   [],
}

// Discriminated action union — extend here first, reducer second, creators third.
export type AppAction =
  | { type: 'theme/set', theme: Theme } |
  { type: 'palette/set', color: BrandColor, channels: ColorChannels } |
  { type: 'palette/reset' } |
  { type: 'panel/toggle' } |
  { type: 'panel/set', open: boolean } |
  { type: 'notice/push', notice: Notice } |
  { type: 'notice/dismiss', id: string }
