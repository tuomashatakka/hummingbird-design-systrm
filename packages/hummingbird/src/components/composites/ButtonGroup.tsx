import type { FC, ReactNode } from 'react'


interface ButtonGroupProps {
  children: ReactNode

  /** Accessible name for the group. */
  label?: string
}

/**
 * Fuses adjacent buttons (or `a[data-button]` links) into one strip —
 * shared hairlines overlap so the seams stay single-width, and the
 * hovered or focused member lifts above its neighbours.
 */
export const ButtonGroup: FC<ButtonGroupProps> = ({ children, label }) =>
  <div role='group' aria-label={ label } data-button-group=''>
    {children}
  </div>

ButtonGroup.displayName = 'ButtonGroup'
