// The `hummingbird-design-system/state` entry — a thin shim over the package
// root. The state runtime must live in exactly one bundle: when this entry
// carried its own copy of ./lib/state, apps that mounted AppStateProvider
// from here while components consumed the root's context got two different
// React contexts — a no-op dispatch, frozen ThemeCustomizer sliders, dead
// notices. The self-referencing import is externalized by bunchee, so both
// entries resolve to the same runtime at load time.
export {
  AppStateProvider, useAppState, useDispatch,
  setTheme, setBrandColor, resetPalette, togglePanel, setPanel,
  pushNotice, dismissNotice,
  reducer, initialState, BRAND_COLORS, PALETTE_DEFAULTS,
} from 'hummingbird-design-system'

export type {
  AppState, AppAction, Theme, Notice,
  BrandColor, ColorChannels, PaletteOverrides,
} from 'hummingbird-design-system'
