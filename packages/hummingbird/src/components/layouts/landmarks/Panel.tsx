import type { FC, ReactNode } from 'react'
import { Button } from 'Δ/components/primitives'


interface PanelProps {
  children: ReactNode

  /** Accessible name for the aside landmark, shown as its heading. */
  label: string

  /** Controlled visibility — the panel stays mounted so CSS can animate both directions. */
  open: boolean

  /** Renders the close button and handles it. Omit for a chrome-less panel. */
  onClose?: () => void
}

/**
 * A docked right-hand drawer (`aside[data-slot='panel']`). Controlled: the
 * consumer owns `open`. The element stays in the tree when closed — CSS
 * slides it away and `inert` removes it from focus and the a11y tree.
 */
export const Panel: FC<PanelProps> = ({ children, label, open, onClose }) =>
  <aside data-slot='panel' data-open={ open ? '' : undefined } aria-label={ label } inert={ !open }>
    <header data-layout='cluster'>
      <h6>{label}</h6>

      {onClose != null &&
        <Button variant='ghost' size='small' onClick={ onClose }>
          ✕
        </Button>}
    </header>

    {children}
  </aside>

Panel.displayName = 'Panel'
