import type { FC } from 'react'


interface SkeletonProps {

  /** `text` (default) — line-height bars. `block` — a 3/2 media rectangle. `circle` — medallion-sized disc. */
  variant?: 'text' | 'block' | 'circle'

  /** Number of text lines (text variant only). Every third line runs short. */
  lines?: number
}

/**
 * A loading placeholder: washed shapes with a shimmering sweep, pure CSS.
 * Hidden from assistive tech — pair it with a live region or `aria-busy`
 * on the container it stands in for.
 */
export const Skeleton: FC<SkeletonProps> = ({ variant = 'text', lines = 1 }) =>
  variant === 'text' && lines > 1
    ? <span aria-hidden='true' data-skeleton-group=''>
      {Array.from({ length: lines }, (_, index) => <span key={ index } data-skeleton='text' />)}
    </span>
    : <span aria-hidden='true' data-skeleton={ variant } />

Skeleton.displayName = 'Skeleton'
