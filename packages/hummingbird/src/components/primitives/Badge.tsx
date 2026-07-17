import type { FC, ReactNode } from 'react'


interface BadgeProps {
  children: ReactNode
  variant?: 'accent' | 'error' | 'success' | null
}

export const Badge: FC<BadgeProps> = ({ children, variant = null }) =>
  <span data-badge={ variant ?? '' }>{children}</span>

Badge.displayName = 'Badge'
