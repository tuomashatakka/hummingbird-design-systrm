import type { FC, ReactNode } from 'react'


interface CenterProps {
  children: ReactNode

  /** `inline` (default) centers horizontally; `both` also centers vertically, filling the parent's block size. */
  axis?: 'inline' | 'both'
}

/** A centering layout: `data-layout='center'`, grid-based, no margins needed. */
export const Center: FC<CenterProps> = ({ children, axis = 'inline' }) =>
  <div data-layout='center' data-axis={ axis === 'both' ? 'both' : undefined }>
    {children}
  </div>

Center.displayName = 'Center'
