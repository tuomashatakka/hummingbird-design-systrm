import type { FC, ReactNode } from 'react'


interface RowProps {
  children: ReactNode

  /** Cross-axis alignment. Defaults to `center`. */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'

  /** Wrap onto multiple lines when the row overflows. Defaults to `false`. */
  wrap?: boolean
}

/**
 * Horizontal row stacking — lays its children out in a single inline flow
 * on the 4/8 gap rhythm. `[data-layout='row']`; alignment and wrap ride on
 * `data-*` hooks, never inline styles.
 */
export const Row: FC<RowProps> = ({ children, align = 'center', wrap = false }) =>
  <div data-layout='row' data-align={ align } data-wrap={ wrap ? '' : undefined }>
    {children}
  </div>

Row.displayName = 'Row'
