import type { FC, ReactNode } from 'react'


interface GridProps {
  children: ReactNode

  /**
   * Minimum column width preset — the grid auto-fills as many equal
   * columns of at least this width as fit. `sm` ≈ 12rem, `md` ≈ 16rem,
   * `lg` ≈ 22rem. Defaults to `md`.
   */
  min?: 'sm' | 'md' | 'lg'

  /**
   * Render as `ul` for genuine list content (e.g. a grid of cards) instead
   * of `div`. Pass `<li>` children yourself — Grid does not wrap them.
   * Defaults to `div`.
   */
  as?: 'div' | 'ul'
}

/**
 * A responsive grid view — `repeat(auto-fill, minmax(var(--grid-min), 1fr))`.
 * The column floor is a token preset chosen through `data-min`, so no size
 * literals leak into markup. `[data-layout='grid']`.
 */
export const Grid: FC<GridProps> = ({ children, min = 'md', as: Tag = 'div' }) =>
  <Tag data-layout='grid' data-min={ min } role={ Tag === 'ul' ? 'list' : undefined }>
    {children}
  </Tag>

Grid.displayName = 'Grid'
