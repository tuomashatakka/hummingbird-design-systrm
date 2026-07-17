import type { FC, ReactNode } from 'react'


interface EyebrowProps {
  children: ReactNode
  variant?: 'flourish' | null // 'flourish' centers the label between two hairline segments
}

/**
 * A small-caps kicker label above a heading. `p[data-eyebrow]`.
 */
export const Eyebrow: FC<EyebrowProps> = ({ children, variant = null }) =>
  <p data-eyebrow={ variant ?? '' }>{children}</p>

Eyebrow.displayName = 'Eyebrow'
